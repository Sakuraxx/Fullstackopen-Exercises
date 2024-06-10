const Course = ({ course }) => {
  console.log(course);
  let total = course.parts.reduce((sum, item) => sum + item.exercises, 0);
  return (
    <>
      <Header header={course.name}></Header>
      <Content parts={course.parts}></Content>
      <b>total of {total} exercises</b>
    </>
  );
};

const Header = ({ header }) => {
  return <h2>{header}</h2>;
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, index) => (
        <Part key={index} name={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

export default Course;
