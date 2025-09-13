// import { useState } from "react";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { Label } from "../../components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

// export default function RetirementCalculator() {
//   const [inputs, setInputs] = useState({
//     currentAge: "",
//     retirementAge: "",
//     monthlyExpenses: "",
//     lifeExpectancy: "",
//     expectedReturn: "",
//     inflationRate: "",
//     currentSavings: "",
//   });

//   const [results, setResults] = useState({
//     corpusRequired: 0,
//     monthlySIPNeeded: 0,
//     yearsToRetirement: 0,
//     futureMonthlyExpenses: 0,
//     retirementYears: 0,
//     inflationAdjustedReturn: 0,
//   });

//   const calculateRetirement = () => {
//     const currentAge = parseFloat(inputs.currentAge) || 0;
//     const retirementAge = parseFloat(inputs.retirementAge) || 0;
//     const monthlyExpenses = parseFloat(inputs.monthlyExpenses) || 0;
//     const lifeExpectancy = parseFloat(inputs.lifeExpectancy) || 0;
//     const expectedReturn = parseFloat(inputs.expectedReturn) || 0;
//     const inflationRate = parseFloat(inputs.inflationRate) || 0;
//     const currentSavings = parseFloat(inputs.currentSavings) || 0;

//     if (currentAge >= retirementAge || retirementAge >= lifeExpectancy) {
//       return;
//     }

//     const yearsToRetirement = retirementAge - currentAge;
//     const retirementYears = lifeExpectancy - retirementAge;

//     // Future monthly expenses at retirement (accounting for inflation)
//     const futureMonthlyExpenses = monthlyExpenses * Math.pow(1 + inflationRate / 100, yearsToRetirement);

//     // Real return (inflation-adjusted)
//     const realReturn = ((1 + expectedReturn / 100) / (1 + inflationRate / 100) - 1) * 100;

//     // Annual expenses at retirement
//     const annualExpensesAtRetirement = futureMonthlyExpenses * 12;

//     // Corpus required using present value of annuity formula
//     const monthlyRealReturn = realReturn / 100 / 12;
//     const totalRetirementMonths = retirementYears * 12;
    
//     let corpusRequired: number;
//     if (monthlyRealReturn > 0) {
//       // If there's positive real return, use annuity formula
//       corpusRequired = futureMonthlyExpenses * 
//         ((1 - Math.pow(1 + monthlyRealReturn, -totalRetirementMonths)) / monthlyRealReturn);
//     } else {
//       // If no real return, simple multiplication
//       corpusRequired = futureMonthlyExpenses * totalRetirementMonths;
//     }

//     // Future value of current savings
//     const futureValueCurrentSavings = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetirement);
    
//     // Adjusted corpus needed (after accounting for current savings)
//     const adjustedCorpusNeeded = Math.max(0, corpusRequired - futureValueCurrentSavings);

//     // Monthly SIP needed using future value of annuity formula
//     const monthlyReturn = expectedReturn / 100 / 12;
//     const totalMonths = yearsToRetirement * 12;
    
//     let monthlySIPNeeded: number;
//     if (monthlyReturn > 0 && totalMonths > 0) {
//       monthlySIPNeeded = adjustedCorpusNeeded * monthlyReturn / 
//         (Math.pow(1 + monthlyReturn, totalMonths) - 1);
//     } else {
//       monthlySIPNeeded = totalMonths > 0 ? adjustedCorpusNeeded / totalMonths : 0;
//     }

//     setResults({
//       corpusRequired,
//       monthlySIPNeeded: Math.max(0, monthlySIPNeeded),
//       yearsToRetirement,
//       futureMonthlyExpenses,
//       retirementYears,
//       inflationAdjustedReturn: realReturn,
//     });

//     // Log usage analytics
//     fetch("/api/calculator-usage", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         calculatorType: "retirement-calculator",
//         inputData: inputs,
//         resultData: { corpusRequired, monthlySIPNeeded, yearsToRetirement, futureMonthlyExpenses },
//       }),
//     }).catch(console.error);
//   };

