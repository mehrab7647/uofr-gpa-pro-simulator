
import React, { useState, useMemo } from 'react';
import { Course } from './types';
import { INITIAL_TRANSCRIPT } from './constants';
import { calculateGPA } from './services/gpaCalculator';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const App: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(INITIAL_TRANSCRIPT);
  const [showSimulateForm, setShowSimulateForm] = useState(false);

  // New course state
  const [newCourse, setNewCourse] = useState({
    course: '',
    grade: '',
    hours: '3.0'
  });

  const gpaData = useMemo(() => calculateGPA(courses), [courses]);

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.course || !newCourse.grade) return;

    const course: Course = {
      id: crypto.randomUUID(),
      term: 999999, // Simulated courses are treated as latest
      course: newCourse.course,
      grade: newCourse.grade,
      hours: parseFloat(newCourse.hours) || 3.0,
      isSimulated: true
    };

    setCourses([...courses, course]);
    setNewCourse({ course: '', grade: '', hours: '3.0' });
    setShowSimulateForm(false);
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const chartData = gpaData.coursesUsed
    .filter(c => typeof c.grade === 'number' || !isNaN(parseFloat(String(c.grade))))
    .map(c => ({
      name: c.course,
      grade: typeof c.grade === 'number' ? c.grade : parseFloat(String(c.grade))
    }))
    .slice(-8);

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-uofgreen text-white py-8 px-4 shadow-lg mb-8 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-uofgold p-3 rounded-full text-uofgreen text-2xl font-bold">UR</div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">GPA Pro Simulator</h1>
              <p className="text-uofgold opacity-90 text-sm font-medium">University of Regina Academic Planner</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-3 text-center">
            <div className="text-xs uppercase tracking-widest opacity-70">Forecasted UGPA</div>
            <div className="text-4xl font-black text-uofgold">
              {gpaData.gpa.toFixed(2)}
            </div>
            <div className="text-xs font-semibold">{gpaData.totalHours} Total Credits</div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Visual Distribution */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 overflow-hidden">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800">
              <i className="fa-solid fa-chart-line text-uofgreen"></i>
              Grade Distribution
            </h2>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" hide />
                  <YAxis domain={[0, 100]} hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="grade" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.grade >= 70 ? '#004f2e' : (entry.grade >= 50 ? '#ffc82e' : '#ef4444')} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-uofgreen text-white rounded-3xl p-6 shadow-md border border-uofgreen/10">
            <h3 className="font-bold text-uofgold mb-2 uppercase tracking-widest text-xs">Summary</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              Based on {gpaData.coursesUsed.length} unique course attempts, your current calculated UGPA is {gpaData.gpa.toFixed(2)}. This includes retake logic where only the latest attempt counts.
            </p>
          </div>
        </div>

        {/* Right Column: Transcript & Simulation */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="flex justify-between items-center mb-2 px-2">
            <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
              <i className="fa-solid fa-graduation-cap text-uofgreen"></i>
              Course History
            </h2>
            <button 
              onClick={() => setShowSimulateForm(!showSimulateForm)}
              className="bg-uofgreen text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:scale-105 transition-transform flex items-center gap-2"
            >
              <i className="fa-solid fa-plus"></i>
              Simulate Course
            </button>
          </div>

          {showSimulateForm && (
            <div className="bg-white border-2 border-dashed border-uofgold/40 rounded-3xl p-6 shadow-sm transition-all animate-in fade-in zoom-in duration-200">
               <form onSubmit={handleAddCourse} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-uofgreen mb-1 uppercase">Course Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. CS 115"
                      className="w-full px-4 py-2 rounded-xl border border-gray-100 focus:ring-2 focus:ring-uofgreen shadow-sm text-gray-700 bg-white"
                      value={newCourse.course}
                      onChange={e => setNewCourse({...newCourse, course: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-uofgreen mb-1 uppercase">Grade</label>
                    <input 
                      type="text" 
                      placeholder="0-100 / NP"
                      className="w-full px-4 py-2 rounded-xl border border-gray-100 focus:ring-2 focus:ring-uofgreen shadow-sm text-gray-700 bg-white"
                      value={newCourse.grade}
                      onChange={e => setNewCourse({...newCourse, grade: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-uofgreen mb-1 uppercase">Credits</label>
                    <div className="flex gap-2">
                      <input 
                        type="number" 
                        step="0.5"
                        className="w-full px-4 py-2 rounded-xl border border-gray-100 focus:ring-2 focus:ring-uofgreen shadow-sm text-gray-700 bg-white"
                        value={newCourse.hours}
                        onChange={e => setNewCourse({...newCourse, hours: e.target.value})}
                      />
                      <button type="submit" className="bg-uofgreen text-white p-2 rounded-xl aspect-square hover:bg-opacity-90 transition-colors shadow-sm">
                        <i className="fa-solid fa-check"></i>
                      </button>
                    </div>
                  </div>
               </form>
            </div>
          )}

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Course</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Grade</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Credits</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {courses.map((course) => {
                    const isUsed = gpaData.coursesUsed.some(cu => cu.id === course.id);
                    return (
                      <tr key={course.id} className={`group hover:bg-gray-50/50 transition-colors ${!isUsed ? 'opacity-40 grayscale' : ''}`}>
                        <td className="px-6 py-4">
                          {course.isSimulated ? (
                            <span className="bg-uofgold/20 text-uofgold font-bold px-2 py-1 rounded-md text-[10px] uppercase">Simulated</span>
                          ) : (
                            <span className="bg-uofgreen/10 text-uofgreen font-bold px-2 py-1 rounded-md text-[10px] uppercase">Official</span>
                          )}
                          {!isUsed && (
                            <div className="text-[10px] text-red-500 font-bold uppercase mt-1">Superseded</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-800">{course.course}</div>
                          <div className="text-xs text-gray-400">Term {course.term === 999999 ? 'Simulated' : course.term}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            Number(course.grade) >= 80 ? 'bg-green-100 text-green-700' : 
                            (Number(course.grade) >= 60 || course.grade === 'NP' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700')
                          }`}>
                            {course.grade}{typeof course.grade === 'number' || !isNaN(parseFloat(String(course.grade))) ? '%' : ''}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-gray-600">
                          {course.hours.toFixed(1)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => removeCourse(course.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors p-2"
                            title="Remove Course"
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {courses.length === 0 && (
              <div className="p-12 text-center text-gray-400 italic">
                No courses added yet. Start by simulating your next semester.
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="max-w-5xl mx-auto px-4 mt-12">
        <div className="bg-gray-200/50 rounded-2xl p-4 text-[11px] text-gray-500 leading-relaxed">
          <p className="font-bold mb-1 uppercase tracking-wider text-gray-600">Calculation Methodology & UofR Policies:</p>
          <ul className="list-disc ml-4 space-y-1">
            <li><strong>Retake Logic:</strong> If a course is repeated, only the most recent grade is utilized in the UGPA calculation.</li>
            <li><strong>0-55% Rule:</strong> Numerical grades between 1 and 54 are weighted as 55% in the calculation. XF is 0.</li>
            <li><strong>Exclusions:</strong> W, P, and AU grades are excluded from credit counts and GPA calculations.</li>
            <li><strong>Truncation:</strong> GPA values are truncated to two decimal places (no rounding).</li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default App;
