import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Types
export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  courseCode?: string;
  courseName: string;
  grade: string;
  score: number;
  credits: number;
  semester: string;
  lastUpdated: string;
  isOptimistic?: boolean;
}

export interface BusLocation {
  id: string;
  busNumber: string;
  routeName: string;
  latitude: number;
  longitude: number;
  speed: number;
  eta: number; // minutes
  capacity: number;
  occupancy: number;
  nextStop: string;
  lastUpdated: string;
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  rfidTag: string;
  checkedOut: boolean;
  dueDate: string | null;
  borrowerId?: string;
  renewalCount: number;
  maxRenewals: number;
  fineAmount: number;
}

export interface CampusLocation {
  id: string;
  name: string;
  type: 'building' | 'facility' | 'landmark';
  coordinates: { x: number; y: number };
  occupancy?: number;
  capacity?: number;
  isOpen: boolean;
}

export interface ThesisDefense {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  status: 'proposal' | 'review' | 'defense-scheduled' | 'completed' | 'graduated';
  defenseDate?: string;
  scheduledDate?: string;
  committee: string[];
  panelMembers?: string[];
  lastUpdated: string;
}

interface SyncState {
  lastSync: string | null;
  isSyncing: boolean;
  syncErrors: string[];
}

interface UniversityStore {
  // Data
  grades: Grade[];
  busLocations: BusLocation[];
  libraryBooks: LibraryBook[];
  campusLocations: CampusLocation[];
  thesisDefenses: ThesisDefense[];

  // Sync state
  sync: SyncState;

  // Actions - Grades
  addGrade: (grade: Grade) => void;
  updateGrade: (id: string, updates: Partial<Grade>) => void;
  removeGrade: (id: string) => void;
  rollbackGrade: (id: string, originalGrade: Grade) => void;

  // Actions - Buses
  updateBusLocation: (id: string, location: Partial<BusLocation>) => void;

  // Actions - Library
  checkoutBook: (bookId: string, borrowerId: string) => void;
  returnBook: (bookId: string) => void;
  calculateFine: (bookId: string) => number;

  // Actions - Campus
  updateLocationOccupancy: (id: string, occupancy: number) => void;

  // Actions - Thesis
  addThesisDefense: (defense: ThesisDefense) => void;
  updateThesisStatus: (id: string, status: ThesisDefense['status']) => void;

  // Sync actions
  setSyncing: (isSyncing: boolean) => void;
  setLastSync: (timestamp: string) => void;
  addSyncError: (error: string) => void;
  clearSyncErrors: () => void;
}

export const useUniversityStore = create<UniversityStore>()(
  persist(
    (set, get) => ({
      // Initial state
      grades: [],
      busLocations: [
        {
          id: 'bus-1',
          busNumber: 'UNI-001',
          routeName: 'Main Campus Loop',
          latitude: -1.2921,
          longitude: 36.8219,
          speed: 25,
          eta: 4,
          capacity: 50,
          occupancy: 32,
          nextStop: 'Library Stop',
          lastUpdated: new Date().toISOString(),
        },
        {
          id: 'bus-2',
          busNumber: 'UNI-002',
          routeName: 'Hostel Shuttle',
          latitude: -1.2935,
          longitude: 36.8205,
          speed: 15,
          eta: 8,
          capacity: 50,
          occupancy: 45,
          nextStop: 'Student Center',
          lastUpdated: new Date().toISOString(),
        },
      ],
      libraryBooks: [],
      campusLocations: [
        {
          id: 'loc-1',
          name: 'Main Library',
          type: 'building',
          coordinates: { x: 300, y: 200 },
          occupancy: 168,
          capacity: 200,
          isOpen: true,
        },
        {
          id: 'loc-2',
          name: 'Lecture Hall 4',
          type: 'building',
          coordinates: { x: 500, y: 300 },
          occupancy: 45,
          capacity: 150,
          isOpen: true,
        },
        {
          id: 'loc-3',
          name: 'Student Center',
          type: 'facility',
          coordinates: { x: 150, y: 400 },
          occupancy: 92,
          capacity: 120,
          isOpen: true,
        },
      ],
      thesisDefenses: [],
      sync: {
        lastSync: null,
        isSyncing: false,
        syncErrors: [],
      },

      // Grade actions
      addGrade: (grade) =>
        set((state) => ({
          grades: [...state.grades, grade],
        })),

      updateGrade: (id, updates) =>
        set((state) => ({
          grades: state.grades.map((g) =>
            g.id === id ? { ...g, ...updates, lastUpdated: new Date().toISOString() } : g
          ),
        })),

      removeGrade: (id) =>
        set((state) => ({
          grades: state.grades.filter((g) => g.id !== id),
        })),

      rollbackGrade: (id, originalGrade) =>
        set((state) => ({
          grades: state.grades.map((g) => (g.id === id ? originalGrade : g)),
        })),

      // Bus actions
      updateBusLocation: (id, location) =>
        set((state) => ({
          busLocations: state.busLocations.map((bus) =>
            bus.id === id
              ? { ...bus, ...location, lastUpdated: new Date().toISOString() }
              : bus
          ),
        })),

      // Library actions
      checkoutBook: (bookId, borrowerId) =>
        set((state) => ({
          libraryBooks: state.libraryBooks.map((book) =>
            book.id === bookId
              ? {
                  ...book,
                  checkedOut: true,
                  borrowerId,
                  dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days
                }
              : book
          ),
        })),

      returnBook: (bookId) =>
        set((state) => ({
          libraryBooks: state.libraryBooks.map((book) =>
            book.id === bookId
              ? {
                  ...book,
                  checkedOut: false,
                  borrowerId: undefined,
                  dueDate: null,
                  renewalCount: 0,
                  fineAmount: 0,
                }
              : book
          ),
        })),

      calculateFine: (bookId) => {
        const book = get().libraryBooks.find((b) => b.id === bookId);
        if (!book || !book.dueDate) return 0;

        const dueDate = new Date(book.dueDate);
        const now = new Date();
        const daysOverdue = Math.max(0, Math.floor((now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)));

        // KES 50 per day overdue
        return daysOverdue * 50;
      },

      // Campus actions
      updateLocationOccupancy: (id, occupancy) =>
        set((state) => ({
          campusLocations: state.campusLocations.map((loc) =>
            loc.id === id ? { ...loc, occupancy } : loc
          ),
        })),

      // Thesis actions
      addThesisDefense: (defense) =>
        set((state) => ({
          thesisDefenses: [...state.thesisDefenses, defense],
        })),

      updateThesisStatus: (id, status) =>
        set((state) => ({
          thesisDefenses: state.thesisDefenses.map((defense) =>
            defense.id === id
              ? { ...defense, status, lastUpdated: new Date().toISOString() }
              : defense
          ),
        })),

      // Sync actions
      setSyncing: (isSyncing) =>
        set((state) => ({
          sync: { ...state.sync, isSyncing },
        })),

      setLastSync: (timestamp) =>
        set((state) => ({
          sync: { ...state.sync, lastSync: timestamp },
        })),

      addSyncError: (error) =>
        set((state) => ({
          sync: { ...state.sync, syncErrors: [...state.sync.syncErrors, error] },
        })),

      clearSyncErrors: () =>
        set((state) => ({
          sync: { ...state.sync, syncErrors: [] },
        })),
    }),
    {
      name: 'university-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
