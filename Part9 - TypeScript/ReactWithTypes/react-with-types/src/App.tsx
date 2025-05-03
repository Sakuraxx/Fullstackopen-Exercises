import Part from "./components/part";
import courseParts from "./data/courses";

const App = () => {
  const courseName = "Half Stack application development";
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  // Header
  interface HeaderProps {
    name: string;
  }

  const Header = (props: HeaderProps) => {
    return <h1>{props.name}</h1>;
  }

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
      <Part courses={courseParts}/>
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
