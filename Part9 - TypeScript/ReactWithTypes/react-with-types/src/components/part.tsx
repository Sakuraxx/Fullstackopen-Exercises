import CoursePart from "../types/course"

interface PartProps {
  courses: CoursePart[]
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (partProps: PartProps) => {
  var courses = partProps.courses;
  return (
    <>
    {
      courses.map((c, ind) => {
        const key = ind;
        switch(c.kind)
        {
          case 'basic':
            return (
              <div key={key}>
              <p><b>{c.name} {c.exerciseCount}</b></p>
              <p><i>{c.description}</i></p>
            </div>
            );
          case 'group':
            return (
              <div key={key}>
              <p><b>{c.name} {c.exerciseCount}</b></p>
              <p>project exercises {c.groupProjectCount}</p>
            </div>
            );
          case 'background':
            return (
              <div key={key}>
              <p><b>{c.name} {c.exerciseCount}</b></p>
              <p><i>{c.description}</i></p>
              <p>submit to {c.backgroundMaterial}</p>
            </div>
            );
          case 'special':
            return (
              <div key={key}>
              <p><b>{c.name} {c.exerciseCount}</b></p>
              <p><i>{c.description}</i></p>
              <p>required skills: {c.requirements.join(', ')}</p>
            </div>
            );
          default:
            assertNever(c);
            return null;
        }
      })
    }
    </>
  );
}

export default Part;