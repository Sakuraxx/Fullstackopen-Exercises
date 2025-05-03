import { DiaryEntry } from "../types";

interface DiariesProps {
  diaries: DiaryEntry[]
}

const Diaries = (diariesProps: DiariesProps) => {
  
  const diaries = diariesProps.diaries;

  return (
    <div>
        <h2>Diary entries</h2>
        {diaries.map((d, ind) => {
           return <div key={ind}>
            <h3>{d.date}</h3>
            <p>visibility: {d.visibility}</p>
            <p>weather: {d.weather}</p>
           </div>
        })}
    </div>
  )
}

export default Diaries;