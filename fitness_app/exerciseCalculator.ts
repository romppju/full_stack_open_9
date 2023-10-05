interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseArguments = (
  args: string[]
): { target: number; days: number[] } => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const daysAsNumbers = [];

  if (isNaN(Number(args[2]))) {
    throw new Error('Provided values were not numbers!');
  }

  for (let i = 3; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      daysAsNumbers.push(Number(args[i]));
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

  return {
    target: Number(args[2]),
    days: daysAsNumbers,
  };
};

export const calculateExercises = (target: number, days: number[]): Result => {
  const periodLength = days.length;
  const trainingDays = days.filter((d) => d > 0).length;
  const average = days.reduce((acc, cur) => acc + cur, 0) / periodLength;
  const success = average < target ? false : true;
  const rating = average < 0.5 * target ? 1 : average < target ? 2 : 3;
  const ratingDescription = rating === 1 ? 'bad' : rating === 2 ? 'ok' : 'good';

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, days } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(target, days));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
