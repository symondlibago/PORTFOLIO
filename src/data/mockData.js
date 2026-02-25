import { Code, Palette, Database, Globe, ShoppingCart, MessageSquare } from 'lucide-react';

export const skills = [
  { name: 'HTML', level: 95, icon: 'Code' },
  { name: 'CSS', level: 95, icon: 'Palette' },
  { name: 'JavaScript', level: 90, icon: 'Code' },
  { name: 'PHP', level: 85, icon: 'Code' },
  { name: 'React JS', level: 90, icon: 'Code' },
  { name: 'Laravel', level: 85, icon: 'Code' },
  { name: 'Tailwind CSS', level: 90, icon: 'Palette' },
  { name: 'MySQL', level: 80, icon: 'Database' },
  { name: 'Git', level: 85, icon: 'Code' },
];

export const projects = [
  {
    id: 'kohi-shop',
    title: 'Kohi Coffee Shop',
    description: 'A premium static coffee shop interface built with a focus on minimalist aesthetics and smooth user interactions.',
    image: '/src/assets/kohi/kohihome.png', // Cover image
    techStack: ['HTML', 'CSS', 'JavaScript'],
    gallery: [
      '/src/assets/kohi/kohi1.png', '/src/assets/kohi/kohi2.png', '/src/assets/kohi/kohi3.png',
      '/src/assets/kohi/kohi4.png', '/src/assets/kohi/kohi5.png', '/src/assets/kohi/kohi6.png',
      '/src/assets/kohi/kohi7.png', '/src/assets/kohi/kohi8.png', '/src/assets/kohi/kohi9.png',
      '/src/assets/kohi/kohi10.png', '/src/assets/kohi/kohi11.png', '/src/assets/kohi/kohi12.png'
    ], // Screenshots from your assets folder
    featured: false
  },

  {
    id: 'tupad',
    title: 'Tupad - DOLE',
    description: 'A web-based monitoring system developed to support the implementation of the TUPAD (Tulong Panghanapbuhay sa Ating Disadvantaged/Displaced Workers) emergency employment program. The system streamlines the management of beneficiary records, work assignments, attendance tracking, and payroll monitoring. It provides real-time data tracking, organized reporting, and improved transparency in monitoring work program progress. The platform was designed to enhance efficiency, reduce manual documentation, and support accurate record-keeping for program coordinators.',
    image: '/src/assets/tupad/tupacover.png', // Cover image
    techStack: ['React', 'CSS', 'MUI', 'Laravel','MySQL'],

    gallery: [
      '/src/assets/tupad/tupacover.png', '/src/assets/tupad/tupad1.png', '/src/assets/tupad/tupad2.png',
      '/src/assets/tupad/tupad3.png', '/src/assets/tupad/tupad4.png', '/src/assets/tupad/tupad5.png',
      '/src/assets/tupad/tupad6.png', '/src/assets/tupad/tupad7.png',
    ], // Screenshots from your assets folder
    featured: false
  },

  {
    id: 'gip',
    title: 'GIP - DOLE',
    description: 'A digital monitoring system designed to manage and track interns under the Government Internship Program (GIP). The system handles intern profiling,stipend monitoring, and report generation. It streamlines administrative processes, improves data accuracy, and enhances transparency in monitoring intern performance and program implementation.',
    image: '/src/assets/gip/gipcover.png', // Cover image
    techStack: ['React', 'CSS', 'MUI', 'Laravel','MySQL'],
    gallery: [
      '/src/assets/gip/gipcover.png', '/src/assets/gip/gip1.png', '/src/assets/gip/gip2.png',
      '/src/assets/gip/gip3.png', '/src/assets/gip/gip4.png', '/src/assets/gip/gip5.png',
      '/src/assets/gip/gip6.png',
    ], // Screenshots from your assets folder
    featured: false
  },

  {
    id: 'benoya',
    title: 'BA Monitoring System',
    description: 'A comprehensive web-based Business Administration (BA) Monitoring System designed to centralize and manage operational workflows within the organization. The system integrates multiple monitoring modules into one unified platform to improve efficiency, accountability, and real-time data visibility.',
    image: '/src/assets/benoya/bacover.png', // Cover image
    techStack: ['React', 'Tailwind CSS', 'Laravel','MySQL'],
    gallery: [
      '/src/assets/benoya/bacover.png', '/src/assets/benoya/ba1.png', '/src/assets/benoya/ba2.png',
      '/src/assets/benoya/ba3.png', '/src/assets/benoya/ba4.png', '/src/assets/benoya/ba5.png',
      '/src/assets/benoya/ba6.png', '/src/assets/benoya/ba7.png', '/src/assets/benoya/ba8.png',
      '/src/assets/benoya/ba9.png', '/src/assets/benoya/ba10.png', '/src/assets/benoya/ba11.png',
      '/src/assets/benoya/ba12.png', '/src/assets/benoya/ba13.png', '/src/assets/benoya/ba14.png',
      '/src/assets/benoya/ba15.png', '/src/assets/benoya/ba16.png', '/src/assets/benoya/ba17.png',
      '/src/assets/benoya/ba18.png', '/src/assets/benoya/ba19.png', '/src/assets/benoya/ba20.png',
      '/src/assets/benoya/ba21.png', '/src/assets/benoya/ba22.png', '/src/assets/benoya/ba23.png',
      '/src/assets/benoya/ba24.png',
    ], // Screenshots from your assets folder
    featured: false
  },

  {
    id: 'pageantry',
    title: 'Pageantry Tabulation System',
    description: 'A web-based Pageantry Tabulation System developed to digitize and automate the scoring process for beauty pageants and competitions, featuring a centralized admin dashboard for managing candidates, judges, scoring criteria, and real-time result computation. Judges are provided with secure individual accounts to submit scores digitally during live events, while the system automatically calculates totals, rankings, and category awards to minimize human error and ensure accurate, transparent results. The platform was successfully deployed and used in Mr. & Ms. Panagbanga 2025 and Mr. & Ms. Vineyard 2026, significantly improving efficiency, reducing computation errors, and delivering faster result generation compared to manual tabulation methods.',
    image: '/src/assets/tabulation/tabcover.png', // Cover image
    techStack: ['React', 'Tailwind CSS', 'Laravel','MySQL'],
    gallery: [
      '/src/assets/tabulation/tabcover.png', '/src/assets/tabulation/tab1.png', '/src/assets/tabulation/tab2.png',
      '/src/assets/tabulation/tab3.png', '/src/assets/tabulation/tab4.png', '/src/assets/tabulation/tab5.png',
      '/src/assets/tabulation/tab6.png', '/src/assets/tabulation/tab7.png', '/src/assets/tabulation/tab8.png',
      '/src/assets/tabulation/tab9.png', '/src/assets/tabulation/tab10.png', '/src/assets/tabulation/tab11.png',
      '/src/assets/tabulation/tab12.jpg', '/src/assets/tabulation/tab13.jpg', '/src/assets/tabulation/tab14.jpg',
      '/src/assets/tabulation/tab15.jpg',
    ], // Screenshots from your assets folder
    featured: false
  },

  {
    id: 'computer',
    title: 'Computer Tracking System',
    description: 'A web-based Computer Tracking System developed for the library to monitor computer laboratory availability and manage student access efficiently. The system allows students to view real-time computer occupancy status and determine whether the laboratory is full or available. If all units are occupied, students can join a digital queue, and the system automatically notifies them when a computer becomes available. By replacing manual monitoring and physical waiting lines, the platform improves fairness, reduces congestion, and enhances the overall student experience while ensuring efficient computer usage management.',
    image: '/src/assets/computer/comcover.png', // Cover image
    techStack: ['React', 'Tailwind CSS', 'Laravel','MySQL'],
    gallery: [
      '/src/assets/computer/comcover.png', '/src/assets/computer/comp1.png', '/src/assets/computer/comp2.png',
      '/src/assets/computer/comp3.png', '/src/assets/computer/comp4.png', '/src/assets/computer/comp5.png',
      '/src/assets/computer/comp6.png', '/src/assets/computer/comp7.png', '/src/assets/computer/comp8.png',
      '/src/assets/computer/comp9.png', '/src/assets/computer/comp10.png', '/src/assets/computer/comp11.png',
      '/src/assets/computer/com12.png', '/src/assets/computer/com13.png', '/src/assets/computer/com14.png',
      '/src/assets/computer/com15.jpg',
    ], // Screenshots from your assets folder
    featured: false
  },

  {
    id: 'school',
    title: 'School Management System',
    description: 'A web-based School Management System designed to streamline academic and administrative processes through a role-based platform with three user types: Admin, Instructor, and Student. The system provides separate dashboards and functionalities for each role, allowing administrators to manage users, courses, and academic records; instructors to handle class management, grading, and student performance tracking; and students to view enrolled subjects, grades, and academic information. By centralizing academic operations into a single platform, the system improves efficiency, data accuracy, and communication between administrators, faculty, and students.',
    image: '/src/assets/sm/smcover.png', // Cover image
    techStack: ['React', 'Tailwind CSS', 'Laravel','MySQL'],
    gallery: [
      '/src/assets/sm/smcover.png', '/src/assets/sm/sm1.png', '/src/assets/sm/sm2.png',
      '/src/assets/sm/sm3.png', '/src/assets/sm/sm4.png', '/src/assets/sm/sm5.png',
      '/src/assets/sm/sm6.png', '/src/assets/sm/sm7.png', '/src/assets/sm/sm8.png',
      '/src/assets/sm/sm9.png', '/src/assets/sm/sm10.png', '/src/assets/sm/sm11.png',
      '/src/assets/sm/sm12.png', '/src/assets/sm/sm13.png', '/src/assets/sm/sm14.png',
      '/src/assets/sm/sm15.png', '/src/assets/sm/sm16.png', '/src/assets/sm/sm17.png',
      '/src/assets/sm/sm18.png', '/src/assets/sm/sm19.png', '/src/assets/sm/sm20.png',
      '/src/assets/sm/sm21.png', '/src/assets/sm/sm22.png', '/src/assets/sm/sm23.png',
      '/src/assets/sm/sm24.png', '/src/assets/sm/sm25.png',
    ], // Screenshots from your assets folder
    featured: false
  },

  {
    id: 'matria',
    title: 'Matria Marine Services',
    description: 'A primarily frontend-focused web system developed for Matria Marine Services (www.matriamarine.com) to present company information and support basic administrative content management. The platform provides a clean and responsive user interface designed to showcase services, operations, and organizational information. The system includes a simple backend functionality that allows administrators to upload and manage images for content updates. Built to deliver an intuitive user experience, the project emphasizes layout design, responsiveness, and interface presentation rather than complex server-side processing.',
    image: '/src/assets/matria/matriacov.png', // Cover image
    link: 'https://www.matriamarine.com',
    techStack: ['React', 'Tailwind CSS', 'Laravel','MySQL','S3 Bucket'],
    gallery: [
      '/src/assets/matria/matriacov.png', '/src/assets/matria/matria1.png', '/src/assets/matria/matria2.png',
      '/src/assets/matria/matria3.png', '/src/assets/matria/matria4.png'
    ], // Screenshots from your assets folder
    featured: false
  },

  {
    id: 'payroll',
    title: 'Payroll System',
    description: 'A web-based Payroll and Employee Management System designed to streamline salary computation and workforce administration. The system manages employee records, job roles, and compensation details while automating payroll calculations based on configured rates and work data. It provides structured employee profiling, payroll tracking, and organized record management to ensure accurate salary processing and reduced administrative workload. By digitizing payroll operations, the platform improves efficiency, minimizes computation errors, and enhances transparency in employee compensation management.',
    image: '/src/assets/payroll/payrollcov.png', // Cover image
    techStack: ['React', 'Tailwind CSS', 'Laravel','MySQL'],
    gallery: [
      '/src/assets/payroll/payrollcov.png', '/src/assets/payroll/payroll1.png', '/src/assets/payroll/payroll2.png',
      '/src/assets/payroll/payroll3.png', '/src/assets/payroll/payroll4.png', '/src/assets/payroll/payroll5.png',
      '/src/assets/payroll/payroll6.png',
    ], // Screenshots from your assets folder
    featured: false
  },
];

export const experience = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    company: 'Tech Solutions Inc.',
    period: '2022 - Present',
    description: 'Leading development of web applications using React, Laravel, and modern tech stack. Mentoring junior developers and architecting scalable solutions.'
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'Digital Innovations Ltd.',
    period: '2020 - 2022',
    description: 'Developed and maintained multiple client projects using PHP, Laravel, React, and MySQL. Implemented responsive designs and REST APIs.'
  },
  {
    id: 3,
    title: 'Web Developer',
    company: 'Creative Web Studio',
    period: '2018 - 2020',
    description: 'Built custom websites and web applications. Specialized in frontend development with HTML, CSS, JavaScript, and PHP backends.'
  }
];

export const aboutMe = {
  name: 'Symond',
  title: 'Full Stack Web Developer',
  bio: "I'm a passionate web developer with expertise in building modern, responsive web applications. With a strong foundation in both frontend and backend technologies, I create seamless digital experiences that combine beautiful design with robust functionality. I thrive on solving complex problems and continuously learning new technologies to stay at the forefront of web development.",
  email: 'symond@example.com',
  location: 'Remote'
};