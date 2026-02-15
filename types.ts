export interface Course {
  id: string;
  term: number;
  course: string;
  grade: string | number;
  hours: number;
  isSimulated?: boolean;
}

export interface GPAResult {
  gpa: number;
  totalHours: number;
  coursesUsed: Course[];
}