
import { Course } from './types';

export const INITIAL_TRANSCRIPT: Course[] = [
  { id: '1', term: 202410, course: "CS 110", grade: 70, hours: 3.0 },
  { id: '2', term: 202410, course: "MATH 110", grade: 63, hours: 3.0 },
  { id: '3', term: 202420, course: "STAT 160", grade: 56, hours: 3.0 },
  { id: '4', term: 202430, course: "CS 330", grade: 41, hours: 3.0 },
  { id: '5', term: 202510, course: "CS 330", grade: 73, hours: 3.0 },
  { id: '6', term: 202510, course: "PHYS 109", grade: "NP", hours: 3.0 }
];

export const COLORS = {
  green: '#004f2e',
  gold: '#ffc82e',
  background: '#f8fafc'
};
