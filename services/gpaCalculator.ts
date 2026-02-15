
import { Course, GPAResult } from '../types';

export const calculateGPA = (courses: Course[]): GPAResult => {
  // --- LOGIC: Filter Repeats ---
  // We only keep the course with the HIGHEST term number.
  // If terms are tied (e.g., multiple simulated courses), we take the one added LATEST in the list.
  
  const uniqueCoursesMap = new Map<string, Course>();
  
  // Create a copy with original index to handle tie-breaks
  const coursesWithMetadata = courses.map((c, index) => ({ ...c, originalIndex: index }));

  // Sort by term descending, then by originalIndex descending
  const sortedCourses = [...coursesWithMetadata].sort((a, b) => {
    if (b.term !== a.term) {
      return b.term - a.term;
    }
    return b.originalIndex - a.originalIndex;
  });

  sortedCourses.forEach(c => {
    // Normalize name: Upper case and remove ALL spaces (CS 110 -> CS110)
    const name = c.course.replace(/\s+/g, '').toUpperCase();
    if (name && !uniqueCoursesMap.has(name)) {
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

    // Rule: Grades 0-55 are treated as 55 (UofR 0-55 rule)
    if (numericGrade < 55 && numericGrade > 0) {
      numericGrade = 55;
    }

    totalPoints += (numericGrade * hours);
    totalHours += hours;
  });

  const rawGpa = totalHours > 0 ? totalPoints / totalHours : 0;
  
  // Rule: Truncate to 2 decimals (no rounding) as per UofR policy
  const gpa = Math.floor(rawGpa * 100) / 100;

  return {
    gpa,
    totalHours,
    coursesUsed: uniqueCourses
  };
};
