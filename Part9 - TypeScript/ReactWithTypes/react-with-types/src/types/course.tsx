interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface Description {
  description: string;
}

interface CoursePartBasic extends CoursePartBase, Description {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase, Description {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartBase, Description {
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

export default CoursePart;