//   return (
//     <div>
//       <h3 className="text-2xl font-bold mb-6 text-white" data-testid="text-calculator-title">
//         Retirement Pension Calculator
//       </h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="space-y-4">
//           <div>
//             <Label htmlFor="current-age" className="text-white">Current Age</Label>
//             <Input
//               id="current-age"
//               type="number"
//               placeholder="30"
//               value={inputs.currentAge}
//               onChange={(e) => setInputs({ ...inputs, currentAge: e.target.value })}
//               className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
//               data-testid="input-current-age"
//             />
//           </div>
          
//           <div>
//             <Label htmlFor="retirement-age" className="text-white">Retirement Age</Label>
//             <Input
//               id="retirement-age"
//               type="number"
//               placeholder="60"
//               value={inputs.retirementAge}
//               onChange={(e) => setInputs({ ...inputs, retirementAge: e.target.value })}
//               className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
//               data-testid="input-retirement-age"
//             />
//           </div>
          
//           <div>
//             <Label htmlFor="monthly-expenses" className="text-white">Monthly Expenses Today (₹)</Label>
//             <Input
//               id="monthly-expenses"
//               type="number"
//               placeholder="50000"
//               value={inputs.monthlyExpenses}
//               onChange={(e) => setInputs({ ...inputs, monthlyExpenses: e.target.value })}
//               className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
//               data-testid="input-monthly-expenses"
//             />
//           </div>
          
//           <div>
//             <Label htmlFor="life-expectancy" className="text-white">Life Expectancy</Label>
//             <Input
//               id="life-expectancy"
//               type="number"
//               placeholder="80"
//               value={inputs.lifeExpectancy}
//               onChange={(e) => setInputs({ ...inputs, lifeExpectancy: e.target.value })}
//               className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
//               data-testid="input-life-expectancy"
//             />
//           </div>
          
//           <div>
//             <Label htmlFor="expected-return" className="text-white">Expected Return on Investment (%)</Label>
//             <Input
//               id="expected-return"
//               type="number"
//               step="0.1"
//               placeholder="10"
//               value={inputs.expectedReturn}
//               onChange={(e) => setInputs({ ...inputs, expectedReturn: e.target.value })}
//               className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
//               data-testid="input-expected-return"
//             />
//           </div>
          
//           <div>
//             <Label htmlFor="inflation-rate" className="text-white">Inflation Rate (%)</Label>
//             <Input
//               id="inflation-rate"
//               type="number"
//               step="0.1"
//               placeholder="6"
//               value={inputs.inflationRate}
//               onChange={(e) => setInputs({ ...inputs, inflationRate: e.target.value })}
//               className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
//               data-testid="input-inflation-rate"
//             />
//           </div>
          
//           <div>
//             <Label htmlFor="current-savings" className="text-white">Current Savings (₹)</Label>
//             <Input
//               id="current-savings"
//               type="number"
//               placeholder="0"
//               value={inputs.currentSavings}
//               onChange={(e) => setInputs({ ...inputs, currentSavings: e.target.value })}
//               className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
//               data-testid="input-current-savings"
//             />
//           </div>
          
//           <Button 
//             onClick={calculateRetirement}
//             className="w-full bg-finance-blue hover:bg-blue-600 text-white py-3 rounded-lg font-semibold"
//             data-testid="button-calculate"
//           >
//             Calculate Retirement Needs
//           </Button>
//         </div>
        
