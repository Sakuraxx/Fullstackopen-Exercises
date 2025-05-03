import axios from "axios";
import { DiaryEntry } from "../types";


import { apiBaseUrl } from "../constants";

const getAllDiaries = async () => {
  const { data } = await axios.get<DiaryEntry[]>(
    `${apiBaseUrl}/diaries`
  );

  return data;
};

export default {
  getAllDiaries
};

