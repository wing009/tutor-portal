export interface Lesson {
  id: string;
  date: string; // ISO格式日期
  type: 'Historic' | 'Upcoming' | 'Available' | 'Today';
  subject: string;
  students: string[];
  tutor: string | null;
  status: 'Completed' | 'Confirmed' | 'Available' |'Upcoming';
}

export interface LoginCredentials {
  email: string;
  password: string;
}