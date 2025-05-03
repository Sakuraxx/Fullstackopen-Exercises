import { useState, useEffect } from "react";
import { DiaryEntry } from "./types";
import Diaries from "./components/Diaries"
import diaryService from './services/diaries'

function App() {

  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAllDiaries().then(data => setDiaries(data));
  }, [])

  return (
    <>
      <Diaries diaries={diaries} />
    </>
  )
}

export default App
