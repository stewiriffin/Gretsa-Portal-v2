import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useUniversityStore } from '../store/useUniversityStore';
import { mockWebSocket } from '../services/mockWebSocket';
import { toast } from 'sonner';

export interface Grade {
  id: string;
  courseCode: string;
  courseName: string;
  score: number;
  grade: string;
  credits: number;
  semester: string;
  lastUpdated: string;
}

// Simulate API call to update grade
const updateGradeOnServer = async (gradeId: string, updates: Partial<Grade>): Promise<Grade> => {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      // Use mockWebSocket to simulate server response (90% success rate)
      mockWebSocket.emit('grade_update_request', { id: gradeId, updates });

      // Simulate response
      const success = Math.random() > 0.1; // 90% success rate
      if (success) {
        resolve({
          id: gradeId,
          ...updates,
          lastUpdated: new Date().toISOString(),
        } as Grade);
      } else {
        reject(new Error('Server failed to update grade'));
      }
    }, 1500); // 1.5 second delay to simulate network
  });
};

/**
 * Custom hook for managing grades with optimistic updates
 * Demonstrates proper separation of logic from UI components
 */
export const useGrades = () => {
  const queryClient = useQueryClient();
  const { grades, updateGrade: updateStoreGrade, rollbackGrade } = useUniversityStore();

  // Query for fetching grades (currently using Zustand store as source)
  const { data: gradesData, isLoading } = useQuery({
    queryKey: ['grades'],
    queryFn: async () => grades,
    initialData: grades,
  });

  // Mutation for updating a grade with optimistic update
  const updateGradeMutation = useMutation({
    mutationFn: ({ gradeId, updates }: { gradeId: string; updates: Partial<Grade> }) =>
      updateGradeOnServer(gradeId, updates),

    // Optimistic update: Update UI immediately before server responds
    onMutate: async ({ gradeId, updates }) => {
      // Cancel outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: ['grades'] });

      // Snapshot the previous value for rollback
      const previousGrades = queryClient.getQueryData<Grade[]>(['grades']);

      // Find the original grade for rollback
      const originalGrade = grades.find((g) => g.id === gradeId);

      // Optimistically update the grade in Zustand store
      updateStoreGrade(gradeId, updates);

      // Optimistically update the query cache
      queryClient.setQueryData<Grade[]>(['grades'], (old) =>
        old?.map((grade) =>
          grade.id === gradeId
            ? { ...grade, ...updates, lastUpdated: new Date().toISOString() }
            : grade
        )
      );

      // Show optimistic feedback
      toast.info('Updating grade...', {
        description: 'Your changes are being saved',
        duration: 2000,
      });

      // Return context with previous data for rollback
      return { previousGrades, originalGrade };
    },

    // On success: Update with server response
    onSuccess: (serverGrade, { gradeId }) => {
      // Update query cache with server response
      queryClient.setQueryData<Grade[]>(['grades'], (old) =>
        old?.map((grade) => (grade.id === gradeId ? serverGrade : grade))
      );

      toast.success('Grade updated successfully', {
        description: `${serverGrade.courseName}: ${serverGrade.score}%`,
      });
    },

    // On error: Rollback to previous state
    onError: (error, { gradeId }, context) => {
      // Rollback Zustand store
      if (context?.originalGrade) {
        rollbackGrade(gradeId, context.originalGrade);
      }

      // Rollback query cache
      if (context?.previousGrades) {
        queryClient.setQueryData(['grades'], context.previousGrades);
      }

      toast.error('Failed to update grade', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
    },

    // Always refetch after error or success to ensure sync
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['grades'] });
    },
  });

  // Calculate GPA
  const calculateGPA = () => {
    if (!gradesData || gradesData.length === 0) return 0;

    const totalPoints = gradesData.reduce((sum, grade) => {
      const gradePoints: Record<string, number> = {
        'A': 4.0,
        'A-': 3.7,
        'B+': 3.3,
        'B': 3.0,
        'B-': 2.7,
        'C+': 2.3,
        'C': 2.0,
        'C-': 1.7,
        'D+': 1.3,
        'D': 1.0,
        'E': 0.0,
      };
      return sum + (gradePoints[grade.grade] || 0) * grade.credits;
    }, 0);

    const totalCredits = gradesData.reduce((sum, grade) => sum + grade.credits, 0);

    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  };

  // Get grades for a specific semester
  const getGradesBySemester = (semester: string) => {
    return gradesData?.filter((grade) => grade.semester === semester) || [];
  };

  return {
    grades: gradesData || [],
    isLoading,
    updateGrade: updateGradeMutation.mutate,
    isUpdating: updateGradeMutation.isPending,
    calculateGPA,
    getGradesBySemester,
  };
};