//         <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
//           <CardHeader>
//             <CardTitle className="text-white">Retirement Planning</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-3">
//             <div className="flex justify-between text-white">
//               <span>Years to Retirement:</span>
//               <span data-testid="result-years-to-retirement">{results.yearsToRetirement}</span>
//             </div>
//             <div className="flex justify-between text-white">
//               <span>Monthly Expenses at Retirement:</span>
//               <span data-testid="result-future-monthly-expenses">
//                 ₹{Math.round(results.futureMonthlyExpenses).toLocaleString()}
//               </span>
//             </div>
//             <div className="flex justify-between text-white">
//               <span>Retirement Years:</span>
//               <span data-testid="result-retirement-years">{results.retirementYears}</span>
//             </div>
//             <div className="flex justify-between text-white">
//               <span>Real Return (Post-Inflation):</span>
//               <span data-testid="result-real-return">{results.inflationAdjustedReturn.toFixed(2)}%</span>
//             </div>
//             <div className="border-t border-white border-opacity-20 pt-3 space-y-2">
//               <div className="flex justify-between font-bold text-lg text-white">
//                 <span>Corpus Required:</span>
//                 <span className="text-green-400" data-testid="result-corpus-required">
//                   ₹{Math.round(results.corpusRequired).toLocaleString()}
//                 </span>
//               </div>
//               <div className="flex justify-between font-bold text-lg text-white">
//                 <span>Monthly SIP Needed:</span>
//                 <span className="text-blue-400" data-testid="result-monthly-sip-needed">
//                   ₹{Math.round(results.monthlySIPNeeded).toLocaleString()}
//                 </span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }






import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

interface Inputs {
  currentAge: string;
  retirementAge: string;
  monthlyExpenses: string;
  lifeExpectancy: string;
  expectedReturn: string;
  inflationRate: string;
  currentSavings: string;
}

interface Results {
  corpusRequired: number;
  monthlySIPNeeded: number;
  yearsToRetirement: number;
  futureMonthlyExpenses: number;
  retirementYears: number;
  inflationAdjustedReturn: number;
}

