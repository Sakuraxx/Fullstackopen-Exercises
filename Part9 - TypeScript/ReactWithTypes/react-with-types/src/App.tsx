import Part from "./components/part";
import courseParts from "./data/courses";
import Header from "./components/header";
import Total from "./components/total";

const App = () => {
  const courseName = "Half Stack application development";
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName}/>
      <Part courses={courseParts}/>
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
