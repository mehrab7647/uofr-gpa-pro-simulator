
import { Course, GPAResult } from '../types';

export const calculateGPA = (courses: Course[]): GPAResult => {
  // --- LOGIC: Filter Repeats ---
  // We only keep the course with the HIGHEST term number
  const uniqueCoursesMap = new Map<string, Course>();
  
  // Sort by term descending to easily pick the latest
  const sortedCourses = [...courses].sort((a, b) => b.term - a.term);

  sortedCourses.forEach(c => {
    const name = c.course.trim().toUpperCase();
    if (!uniqueCoursesMap.has(name)) {
      uniqueCoursesMap.set(name, c);
    }
  });

  const uniqueCourses = Array.from(uniqueCoursesMap.values());

  // --- LOGIC: Calculate GPA ---
  let totalPoints = 0;
  let totalHours = 0;

  uniqueCourses.forEach(c => {
    const gradeStr = String(c.grade).toUpperCase().trim();
    const hours = Number(c.hours);

    // Rule: Exclude W, P, AU
    if (['W', 'P', 'AU'].includes(gradeStr)) return;

    let numericGrade: number;

    // Rule: NP is 55, XF is 0
    if (gradeStr === 'NP') {
      numericGrade = 55;
    } else if (gradeStr === 'XF') {
      numericGrade = 0;
    } else {
      numericGrade = parseFloat(gradeStr);
      if (isNaN(numericGrade)) return;
    }

    // Rule: Grades 0-55 are treated as 55
    // Note: PHP logic says if ($numeric_grade < 55 && $numeric_grade > 0)
    if (numericGrade < 55 && numericGrade > 0) {
      numericGrade = 55;
    }

    totalPoints += (numericGrade * hours);
    totalHours += hours;
  });

  const rawGpa = totalHours > 0 ? totalPoints / totalHours : 0;
  
  // Rule: Truncate to 2 decimals (no rounding)
  const gpa = Math.floor(rawGpa * 100) / 100;

  return {
    gpa,
    totalHours,
    coursesUsed: uniqueCourses
  };
};