export default function RetirementCalculator() {
  const [inputs, setInputs] = useState<Inputs>({
    currentAge: "",
    retirementAge: "",
    monthlyExpenses: "",
    lifeExpectancy: "",
    expectedReturn: "",
    inflationRate: "",
    currentSavings: "",
  });

  const [results, setResults] = useState<Results>({
    corpusRequired: 0,
    monthlySIPNeeded: 0,
    yearsToRetirement: 0,
    futureMonthlyExpenses: 0,
    retirementYears: 0,
    inflationAdjustedReturn: 0,
  });

  const [error, setError] = useState<string>("");

  const calculateRetirement = () => {
    setError("");

    const currentAge = parseFloat(inputs.currentAge) || 0;
    const retirementAge = parseFloat(inputs.retirementAge) || 0;
    const monthlyExpenses = parseFloat(inputs.monthlyExpenses) || 0;
    const lifeExpectancy = parseFloat(inputs.lifeExpectancy) || 0;
    const expectedReturn = parseFloat(inputs.expectedReturn) || 0;
    const inflationRate = parseFloat(inputs.inflationRate) || 0;
    const currentSavings = parseFloat(inputs.currentSavings) || 0;

    if (currentAge <= 0 || retirementAge <= 0 || lifeExpectancy <= 0 || monthlyExpenses <= 0) {
      setError("Please enter all required positive values.");
      return;
    }

    if (currentAge >= retirementAge) {
      setError("Retirement age must be greater than current age.");
      return;
    }

    if (retirementAge >= lifeExpectancy) {
      setError("Life expectancy must be greater than retirement age.");
      return;
    }

    const yearsToRetirement = retirementAge - currentAge;
    const retirementYears = lifeExpectancy - retirementAge;

    // Future monthly expenses at retirement (inflation-adjusted)
    const futureMonthlyExpenses = monthlyExpenses * Math.pow(1 + inflationRate / 100, yearsToRetirement);

    // Real return (inflation-adjusted)
    const realReturn = ((1 + expectedReturn / 100) / (1 + inflationRate / 100) - 1) * 100;
    const monthlyRealReturn = realReturn / 100 / 12;

    const totalRetirementMonths = retirementYears * 12;

    // Corpus required using present value of annuity
    let corpusRequired: number;
    if (monthlyRealReturn > 0) {
      corpusRequired =
        futureMonthlyExpenses *
        ((1 - Math.pow(1 + monthlyRealReturn, -totalRetirementMonths)) / monthlyRealReturn);
    } else {
      corpusRequired = futureMonthlyExpenses * totalRetirementMonths;
    }

    // Future value of current savings (nominal growth)
    const futureValueCurrentSavings = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetirement);

    const adjustedCorpusNeeded = Math.max(0, corpusRequired - futureValueCurrentSavings);

    // Monthly SIP needed (inflation-adjusted)
    const totalMonthsToRetirement = yearsToRetirement * 12;
    let monthlySIPNeeded: number;
    if (monthlyRealReturn > 0) {
      monthlySIPNeeded =
        adjustedCorpusNeeded *
        (monthlyRealReturn / (Math.pow(1 + monthlyRealReturn, totalMonthsToRetirement) - 1));
    } else {
      monthlySIPNeeded = totalMonthsToRetirement > 0 ? adjustedCorpusNeeded / totalMonthsToRetirement : 0;
    }

    setResults({
      corpusRequired: parseFloat(corpusRequired.toFixed(2)),
      monthlySIPNeeded: parseFloat(monthlySIPNeeded.toFixed(2)),
      yearsToRetirement,
      futureMonthlyExpenses: parseFloat(futureMonthlyExpenses.toFixed(2)),
      retirementYears,
      inflationAdjustedReturn: parseFloat(realReturn.toFixed(2)),
    });

    // Log usage analytics
    fetch("/api/calculator-usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calculatorType: "retirement-calculator",
        inputData: inputs,
        resultData: {
          corpusRequired,
          monthlySIPNeeded,
          yearsToRetirement,
          futureMonthlyExpenses,
        },
      }),
    }).catch(console.error);
  };

  // Fields list with explicit mapping to state keys (fixes the earlier issue where id -> state key mismatched)
  const fields: {
    id: string;
    key: keyof Inputs;
    label: string;
    placeholder: string;
    step?: string;
  }[] = [
    { id: "current-age", key: "currentAge", label: "Current Age", placeholder: "30" },
    { id: "retirement-age", key: "retirementAge", label: "Retirement Age", placeholder: "60" },
    { id: "monthly-expenses", key: "monthlyExpenses", label: "Monthly Expenses Today (₹)", placeholder: "50000" },
    { id: "life-expectancy", key: "lifeExpectancy", label: "Life Expectancy", placeholder: "80" },
    { id: "expected-return", key: "expectedReturn", label: "Expected Return on Investment (%)", placeholder: "10", step: "0.1" },
    { id: "inflation-rate", key: "inflationRate", label: "Inflation Rate (%)", placeholder: "6", step: "0.1" },
    { id: "current-savings", key: "currentSavings", label: "Current Savings (₹)", placeholder: "0" },
  ];

  return (
    <div>
      <h3
        className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent"
        data-testid="text-calculator-title"
      >
        Retirement Pension Calculator
      </h3>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {fields.map(({ id, key, label, placeholder, step }) => (
            <div key={id}>
              <Label htmlFor={id} className="text-gray-700 font-medium">
                {label}
              </Label>
              <Input
                id={id}
                type="number"
                placeholder={placeholder}
                step={step}
                value={inputs[key]}
                onChange={(e) => setInputs((prev) => ({ ...prev, [key]: e.target.value }))}
                className="bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          ))}

          <Button
            onClick={calculateRetirement}
            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-green-400 text-white py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition-transform hover:scale-[1.02]"
          >
            Calculate Retirement Needs
          </Button>
        </div>

        <Card className="bg-white border border-gray-200 shadow-lg rounded-xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-gray-800 font-bold">Retirement Planning</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Years to Retirement:</span>
              <span>{results.yearsToRetirement}</span>
            </div>
            <div className="flex justify-between">
              <span>Monthly Expenses at Retirement:</span>
              <span>₹{results.futureMonthlyExpenses.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Retirement Years:</span>
              <span>{results.retirementYears}</span>
            </div>
            <div className="flex justify-between">
              <span>Real Return (Post-Inflation):</span>
              <span>{results.inflationAdjustedReturn}%</span>
            </div>
            <div className="border-t border-gray-200 pt-3 space-y-2">
              <div className="flex justify-between font-bold text-lg text-gray-800">
                <span>Corpus Required:</span>
                <span className="text-green-600">₹{results.corpusRequired.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-gray-800">
                <span>Monthly SIP Needed:</span>
                <span className="text-blue-600">₹{results.monthlySIPNeeded.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}