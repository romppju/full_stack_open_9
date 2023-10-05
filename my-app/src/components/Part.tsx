import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ course }: { course: CoursePart }) => {
  console.log(course);
  switch (course.kind) {
    case 'basic':
      return (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <p>
            <i>{course.description}</i>
          </p>
        </div>
      );
    case 'group':
      return (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <p>project exercises {course.groupProjectCount}</p>
        </div>
      );
    case 'background':
      return (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <p>
            <i>{course.description}</i>
          </p>
          <p>{course.backgroundMaterial}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <p>
            <i>{course.description}</i>
          </p>
          <p>required skills: {course.requirements.join(', ')}</p>
        </div>
      );
    default:
      return assertNever(course);
  }
};

export default Part;
