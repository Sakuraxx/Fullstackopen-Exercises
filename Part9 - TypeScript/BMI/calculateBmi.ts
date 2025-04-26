type BMIResult = 'Underweight' | 'Normal range' | 'Overweight' | 'Obese';

const calculateBmi = (height_cm: number, weight_kg: number) : BMIResult =>
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


try {
    console.log(calculateBmi(180, 74)); 
    console.log(calculateBmi(180, 50));
    console.log(calculateBmi(180, 90)); 
    console.log(calculateBmi(180, 110));
    console.log(calculateBmi(180, -10));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.error(errorMessage);
}
