export declare class Workout {
  timer: number;
  exercises: Exercise[];
  routineID: string;
  done: boolean;
  title: string;
  restStart: number;
  edit: boolean
}

declare class Exercise {
  rest: number;
  sets: Set[]
  name: string;
  barbell: boolean;
}

declare class Set{
  reps: number;
  progress: string;
  weight: number;
}
