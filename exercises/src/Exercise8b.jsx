import { useState } from 'react';

export default function BMICalculator() {
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [bmi, setBmi] = useState('');
    const [bmiIndex, setBmiIndex] = useState(0);

    function calcBMI() {
        if (weight > 0 && height > 0) {
            const heightInMeters = height / 100;
            const bmiValue = weight / (heightInMeters ** 2);

            setBmiIndex(bmiValue.toFixed(2));

            let bmiLabel = '';

            if (bmiValue < 18.5) {
                bmiLabel = "Sovány";
            }
            if (bmiValue >= 18.5 && bmi < 24.9) {
                bmiLabel = "Normális testsúly";
            }
            if (bmiValue >= 25 && bmi < 29.9) {
                bmiLabel = "Túlsúly";
            }
            if (bmiValue) {
                bmiLabel = "Elhízás";
            }

            setBmi(bmiLabel);
        }
    };

    return <div>
        <label>
            Súly (kg):
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </label>
        <br />
        <label>
            Magasság (cm):
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
        </label>
        <br />
        <button onClick={calcBMI}>
            Számol
        </button>
        <br />
        <strong>BMI: {bmi}</strong>
        <br />
        <strong>BMI index: {bmiIndex}</strong>
    </div>

}