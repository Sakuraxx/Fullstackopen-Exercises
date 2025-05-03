const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  // Header
  interface HeaderProps {
    name: string;
  }

  const Header = (props: HeaderProps) => {
    return <h1>{props.name}</h1>;
  }

  // Content
  interface Course {
    name: string, 
    exerciseCount: number
  }

  interface ContentProps {
    courseParts: Course[];
  }

  const Content = (contentProps: ContentProps) => {
    return(
      <div>
        {
          contentProps.courseParts.map((part, ind) => (
            <p key = {ind}>
              {part.name} {part.exerciseCount} 
            </p>
          ))
        }
      </div>
    );
  };

  // Totoal
  interface TotalProps {
    totalExercises: number
  }

  const Total = (totalProps: TotalProps) => {
    return (
    <p>
      Number of exercises {totalProps.totalExercises}
    </p>)
  }

  return (
    <div>
      <Header name={courseName}/>
      <Content courseParts={courseParts}/>
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
