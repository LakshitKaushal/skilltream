import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './models/Course.js';

dotenv.config();

const courses = [
  {
    code: 1001,
    title: 'The Web Developer Bootcamp',
    description: 'Learn HTML, CSS, Node, and more from scratch. One of the most popular web dev courses — now completely free.',
    provider: 'freeCodeCamp',
    image: 'https://img.youtube.com/vi/nu_pCVPKzTk/maxresdefault.jpg',
    duration: 12,
    courseUrl: 'https://www.youtube.com/watch?v=nu_pCVPKzTk',
    tags: ['HTML', 'CSS', 'JavaScript', 'Web Dev']
  },
  {
    code: 1002,
    title: 'Python for Beginners – Full Course',
    description: 'A complete Python beginner course covering variables, data structures, functions, OOP, and real-world projects.',
    provider: 'freeCodeCamp',
    image: 'https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg',
    duration: 4,
    courseUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
    tags: ['Python', 'Programming', 'Beginner']
  },
  {
    code: 1003,
    title: 'React JS – Full Course for Beginners',
    description: 'Learn React from zero to hero. Covers components, hooks, state management, routing, and building real projects.',
    provider: 'freeCodeCamp',
    image: 'https://img.youtube.com/vi/bMknfKXIFA8/maxresdefault.jpg',
    duration: 12,
    courseUrl: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
    tags: ['React', 'JavaScript', 'Frontend']
  },
  {
    code: 1004,
    title: 'Machine Learning with Python',
    description: 'Hands-on machine learning from scratch using Python, scikit-learn, and real datasets. No prior ML experience needed.',
    provider: 'freeCodeCamp',
    image: 'https://img.youtube.com/vi/tPYj3fFJGjk/maxresdefault.jpg',
    duration: 10,
    courseUrl: 'https://www.youtube.com/watch?v=tPYj3fFJGjk',
    tags: ['Machine Learning', 'Python', 'AI', 'Data Science']
  },
  {
    code: 1005,
    title: 'Node.js and Express – Full Course',
    description: 'Build scalable backend applications with Node.js and Express. Covers REST APIs, middleware, authentication and deployment.',
    provider: 'freeCodeCamp',
    image: 'https://img.youtube.com/vi/Oe421EPjeBE/maxresdefault.jpg',
    duration: 8,
    courseUrl: 'https://www.youtube.com/watch?v=Oe421EPjeBE',
    tags: ['Node.js', 'Express', 'Backend', 'JavaScript']
  },
  {
    code: 1006,
    title: 'SQL and Databases – Full Course',
    description: 'Master SQL from the ground up. Learn queries, joins, transactions, indexes, and database design principles.',
    provider: 'freeCodeCamp',
    image: 'https://img.youtube.com/vi/HXV3zeQKqGY/maxresdefault.jpg',
    duration: 4,
    courseUrl: 'https://www.youtube.com/watch?v=HXV3zeQKqGY',
    tags: ['SQL', 'Database', 'Backend']
  },
  {
    code: 1007,
    title: 'Data Structures and Algorithms in JavaScript',
    description: 'Master DSA concepts for coding interviews — arrays, linked lists, trees, graphs, sorting, and dynamic programming.',
    provider: 'freeCodeCamp',
    image: 'https://img.youtube.com/vi/t2CEgPsws3U/maxresdefault.jpg',
    duration: 8,
    courseUrl: 'https://www.youtube.com/watch?v=t2CEgPsws3U',
    tags: ['DSA', 'Algorithms', 'JavaScript', 'Interview Prep']
  },
  {
    code: 1008,
    title: 'Docker and Kubernetes – Full Course',
    description: 'Learn containerization with Docker and orchestration with Kubernetes. Build and deploy production-grade apps.',
    provider: 'TechWorld with Nana',
    image: 'https://img.youtube.com/vi/3c-iBn73dDE/maxresdefault.jpg',
    duration: 5,
    courseUrl: 'https://www.youtube.com/watch?v=3c-iBn73dDE',
    tags: ['Docker', 'Kubernetes', 'DevOps', 'Cloud']
  },
  {
    code: 1009,
    title: 'TypeScript for Beginners',
    description: 'A complete TypeScript crash course from zero. Learn types, interfaces, generics, and integrate with React projects.',
    provider: 'Traversy Media',
    image: 'https://img.youtube.com/vi/BCg4U1FzODs/maxresdefault.jpg',
    duration: 2,
    courseUrl: 'https://www.youtube.com/watch?v=BCg4U1FzODs',
    tags: ['TypeScript', 'JavaScript', 'Frontend']
  },
  {
    code: 1010,
    title: 'Full Stack Django and React',
    description: 'Build a full-stack web application using Django REST Framework and React. Perfect for Python developers moving to full stack.',
    provider: 'Dennis Ivy',
    image: 'https://img.youtube.com/vi/JD-age0BPVo/maxresdefault.jpg',
    duration: 7,
    courseUrl: 'https://www.youtube.com/watch?v=JD-age0BPVo',
    tags: ['Django', 'Python', 'React', 'Full Stack']
  },
  {
    code: 1011,
    title: 'Git and GitHub – Full Course',
    description: 'Learn Git from scratch: commits, branching, merging, rebasing, pull requests, and working in teams on GitHub.',
    provider: 'freeCodeCamp',
    image: 'https://img.youtube.com/vi/RGOj5yH7evk/maxresdefault.jpg',
    duration: 7,
    courseUrl: 'https://www.youtube.com/watch?v=RGOj5yH7evk',
    tags: ['Git', 'GitHub', 'Version Control', 'DevOps']
  },
  {
    code: 1012,
    title: 'CSS Flexbox and Grid – Full Course',
    description: 'Master modern CSS layouts with Flexbox and Grid. Build responsive, beautiful web designs from scratch.',
    provider: 'freeCodeCamp',
    image: 'https://img.youtube.com/vi/tXIhdp5R7sc/maxresdefault.jpg',
    duration: 8,
    courseUrl: 'https://www.youtube.com/watch?v=tXIhdp5R7sc',
    tags: ['CSS', 'Flexbox', 'Grid', 'Frontend']
  },
  {
    code: 1013,
    title: 'Java Programming – Full Course',
    description: 'A complete Java programming course for beginners. Covers OOP, data structures, file I/O, and real-world applications.',
    provider: 'freeCodeCamp',
    image: 'https://img.youtube.com/vi/GoXwIVyNvX0/maxresdefault.jpg',
    duration: 9,
    courseUrl: 'https://www.youtube.com/watch?v=GoXwIVyNvX0',
    tags: ['Java', 'OOP', 'Programming']
  },
  {
    code: 1014,
    title: 'MongoDB – Full Tutorial for Beginners',
    description: 'Learn MongoDB from the ground up — CRUD, aggregation, indexing, Atlas cloud, and integration with Node.js.',
    provider: 'Traversy Media',
    image: 'https://img.youtube.com/vi/-56x56UppqQ/maxresdefault.jpg',
    duration: 2,
    courseUrl: 'https://www.youtube.com/watch?v=-56x56UppqQ',
    tags: ['MongoDB', 'NoSQL', 'Database', 'Backend']
  },
  {
    code: 1015,
    title: 'AWS Cloud Practitioner – Full Course',
    description: 'Prepare for the AWS Cloud Practitioner certification with this comprehensive, free course covering all exam topics.',
    provider: 'freeCodeCamp',
    image: 'https://img.youtube.com/vi/SOTamWNgDKc/maxresdefault.jpg',
    duration: 14,
    courseUrl: 'https://www.youtube.com/watch?v=SOTamWNgDKc',
    tags: ['AWS', 'Cloud', 'DevOps', 'Certification']
  },
  {
    code: 1016,
    title: 'Ethical Hacking Full Course',
    description: 'Learn ethical hacking and penetration testing concepts from scratch — network scanning, exploitation, and defense strategies.',
    provider: 'freeCodeCamp',
    image: 'https://img.youtube.com/vi/3Kq1MIfTWCE/maxresdefault.jpg',
    duration: 15,
    courseUrl: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE',
    tags: ['Cybersecurity', 'Hacking', 'Networking']
  },
  {
    code: 1017,
    title: 'Deep Learning with TensorFlow',
    description: 'Build neural networks and deep learning models using TensorFlow and Keras. Covers CNNs, RNNs, and transfer learning.',
    provider: 'freeCodeCamp',
    image: 'https://img.youtube.com/vi/tPYj3fFJGjk/maxresdefault.jpg',
    duration: 6,
    courseUrl: 'https://www.youtube.com/watch?v=tPYj3fFJGjk',
    tags: ['Deep Learning', 'TensorFlow', 'AI', 'Python']
  },
  {
    code: 1018,
    title: 'Linux Command Line – Full Course',
    description: 'Master the Linux command line for developers and DevOps. Covers file system, permissions, bash scripting, and more.',
    provider: 'freeCodeCamp',
    image: 'https://img.youtube.com/vi/ZtqBQ68cfJc/maxresdefault.jpg',
    duration: 5,
    courseUrl: 'https://www.youtube.com/watch?v=ZtqBQ68cfJc',
    tags: ['Linux', 'Bash', 'DevOps', 'Command Line']
  },
  {
    code: 1019,
    title: 'Next.js 14 – Full Course',
    description: 'Build full-stack React apps with Next.js 14. Covers App Router, Server Components, API routes, authentication, and deployment.',
    provider: 'Traversy Media',
    image: 'https://img.youtube.com/vi/__mSgDEOyv8/maxresdefault.jpg',
    duration: 4,
    courseUrl: 'https://www.youtube.com/watch?v=__mSgDEOyv8',
    tags: ['Next.js', 'React', 'Full Stack', 'JavaScript']
  },
  {
    code: 1020,
    title: 'Flutter & Dart – Full App Development Course',
    description: 'Build cross-platform mobile apps for iOS and Android with Flutter and Dart from scratch with real projects.',
    provider: 'freeCodeCamp',
    image: 'https://img.youtube.com/vi/VPvVD8t4AfY/maxresdefault.jpg',
    duration: 10,
    courseUrl: 'https://www.youtube.com/watch?v=VPvVD8t4AfY',
    tags: ['Flutter', 'Dart', 'Mobile', 'App Dev']
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/skillstream');
    console.log('MongoDB connected');

    await Course.deleteMany({});
    console.log('Cleared existing courses');

    const inserted = await Course.insertMany(courses);
    console.log(`✅ Seeded ${inserted.length} courses successfully!`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
