# 🎓 UofR GPA Pro Simulator

A precision academic planning and GPA simulation tool specifically designed for **University of Regina (UofR)** students. This tool implements the official UofR academic policies, including retake logic, special grade handling, and the 0-55% weighting rule.

![UofR GPA Simulator](https://img.shields.io/badge/Status-Live-success?style=for-the-badge&logo=netlify)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- **Precision GPA Calculation**: Accurate UGPA calculation following official university guidelines.
- **Smart Retake Logic**: Automatically detects course repeats and ensures only the **most recent** attempt is included in the calculation.
- **UofR Policy Engine**:
    - **0-55% Rule**: Automatically weights numerical grades between 1-54% as 55%.
    - **NP/XF Handling**: Correctly processes "NP" (weighted as 55%) and "XF" (weighted as 0%).
    - **Exclusions**: Automatically excludes W (Withdrawal), P (Pass), and AU (Audit) from GPA and credit totals.
    - **Truncation**: GPA is truncated to exactly two decimal places (no rounding), matching official transcripts.
- **Simulation Mode**: Add hypothetical future courses to see how they impact your final GPA.
- **Visual Analytics**: Interactive bar charts to visualize your grade distribution across semesters.
- **Mobile Responsive**: Fully optimized for desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Font Awesome](https://fontawesome.com/) & [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Deployment**: [Netlify](https://www.netlify.com/)

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (Version 18 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/uofr-gpa-simulator.git
   cd uof-r-gpa-simulator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 🌐 Deployment to Netlify

This project is pre-configured for Netlify via the `netlify.toml` file.

1. Create a new site on [Netlify](https://app.netlify.com/).
2. Link your GitHub repository.
3. Use the following build settings (should be detected automatically):
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

## 📝 Academic Methodology

The simulator adheres strictly to the University of Regina Undergraduate Calendar rules:
- **Retakes**: When a student repeats a course, the grade in the **last attempt** is the grade used in the calculation of the UGPA, even if the last grade is lower.
- **Special Grades**: 
  - **NP** (No Pass) = 55%
  - **XF** (Academic Misconduct) = 0%
- **Weighting**: All numeric grades below 55% (excluding 0%) are calculated as 55% to favor the student's average as per the 0-55 rule.

---

*Disclaimer: This tool is for simulation purposes only. Always refer to your official UR Self-Service transcript for final academic standing.*
