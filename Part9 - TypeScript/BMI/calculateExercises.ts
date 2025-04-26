interface ExerciseRes {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: 1 | 2 | 3; // Defined rating values
    ratingDescription: string;
    target: number;
    average: number;
}

interface ExerciseInput {
    target: number;
    dailyHours: number[];
}

const calculateExercises = (targetHours: number, dailyHours: number[]) : ExerciseRes => {
    if (targetHours <= 0) {
        throw new Error('Target hours must be positive.');
    }
    if (dailyHours.length === 0) {
        throw new Error('Daily exercise hours list cannot be empty.');
    }

    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(h => h > 0).length;
    const totalHours = dailyHours.reduce((sum, h) => sum + h, 0);
    const average = totalHours / periodLength;
    const success = average >= targetHours;

    let rating: 1 | 2 | 3;
    let ratingDescription: string;

    const ratio = average / targetHours;

    if (ratio >= 1) {
        rating = 3;
        ratingDescription = 'Excellent! Target met or exceeded.';
    } else if (ratio >= 0.75) {
        rating = 2;
        ratingDescription = 'Not too bad but could be better.';
    } else {
        rating = 1;
        ratingDescription = 'Needs improvement, target far from reached.';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target: targetHours,
        average
      };
};

const parseExerciseArguments = (args: string[]): ExerciseInput => {
    if (args.length < 4) throw new Error('Not enough arguments. Usage: ts-node calculateExercises.ts <target_hours> <day1_hours> <day2_hours> ...');

    const targetStr = args[2];
    const dailyHoursStr = args.slice(3);

    const target = Number(targetStr);
    if (isNaN(target)) {
        throw new Error('Target hours must be a number!');
    }

    const dailyHours = dailyHoursStr.map(h => Number(h));
    if (dailyHours.some(isNaN)) {
        throw new Error('All daily exercise hours must be numbers!');
    }

    return {
        target: target,
        dailyHours: dailyHours
    };
};

try {
    const { target, dailyHours } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(target, dailyHours));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.error(errorMessage);
}

export { calculateExercises, ExerciseRes };