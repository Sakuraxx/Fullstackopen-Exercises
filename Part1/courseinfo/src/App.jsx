const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Total = ({parts}) => {
  const totalExs = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>Number of exercises {totalExs}</p>
  )
}


const Part = ({ part, exercise }) => {
  return (
    <p>
      {part} - {exercise}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, index) => (<Part key={index} part={part.name} exercise={part.exercises} />))}
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App