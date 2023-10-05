import { Course } from '../types';

const Total = ({ courses }: { courses: Course[] }) => {
  return (
    <p>
      Number of exercises{' '}
      {courses.reduce((acc, cur) => acc + cur.exerciseCount, 0)}
    </p>
  );
};

export default Total;
