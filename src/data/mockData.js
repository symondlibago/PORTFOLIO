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
    image: '/kohi/kohihome.png',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    gallery: [
      '/kohi/kohi1.png', '/kohi/kohi2.png', '/kohi/kohi3.png',
      '/kohi/kohi4.png', '/kohi/kohi5.png', '/kohi/kohi6.png',
      '/kohi/kohi7.png', '/kohi/kohi8.png', '/kohi/kohi9.png',
      '/kohi/kohi10.png', '/kohi/kohi11.png', '/kohi/kohi12.png'
    ],
    featured: false
  },

  {
    id: 'tupad',
    title: 'Tupad - DOLE',
    description: 'A web-based monitoring system developed to support the implementation of the TUPAD (Tulong Panghanapbuhay sa Ating Disadvantaged/Displaced Workers) emergency employment program. The system streamlines the management of beneficiary records, work assignments, attendance tracking, and payroll monitoring. It provides real-time data tracking, organized reporting, and improved transparency in monitoring work program progress. The platform was designed to enhance efficiency, reduce manual documentation, and support accurate record-keeping for program coordinators.',
    image: '/tupad/tupacover.png',
    techStack: ['React', 'CSS', 'MUI', 'Laravel','MySQL'],
    gallery: [
      '/tupad/tupacover.png', '/tupad/tupad1.png', '/tupad/tupad2.png',
      '/tupad/tupad3.png', '/tupad/tupad4.png', '/tupad/tupad5.png',
      '/tupad/tupad6.png', '/tupad/tupad7.png',
    ],
    featured: false
  },

  {
    id: 'gip',
    title: 'GIP - DOLE',
    description: 'A digital monitoring system designed to manage and track interns under the Government Internship Program (GIP). The system handles intern profiling,stipend monitoring, and report generation. It streamlines administrative processes, improves data accuracy, and enhances transparency in monitoring intern performance and program implementation.',
    image: '/gip/gipcover.png',
    techStack: ['React', 'CSS', 'MUI', 'Laravel','MySQL'],
    gallery: [
      '/gip/gipcover.png', '/gip/gip1.png', '/gip/gip2.png',
      '/gip/gip3.png', '/gip/gip4.png', '/gip/gip5.png',
      '/gip/gip6.png',
    ],
    featured: false
  },

  {
    id: 'benoya',
    title: 'BA Monitoring System',
    description: 'A comprehensive web-based Business Administration (BA) Monitoring System designed to centralize and manage operational workflows within the organization. The system integrates multiple monitoring modules into one unified platform to improve efficiency, accountability, and real-time data visibility.',
    image: '/benoya/bacover.png',
    techStack: ['React', 'Tailwind CSS', 'Laravel','MySQL'],
    gallery: [
      '/benoya/bacover.png', '/benoya/ba1.png', '/benoya/ba2.png',
      '/benoya/ba3.png', '/benoya/ba4.png', '/benoya/ba5.png',
      '/benoya/ba6.png', '/benoya/ba7.png', '/benoya/ba8.png',
      '/benoya/ba9.png', '/benoya/ba10.png', '/benoya/ba11.png',
      '/benoya/ba12.png', '/benoya/ba13.png', '/benoya/ba14.png',
      '/benoya/ba15.png', '/benoya/ba16.png', '/benoya/ba17.png',
      '/benoya/ba18.png', '/benoya/ba19.png', '/benoya/ba20.png',
      '/benoya/ba21.png', '/benoya/ba22.png', '/benoya/ba23.png',
      '/benoya/ba24.png',
    ],
    featured: false
  },

  {
    id: 'pageantry',
    title: 'Pageantry Tabulation System',
    description: 'A web-based Pageantry Tabulation System developed to digitize and automate the scoring process for beauty pageants and competitions, featuring a centralized admin dashboard for managing candidates, judges, scoring criteria, and real-time result computation. Judges are provided with secure individual accounts to submit scores digitally during live events, while the system automatically calculates totals, rankings, and category awards to minimize human error and ensure accurate, transparent results. The platform was successfully deployed and used in Mr. & Ms. Panagbanga 2025 and Mr. & Ms. Vineyard 2026, significantly improving efficiency, reducing computation errors, and delivering faster result generation compared to manual tabulation methods.',
    image: '/tabulation/tabcover.png',
    techStack: ['React', 'Tailwind CSS', 'Laravel','MySQL'],
    gallery: [
      '/tabulation/tabcover.png', '/tabulation/tab1.png', '/tabulation/tab2.png',
      '/tabulation/tab3.png', '/tabulation/tab4.png', '/tabulation/tab5.png',
      '/tabulation/tab6.png', '/tabulation/tab7.png', '/tabulation/tab8.png',
      '/tabulation/tab9.png', '/tabulation/tab10.png', '/tabulation/tab11.png',
      '/tabulation/tab12.jpg', '/tabulation/tab13.jpg', '/tabulation/tab14.jpg',
      '/tabulation/tab15.jpg',
    ],
    featured: false
  },

  {
    id: 'computer',
    title: 'Computer Tracking System',
    description: 'A web-based Computer Tracking System developed for the library to monitor computer laboratory availability and manage student access efficiently. The system allows students to view real-time computer occupancy status and determine whether the laboratory is full or available. If all units are occupied, students can join a digital queue, and the system automatically notifies them when a computer becomes available. By replacing manual monitoring and physical waiting lines, the platform improves fairness, reduces congestion, and enhances the overall student experience while ensuring efficient computer usage management.',
    image: '/computer/comcover.png',
    techStack: ['React', 'Tailwind CSS', 'Laravel','MySQL'],
    gallery: [
      '/computer/comcover.png', '/computer/comp1.png', '/computer/comp2.png',
      '/computer/comp3.png', '/computer/comp4.png', '/computer/comp5.png',
      '/computer/comp6.png', '/computer/comp7.png', '/computer/comp8.png',
      '/computer/comp9.png', '/computer/comp10.png', '/computer/comp11.png',
      '/computer/com12.png', '/computer/com13.png', '/computer/com14.png',
      '/computer/com15.jpg',
    ],
    featured: false
  },

  {
    id: 'school',
    title: 'School Management System',
    description: 'A web-based School Management System designed to streamline academic and administrative processes through a role-based platform with three user types: Admin, Instructor, and Student. The system provides separate dashboards and functionalities for each role, allowing administrators to manage users, courses, and academic records; instructors to handle class management, grading, and student performance tracking; and students to view enrolled subjects, grades, and academic information. By centralizing academic operations into a single platform, the system improves efficiency, data accuracy, and communication between administrators, faculty, and students.',
    image: '/sm/smcover.png',
    techStack: ['React', 'Tailwind CSS', 'Laravel','MySQL'],
    gallery: [
      '/sm/smcover.png', '/sm/sm1.png', '/sm/sm2.png',
      '/sm/sm3.png', '/sm/sm4.png', '/sm/sm5.png',
      '/sm/sm6.png', '/sm/sm7.png', '/sm/sm8.png',
      '/sm/sm9.png', '/sm/sm10.png', '/sm/sm11.png',
      '/sm/sm12.png', '/sm/sm13.png', '/sm/sm14.png',
      '/sm/sm15.png', '/sm/sm16.png', '/sm/sm17.png',
      '/sm/sm18.png', '/sm/sm19.png', '/sm/sm20.png',
      '/sm/sm21.png', '/sm/sm22.png', '/sm/sm23.png',
      '/sm/sm24.png', '/sm/sm25.png',
    ],
    featured: false
  },

  {
    id: 'matria',
    title: 'Matria Marine Services',
    description: 'A primarily frontend-focused web system developed for Matria Marine Services (www.matriamarine.com) to present company information and support basic administrative content management. The platform provides a clean and responsive user interface designed to showcase services, operations, and organizational information. The system includes a simple backend functionality that allows administrators to upload and manage images for content updates. Built to deliver an intuitive user experience, the project emphasizes layout design, responsiveness, and interface presentation rather than complex server-side processing.',
    image: '/matria/matriacov.png',
    link: 'https://www.matriamarine.com',
    techStack: ['React', 'Tailwind CSS', 'Laravel','MySQL','S3 Bucket'],
    gallery: [
      '/matria/matriacov.png', '/matria/matria1.png', '/matria/matria2.png',
      '/matria/matria3.png', '/matria/matria4.png'
    ],
    featured: false
  },

  {
    id: 'payroll',
    title: 'Payroll System',
    description: 'A web-based Payroll and Employee Management System designed to streamline salary computation and workforce administration. The system manages employee records, job roles, and compensation details while automating payroll calculations based on configured rates and work data. It provides structured employee profiling, payroll tracking, and organized record management to ensure accurate salary processing and reduced administrative workload. By digitizing payroll operations, the platform improves efficiency, minimizes computation errors, and enhances transparency in employee compensation management.',
    image: '/payroll/payrollcov.png',
    techStack: ['React', 'Tailwind CSS', 'Laravel','MySQL'],
    gallery: [
      '/payroll/payrollcov.png', '/payroll/payroll1.png', '/payroll/payroll2.png',
      '/payroll/payroll3.png', '/payroll/payroll4.png', '/payroll/payroll5.png',
      '/payroll/payroll6.png',
    ],
    featured: false
  },

  {
    id: 'yuna',
    title: 'Studio Yuna',
    description: 'This website is a modern fashion-inspired landing page designed to showcase curated clothing collections with a minimalist and premium aesthetic. It features a slideshow hero section, smooth animations, and visually engaging product displays to create an elegant browsing experience.',
    image: '/yuna/yuna1.png',
    techStack: ['React', 'Tailwind CSS'],
    gallery: [
      '/yuna/yuna1.png', '/yuna/yuna2.png', '/yuna/yuna3.png',
      '/yuna/yuna4.png', '/yuna/yuna5.png', '/yuna/yuna6.png',
      '/yuna/yuna7.png', '/yuna/yuna8.png', '/yuna/yuna9.png',
    ],
    featured: false
  },

  {
    id: 'yunails',
    title: 'YuNails — Luxury Artistry',
    description: 'This project is a fully responsive luxury nail studio website concept built to showcase modern nail extensions and refined nail artistry. The design blends soft feminine tones with minimal structure, creating an elegant and immersive brand presence.',
    image: '/yunails/yunails1.png',
    techStack: ['React', 'Tailwind CSS'],
    gallery: [
      '/yunails/yunails1.png', '/yunails/yunails2.png', '/yunails/yunails3.png',
      '/yunails/yunails4.png', '/yunails/yunails5.png', '/yunails/yunails6.png',
    ],
    featured: false
  },

];
