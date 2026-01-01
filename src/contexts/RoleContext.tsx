import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'student' | 'teacher' | 'admin';

interface RoleContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  userName: string;
  userEmail: string;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

interface RoleProviderProps {
  children: ReactNode;
}

export const RoleProvider = ({ children }: RoleProviderProps) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('student');

  // Mock user data based on role
  const getUserData = (role: UserRole) => {
    switch (role) {
      case 'student':
        return {
          userName: 'Sarah Wanjiku',
          userEmail: 'swanjiku@student.gretsa.ac.ke',
        };
      case 'teacher':
        return {
          userName: 'Dr. James Ochieng',
          userEmail: 'jochieng@staff.gretsa.ac.ke',
        };
      case 'admin':
        return {
          userName: 'Mary Njeri',
          userEmail: 'mnjeri@admin.gretsa.ac.ke',
        };
    }
  };

  const { userName, userEmail } = getUserData(currentRole);

  return (
    <RoleContext.Provider value={{ currentRole, setCurrentRole, userName, userEmail }}>
      {children}
    </RoleContext.Provider>
  );
};
