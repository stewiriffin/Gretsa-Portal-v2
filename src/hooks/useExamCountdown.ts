import { useState, useEffect } from 'react';

export interface Exam {
  id: string;
  course: string;
  date: Date;
  time: string;
  location: string;
  type: 'midterm' | 'final' | 'quiz';
}

// Mock exams - in a real app, this would come from an API
const mockExams: Exam[] = [
  {
    id: '1',
    course: 'Data Structures & Algorithms',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    time: '9:00 AM - 11:00 AM',
    location: 'Exam Hall A',
    type: 'midterm',
  },
  {
    id: '2',
    course: 'Web Development',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    time: '2:00 PM - 4:00 PM',
    location: 'Computer Lab 1',
    type: 'final',
  },
  {
    id: '3',
    course: 'Database Management',
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    time: '10:00 AM - 12:00 PM',
    location: 'Exam Hall B',
    type: 'final',
  },
];

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const useExamCountdown = () => {
  const [exams] = useState<Exam[]>(mockExams);
  const [upcomingExam, setUpcomingExam] = useState<Exam | null>(null);
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExamWeek, setIsExamWeek] = useState(false);

  useEffect(() => {
    const checkUpcomingExams = () => {
      const now = new Date();
      const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      // Find exams within the next 7 days
      const upcomingExams = exams.filter(
        exam => exam.date >= now && exam.date <= sevenDaysFromNow
      );

      // Sort by date and get the nearest exam
      const nearest = upcomingExams.sort(
        (a, b) => a.date.getTime() - b.date.getTime()
      )[0];

      setUpcomingExam(nearest || null);
      setIsExamWeek(!!nearest);

      // Calculate countdown if there's an upcoming exam
      if (nearest) {
        const timeDiff = nearest.date.getTime() - now.getTime();

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      }
    };

    // Check immediately
    checkUpcomingExams();

    // Update every second
    const interval = setInterval(checkUpcomingExams, 1000);

    return () => clearInterval(interval);
  }, [exams]);

  return {
    isExamWeek,
    upcomingExam,
    countdown,
    allExams: exams,
  };
};
