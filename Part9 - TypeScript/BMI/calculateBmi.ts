type BMIResult = 'Underweight' | 'Normal range' | 'Overweight' | 'Obese';

const calculateBmi = (height_cm: number, weight_kg: number): BMIResult =>
{
    if (height_cm <= 0 || weight_kg <= 0) {
        throw new Error('Height and weight must be positive values.');
    }

    const height_m = height_cm / 100;

    const bmi = weight_kg / (height_m * height_m);

    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi < 25) {
        return 'Normal range';
    } else if (bmi < 30) {
        return 'Overweight';
    } else {
        return 'Obese';
    }
}

interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments. Usage: ts-node calculateBmi.ts <height_cm> <weight_kg>');
  if (args.length > 4) throw new Error('Too many arguments. Usage: ts-node calculateBmi.ts <height_cm> <weight_kg>');

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Provided values were not numbers!');
  }

  return {
    height: height,
    weight: weight
  };
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.error(errorMessage);
}
