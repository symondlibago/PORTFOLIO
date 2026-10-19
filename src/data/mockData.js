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
    id: 'novamdk',
    title: 'Nova MDK — Telehealth Platform',
    description: 'An online care platform covering weight loss, longevity, skin health, sexual wellness and recovery. Someone arriving unsure of what they need starts on a short triage quiz rather than a catalogue, and only then moves into the full medical intake that a licensed provider reviews before anything is prescribed and shipped. Around that sit a treatment catalogue, a patient portal, a weight-loss calculator, a supplements store and an article library. Tracking is deliberately route-aware — the tag manager loads on public pages only, so landing straight on the intake form or the portal never fetches it, and the support chat is confined to the portal instead of floating over a medical questionnaire.',
    image: '/novamdk/novamdk1.avif',
    link: 'https://www.novamdk.com',
    techStack: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    gallery: [
      '/novamdk/novamdk1.avif', '/novamdk/novamdk2.avif', '/novamdk/novamdk3.avif',
      '/novamdk/novamdk4.avif', '/novamdk/novamdk5.avif', '/novamdk/novamdk6.avif',
      '/novamdk/novamdk7.avif', '/novamdk/novamdk8.avif', '/novamdk/novamdk9.avif',
      '/novamdk/novamdk10.avif', '/novamdk/novamdk11.avif', '/novamdk/novamdk12.avif',
    ],
    featured: false
  },

  {
    id: 'motionrx',
    title: 'MotionRx — Wellness Clinic',
    description: 'A site for MotionRx, a Costa Mesa clinic offering IV nutrient therapy, NAD+, hormone optimization, medical weight management, peptide therapy and lab testing. Every service has its own page, and booking runs through a Boulevard overlay so nobody has to leave the site to reserve a slot. Underneath it is a small design system driven entirely by data attributes on the document — palette, font pairing, weight and section layout are all swappable, saved per visitor and live-updated over postMessage when the site is previewed inside an editing iframe. Memberships and pricing, patient stories, team bios and an FAQ make up the rest, with MedicalClinic structured data for local search.',
    image: '/motionrx/motionrx1.avif',
    link: 'https://motionrx.co',
    techStack: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    gallery: [
      '/motionrx/motionrx1.avif', '/motionrx/motionrx2.avif', '/motionrx/motionrx3.avif',
      '/motionrx/motionrx4.avif', '/motionrx/motionrx5.avif', '/motionrx/motionrx6.avif',
      '/motionrx/motionrx7.avif', '/motionrx/motionrx8.avif', '/motionrx/motionrx9.avif',
    ],
    featured: false
  },

  {
    id: 'dpcy',
    title: 'DPCY Health Care — Clinic Management System',
    description: 'A monitoring and management system for DPCY Health Care, a diagnostic and drug testing centre. The counter runs on a single receipt screen: register the patient, pick their services, and the receipt totals itself on the right while the patient type — regular, PWD, senior or Yakap member — applies the correct discount automatically, then saves with or without printing. Everything downstream feeds off that one entry. Discounted patients are added to a PWD/senior/Yakap registry that links each record back to the receipt it came from, sales roll up daily, weekly, monthly and yearly with an Excel export, and the dashboard tracks revenue against expenses, service availments over a chosen date range, and a daily attendance log for staff.',
    image: '/dcpy/dcpy1.avif',
    techStack: ['React', 'Tailwind CSS', 'Laravel', 'MySQL'],
    gallery: [
      '/dcpy/dcpy1.avif', '/dcpy/dcpy2.avif', '/dcpy/dcpy3.avif',
      '/dcpy/dcpy4.avif', '/dcpy/dcpy5.avif', '/dcpy/dcpy6.avif',
      '/dcpy/dcpy7.avif', '/dcpy/dcpy8.avif', '/dcpy/dcpy9.avif',
      '/dcpy/dcpy10.avif',
    ],
    featured: false
  },

  {
    id: 'nourish',
    title: 'Nourish — Offline Social Club',
    description: 'A live site for Nourish, a Halifax social club that runs real-life events instead of another group chat. The main job was getting people from browsing to actually booking a spot, so the calendar does most of the heavy lifting — filter by date, category or the kind of night you are after, then reserve or set a reminder without leaving the page. There is also a long-form "The Why" page, an FAQ and contact form, and a dashboard for members and guests. Light and dark themes throughout, and page changes that fade instead of jolting you around.',
    image: '/nourish/nourish1.avif',
    link: 'https://atnourish.ca',
    techStack: ['Astro', 'TypeScript', 'Tailwind CSS'],
    gallery: [
      '/nourish/nourish1.avif', '/nourish/nourish2.avif', '/nourish/nourish3.avif',
      '/nourish/nourish7.avif', '/nourish/nourish8.avif', '/nourish/nourish4.avif',
      '/nourish/nourish5.avif', '/nourish/nourish6.avif',
    ],
    featured: false
  },

  {
    id: 'kohi-shop',
    title: 'Kohi Coffee Shop',
    description: 'A premium static coffee shop interface built with a focus on minimalist aesthetics and smooth user interactions.',
    image: '/kohi/kohihome.avif',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    gallery: [
      '/kohi/kohi1.avif', '/kohi/kohi2.avif', '/kohi/kohi3.avif',
      '/kohi/kohi4.avif', '/kohi/kohi5.avif', '/kohi/kohi6.avif',
      '/kohi/kohi7.avif', '/kohi/kohi8.avif', '/kohi/kohi9.avif',
      '/kohi/kohi10.avif', '/kohi/kohi11.avif', '/kohi/kohi12.avif'
    ],
    featured: false
  },

  {
    id: 'tupad',
    title: 'Tupad - DOLE',
    description: 'A web-based monitoring system developed to support the implementation of the TUPAD (Tulong Panghanapbuhay sa Ating Disadvantaged/Displaced Workers) emergency employment program. The system streamlines the management of beneficiary records, work assignments, attendance tracking, and payroll monitoring. It provides real-time data tracking, organized reporting, and improved transparency in monitoring work program progress. The platform was designed to enhance efficiency, reduce manual documentation, and support accurate record-keeping for program coordinators.',
    image: '/tupad/tupacover.avif',
    techStack: ['React', 'CSS', 'MUI', 'Laravel','MySQL'],
    gallery: [
      '/tupad/tupacover.avif', '/tupad/tupad1.avif', '/tupad/tupad2.avif',
      '/tupad/tupad3.avif', '/tupad/tupad4.avif', '/tupad/tupad5.avif',
      '/tupad/tupad6.avif', '/tupad/tupad7.avif',
    ],
    featured: false
  },

  {
    id: 'gip',
    title: 'GIP - DOLE',
    description: 'A digital monitoring system designed to manage and track interns under the Government Internship Program (GIP). The system handles intern profiling,stipend monitoring, and report generation. It streamlines administrative processes, improves data accuracy, and enhances transparency in monitoring intern performance and program implementation.',
    image: '/gip/gipcover.avif',
    techStack: ['React', 'CSS', 'MUI', 'Laravel','MySQL'],
    gallery: [
      '/gip/gipcover.avif', '/gip/gip1.avif', '/gip/gip2.avif',
      '/gip/gip3.avif', '/gip/gip4.avif', '/gip/gip5.avif',
      '/gip/gip6.avif',
    ],
    featured: false
  },

  {
    id: 'benoya',
    title: 'BA Monitoring System',
    description: 'A comprehensive web-based Business Administration (BA) Monitoring System designed to centralize and manage operational workflows within the organization. The system integrates multiple monitoring modules into one unified platform to improve efficiency, accountability, and real-time data visibility.',
    image: '/benoya/bacover.avif',
    techStack: ['React', 'Tailwind CSS', 'Laravel','MySQL'],
    gallery: [
      '/benoya/bacover.avif', '/benoya/ba1.avif', '/benoya/ba2.avif',
      '/benoya/ba3.avif', '/benoya/ba4.avif', '/benoya/ba5.avif',
      '/benoya/ba6.avif', '/benoya/ba7.avif', '/benoya/ba8.avif',
      '/benoya/ba9.avif', '/benoya/ba10.avif', '/benoya/ba11.avif',
      '/benoya/ba12.avif', '/benoya/ba13.avif', '/benoya/ba14.avif',
      '/benoya/ba15.avif', '/benoya/ba16.avif', '/benoya/ba17.avif',
      '/benoya/ba18.avif', '/benoya/ba19.avif', '/benoya/ba20.avif',
      '/benoya/ba21.avif', '/benoya/ba22.avif', '/benoya/ba23.avif',
      '/benoya/ba24.avif',
    ],
    featured: false
  },

  {
    id: 'pageantry',
    title: 'Pageantry Tabulation System',
    description: 'A web-based Pageantry Tabulation System developed to digitize and automate the scoring process for beauty pageants and competitions, featuring a centralized admin dashboard for managing candidates, judges, scoring criteria, and real-time result computation. Judges are provided with secure individual accounts to submit scores digitally during live events, while the system automatically calculates totals, rankings, and category awards to minimize human error and ensure accurate, transparent results. The platform was successfully deployed and used in Mr. & Ms. Panagbanga 2025 and Mr. & Ms. Vineyard 2026, significantly improving efficiency, reducing computation errors, and delivering faster result generation compared to manual tabulation methods.',
    image: '/tabulation/tabcover.avif',
    techStack: ['React', 'Tailwind CSS', 'Laravel','MySQL'],
    gallery: [
      '/tabulation/tabcover.avif', '/tabulation/tab1.avif', '/tabulation/tab2.avif',
      '/tabulation/tab3.avif', '/tabulation/tab4.avif', '/tabulation/tab5.avif',
      '/tabulation/tab6.avif', '/tabulation/tab7.avif', '/tabulation/tab8.avif',
      '/tabulation/tab9.avif', '/tabulation/tab10.avif', '/tabulation/tab11.avif',
      '/tabulation/tab12.jpg', '/tabulation/tab13.jpg', '/tabulation/tab14.jpg',
      '/tabulation/tab15.jpg',
    ],
    featured: false
  },

  {
    id: 'computer',
    title: 'Computer Tracking System',
    description: 'A web-based Computer Tracking System developed for the library to monitor computer laboratory availability and manage student access efficiently. The system allows students to view real-time computer occupancy status and determine whether the laboratory is full or available. If all units are occupied, students can join a digital queue, and the system automatically notifies them when a computer becomes available. By replacing manual monitoring and physical waiting lines, the platform improves fairness, reduces congestion, and enhances the overall student experience while ensuring efficient computer usage management.',
    image: '/computer/comcover.avif',
    techStack: ['React', 'Tailwind CSS', 'Laravel','MySQL'],
    gallery: [
      '/computer/comcover.avif', '/computer/comp1.avif', '/computer/comp2.avif',
      '/computer/comp3.avif', '/computer/comp4.avif', '/computer/comp5.avif',
      '/computer/comp6.avif', '/computer/comp7.avif', '/computer/comp8.avif',
      '/computer/comp9.avif', '/computer/comp10.avif', '/computer/comp11.avif',
      '/computer/com12.avif', '/computer/com13.avif', '/computer/com14.avif',
      '/computer/com15.jpg',
    ],
    featured: false
  },

  {
    id: 'school',
    title: 'School Management System',
    description: 'A web-based School Management System designed to streamline academic and administrative processes through a role-based platform with three user types: Admin, Instructor, and Student. The system provides separate dashboards and functionalities for each role, allowing administrators to manage users, courses, and academic records; instructors to handle class management, grading, and student performance tracking; and students to view enrolled subjects, grades, and academic information. By centralizing academic operations into a single platform, the system improves efficiency, data accuracy, and communication between administrators, faculty, and students.',
    image: '/sm/smcover.avif',
    techStack: ['React', 'Tailwind CSS', 'Laravel','MySQL'],
    gallery: [
      '/sm/smcover.avif', '/sm/sm1.avif', '/sm/sm2.avif',
      '/sm/sm3.avif', '/sm/sm4.avif', '/sm/sm5.avif',
      '/sm/sm6.avif', '/sm/sm7.avif', '/sm/sm8.avif',
      '/sm/sm9.avif', '/sm/sm10.avif', '/sm/sm11.avif',
      '/sm/sm12.avif', '/sm/sm13.avif', '/sm/sm14.avif',
      '/sm/sm15.avif', '/sm/sm16.avif', '/sm/sm17.avif',
      '/sm/sm18.avif', '/sm/sm19.avif', '/sm/sm20.avif',
      '/sm/sm21.avif', '/sm/sm22.avif', '/sm/sm23.avif',
      '/sm/sm24.avif', '/sm/sm25.avif',
    ],
    featured: false
  },

  {
    id: 'matria',
    title: 'Matria Marine Services',
    description: 'A primarily frontend-focused web system developed for Matria Marine Services (www.matriamarine.com) to present company information and support basic administrative content management. The platform provides a clean and responsive user interface designed to showcase services, operations, and organizational information. The system includes a simple backend functionality that allows administrators to upload and manage images for content updates. Built to deliver an intuitive user experience, the project emphasizes layout design, responsiveness, and interface presentation rather than complex server-side processing.',
    image: '/matria/matriacov.avif',
    link: 'https://www.matriamarine.com',
    techStack: ['React', 'Tailwind CSS', 'Laravel','MySQL','S3 Bucket'],
    gallery: [
      '/matria/matriacov.avif', '/matria/matria1.avif', '/matria/matria2.avif',
      '/matria/matria3.avif', '/matria/matria4.avif'
    ],
    featured: false
  },

  {
    id: 'payroll',
    title: 'Payroll System',
    description: 'A web-based Payroll and Employee Management System designed to streamline salary computation and workforce administration. The system manages employee records, job roles, and compensation details while automating payroll calculations based on configured rates and work data. It provides structured employee profiling, payroll tracking, and organized record management to ensure accurate salary processing and reduced administrative workload. By digitizing payroll operations, the platform improves efficiency, minimizes computation errors, and enhances transparency in employee compensation management.',
    image: '/payroll/payrollcov.avif',
    techStack: ['React', 'Tailwind CSS', 'Laravel','MySQL'],
    gallery: [
      '/payroll/payrollcov.avif', '/payroll/payroll1.avif', '/payroll/payroll2.avif',
      '/payroll/payroll3.avif', '/payroll/payroll4.avif', '/payroll/payroll5.avif',
      '/payroll/payroll6.avif',
    ],
    featured: false
  },

  {
    id: 'yuna',
    title: 'Studio Yuna',
    description: 'This website is a modern fashion-inspired landing page designed to showcase curated clothing collections with a minimalist and premium aesthetic. It features a slideshow hero section, smooth animations, and visually engaging product displays to create an elegant browsing experience.',
    image: '/yuna/yuna1.avif',
    techStack: ['React', 'Tailwind CSS'],
    gallery: [
      '/yuna/yuna1.avif', '/yuna/yuna2.avif', '/yuna/yuna3.avif',
      '/yuna/yuna4.avif', '/yuna/yuna5.avif', '/yuna/yuna6.avif',
      '/yuna/yuna7.avif', '/yuna/yuna8.avif', '/yuna/yuna9.avif',
    ],
    featured: false
  },

  {
    id: 'yunails',
    title: 'YuNails — Luxury Artistry',
    description: 'This project is a fully responsive luxury nail studio website concept built to showcase modern nail extensions and refined nail artistry. The design blends soft feminine tones with minimal structure, creating an elegant and immersive brand presence.',
    image: '/yunails/yunail1.avif',
    techStack: ['React', 'Tailwind CSS'],
    gallery: [
      '/yunails/yunail1.avif', '/yunails/yunail2.avif', '/yunails/yunail3.avif',
      '/yunails/yunail4.avif', '/yunails/yunail5.avif', '/yunails/yunail6.avif',
      '/yunails/yunail7.avif', '/yunails/yunail8.avif', '/yunails/yunail9.avif',
      '/yunails/yunail10.avif', '/yunails/yunail11.avif', '/yunails/yunail12.avif',
      '/yunails/yunail13.avif',

    ],
    featured: false
  },

];
