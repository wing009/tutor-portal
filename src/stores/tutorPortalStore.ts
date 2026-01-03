import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Lesson } from '@/types/lesson';
import { initialLessons } from '@/data/initialLessons';

// 真实接口基础地址
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

interface FilterState {
  selectedMonth: string | null;
}

const initialFilters: FilterState = {
  selectedMonth: null
};

interface TutorPortalStore {
  isAuthenticated: boolean;
  currentTutor: string | null;
  lessons: Lesson[];
  filters: FilterState;
  isLoading: boolean;
  error: string | null;

  login: (name: string) => void;
  logout: () => void;
  fetchLessons: () => void;
  takeAvailableLesson: (id: string) => void;
  setFilters: (newFilters: Partial<FilterState>) => void;
  resetFilters: () => void;
}

export const useTutorPortalStore = create<TutorPortalStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      currentTutor: null,
      lessons: initialLessons,
      filters: initialFilters,
      isLoading: false,
      error: null,

      login: (name) => set({ isAuthenticated: true, currentTutor: name }),
      logout: () => {
        set({ isAuthenticated: false, currentTutor: null });
        get().resetFilters();
      },
      // 业务层
      fetchLessons: () => {
        set({ isLoading: true, error: null });
       
        fetch(`${API_BASE_URL}/api/lessons`)
          .then(res => {
            if (!res.ok) throw new Error(`Request failed: ${res.statusText}`);
            return res.json();
          })
          .then(({ data }) => {
            set({ lessons: data, isLoading: false });
          })
          .catch(err => {
            set({
              error: err instanceof Error ? err.message : 'Failed to load lessons',
              isLoading: false
            });
          });
      },
      takeAvailableLesson: (id) => {
        const lessons = get().lessons.map(lesson => 
          lesson.id === id 
            ? { ...lesson, tutor: get().currentTutor, type: 'Upcoming' as const } 
            : lesson
        );
        set({ lessons });
      },
      setFilters: (newFilters) => {
        set({ filters: { ...get().filters, ...newFilters } });
      },
      resetFilters: () => {
        set({ filters: initialFilters });
      }
    }),
    {
      name: 'tutor-portal-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        currentTutor: state.currentTutor
      })
    }
  )
);

// 所有导出 Hooks 完全不变
export const useIsAuthenticated = () => useTutorPortalStore(state => state.isAuthenticated);
export const useCurrentTutor = () => useTutorPortalStore(state => state.currentTutor);
export const useLessons = () => useTutorPortalStore(state => state.lessons);
export const useFilters = () => useTutorPortalStore(state => state.filters);
export const useIsLoading = () => useTutorPortalStore(state => state.isLoading);
export const useError = () => useTutorPortalStore(state => state.error);
export const useLogin = () => useTutorPortalStore(state => state.login);
export const useLogout = () => useTutorPortalStore(state => state.logout);
export const useFetchLessons = () => useTutorPortalStore(state => state.fetchLessons);
export const useTakeAvailableLesson = () => useTutorPortalStore(state => state.takeAvailableLesson);
export const useSetFilters = () => useTutorPortalStore(state => state.setFilters);
export const useResetFilters = () => useTutorPortalStore(state => state.resetFilters);