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

export default Total;