import { Code, Palette, Database, Globe, ShoppingCart, MessageSquare } from 'lucide-react';

export const skills = [
  { name: 'React JS', level: 90, icon: 'Code' },
  { name: 'HTML', level: 95, icon: 'Code' },
  { name: 'CSS', level: 95, icon: 'Palette' },
  { name: 'PHP', level: 85, icon: 'Code' },
  { name: 'Laravel', level: 85, icon: 'Code' },
  { name: 'JavaScript', level: 90, icon: 'Code' },
  { name: 'Tailwind CSS', level: 90, icon: 'Palette' },
  { name: 'MySQL', level: 80, icon: 'Database' },
  { name: 'Git', level: 85, icon: 'Code' },
  { name: 'REST APIs', level: 80, icon: 'Globe' },
  { name: 'Node.js', level: 75, icon: 'Code' },
  { name: 'Responsive Design', level: 95, icon: 'Globe' }
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
  }
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