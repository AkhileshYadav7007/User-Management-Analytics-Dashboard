import { create } from 'zustand';
import { User, UserStatus } from '../types';
import { MOCK_USERS } from '../lib/mockData';

interface UserState {
  users: User[];
  searchQuery: string;
  statusFilter: UserStatus | 'All';
  sortBy: 'name' | 'createdAt';
  sortOrder: 'asc' | 'desc';
  currentPage: number;
  itemsPerPage: number;
  isDarkMode: boolean;
  
  // Actions
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: UserStatus | 'All') => void;
  setSort: (by: 'name' | 'createdAt') => void;
  setPage: (page: number) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  toggleDarkMode: () => void;
}

// Initialize dark mode from localStorage
const getInitialDarkMode = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('darkMode');
    return stored === 'true';
  }
  return false;
};

export const useUserStore = create<UserState>((set) => ({
  users: MOCK_USERS,
  searchQuery: '',
  statusFilter: 'All',
  sortBy: 'name',
  sortOrder: 'asc',
  currentPage: 1,
  itemsPerPage: 5,
  isDarkMode: getInitialDarkMode(),

  setSearchQuery: (searchQuery) => set({ searchQuery, currentPage: 1 }),
  setStatusFilter: (statusFilter) => set({ statusFilter, currentPage: 1 }),
  setSort: (sortBy) => set((state) => ({
    sortBy,
    sortOrder: state.sortBy === sortBy && state.sortOrder === 'asc' ? 'desc' : 'asc'
  })),
  setPage: (currentPage) => set({ currentPage }),
  updateUser: (id, data) => set((state) => ({
    users: state.users.map((user) => user.id === id ? { ...user, ...data } : user)
  })),
  toggleDarkMode: () => set((state) => {
    const newDarkMode = !state.isDarkMode;
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', String(newDarkMode));
      // Apply dark mode class immediately
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    return { isDarkMode: newDarkMode };
  }),
}));
