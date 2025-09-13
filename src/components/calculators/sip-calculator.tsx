// import { useState } from "react";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { Label } from "../../components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

// export default function SIPCalculator() {
//   const [inputs, setInputs] = useState({
//     sipAmount: "",
//     investmentPeriod: "",
//     expectedReturn: "",
//     stepUp: "",
//     inflationRate: "",
//   });

//   const [results, setResults] = useState({
//     totalInvestment: 0,
//     finalValue: 0,
//     totalReturns: 0,
//     realValue: 0,
//     returnsPercentage: 0,
//   });

//   const calculateSIP = () => {
//     const sipAmount = parseFloat(inputs.sipAmount) || 0;
//     const period = parseFloat(inputs.investmentPeriod) || 0;
//     const expectedReturn = parseFloat(inputs.expectedReturn) || 0;
//     const stepUp = parseFloat(inputs.stepUp) || 0;
//     const inflationRate = parseFloat(inputs.inflationRate) || 0;

//     let totalInvestment = 0;
//     let finalValue = 0;
//     let currentSIP = sipAmount;

//     // Calculate step-up SIP
//     for (let year = 1; year <= period; year++) {
//       const monthlyReturn = expectedReturn / 100 / 12;
//       const months = 12;
      
//       // SIP calculation for current year
//       const yearEndValue = currentSIP * (((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn) * (1 + monthlyReturn));
      
//       // Compound previous years' investments
//       finalValue = (finalValue * Math.pow(1 + expectedReturn / 100, 1)) + yearEndValue;
      
//       totalInvestment += currentSIP * 12;
      
//       // Step up for next year
//       currentSIP = currentSIP * (1 + stepUp / 100);
//     }

//     const totalReturns = finalValue - totalInvestment;
//     const realValue = finalValue / Math.pow(1 + inflationRate / 100, period);
//     const returnsPercentage = ((finalValue - totalInvestment) / totalInvestment) * 100;

//     setResults({
//       totalInvestment,
//       finalValue,
//       totalReturns,
//       realValue,
//       returnsPercentage,
//     });

//     // Log usage analytics
//     fetch("/api/calculator-usage", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         calculatorType: "sip-calculator",
//         inputData: inputs,
//         resultData: { totalInvestment, finalValue, totalReturns, realValue, returnsPercentage },
//       }),
//     }).catch(console.error);
//   };

//   return (
//     <div>
//       <h3 className="text-2xl font-bold mb-6 text-white" data-testid="text-calculator-title">
//         Step Up Annuities & SIP Calculator
//       </h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="space-y-4">
//           <div>
//             <Label htmlFor="sip-amount" className="text-white">Monthly SIP Amount (₹)</Label>
//             <Input
//               id="sip-amount"
//               type="number"
//               placeholder="10000"
//               value={inputs.sipAmount}
//               onChange={(e) => setInputs({ ...inputs, sipAmount: e.target.value })}
//               className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
//               data-testid="input-sip-amount"
//             />
//           </div>
          
//           <div>
//             <Label htmlFor="investment-period" className="text-white">Investment Period (Years)</Label>
//             <Input
//               id="investment-period"
//               type="number"
//               placeholder="15"
//               value={inputs.investmentPeriod}
//               onChange={(e) => setInputs({ ...inputs, investmentPeriod: e.target.value })}
//               className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
//               data-testid="input-investment-period"
//             />
//           </div>
          
//           <div>
//             <Label htmlFor="expected-return" className="text-white">Expected Annual Return (%)</Label>
//             <Input
//               id="expected-return"
//               type="number"
//               step="0.1"
//               placeholder="12"
//               value={inputs.expectedReturn}
//               onChange={(e) => setInputs({ ...inputs, expectedReturn: e.target.value })}
//               className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
//               data-testid="input-expected-return"
//             />
//           </div>
          
//           <div>
//             <Label htmlFor="step-up" className="text-white">Annual Step Up (%)</Label>
//             <Input
//               id="step-up"
//               type="number"
//               step="0.1"
//               placeholder="10"
//               value={inputs.stepUp}
//               onChange={(e) => setInputs({ ...inputs, stepUp: e.target.value })}
//               className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
//               data-testid="input-step-up"
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
          
//           <Button 
//             onClick={calculateSIP}
//             className="w-full bg-finance-blue hover:bg-blue-600 text-white py-3 rounded-lg font-semibold"
//             data-testid="button-calculate"
//           >
//             Calculate SIP Returns
//           </Button>
//         </div>
        
//         <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
//           <CardHeader>
//             <CardTitle className="text-white">SIP Projection</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-3">
//             <div className="flex justify-between text-white">
//               <span>Total Investment:</span>
//               <span data-testid="result-total-investment">₹{Math.round(results.totalInvestment).toLocaleString()}</span>
//             </div>
//             <div className="flex justify-between text-white">
//               <span>Final Value:</span>
//               <span data-testid="result-final-value">₹{Math.round(results.finalValue).toLocaleString()}</span>
//             </div>
//             <div className="flex justify-between text-white">
//               <span>Total Returns:</span>
//               <span data-testid="result-total-returns">₹{Math.round(results.totalReturns).toLocaleString()}</span>
//             </div>
//             <div className="flex justify-between text-white">
//               <span>Real Value (Post-Inflation):</span>
//               <span data-testid="result-real-value">₹{Math.round(results.realValue).toLocaleString()}</span>
//             </div>
//             <div className="border-t border-white border-opacity-20 pt-3">
//               <div className="flex justify-between font-bold text-lg text-white">
//                 <span>Returns (%):</span>
//                 <span className="text-green-400" data-testid="result-returns-percentage">
//                   {results.returnsPercentage.toFixed(1)}%
//                 </span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

type Results = {
  totalInvestment: number;
  futureValue: number;
  totalReturns: number;
  returnsPercentage: number;
  realValue: number;
  yearlyBreakdown: {
    year: number;
    contributionThisYear: number;
    valueAtYearEnd: number;
  }[];
};

// Format numbers into ₹, Lakhs, Crores
const formatIndianValue = (value: number): string => {
  if (!isFinite(value)) return "₹0";
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  if (abs >= 1e7) {
    return `${sign}₹${(abs / 1e7).toFixed(2)} Cr`;
  } else if (abs >= 1e5) {
    return `${sign}₹${(abs / 1e5).toFixed(2)} L`;
  } else {
    return `${sign}₹${Math.round(abs).toLocaleString("en-IN")}`;
  }
};

const StepUpSIPCalculator = (): JSX.Element => {
  const [inputs, setInputs] = useState({
    monthlyInvestment: "10000",
    stepUpPercent: "10",
    annualReturn: "10",
    years: "10",
    inflationRate: "0",
  });

  const [depositTiming, setDepositTiming] = useState<"start" | "end">("start");
  const [stepUpTiming, setStepUpTiming] = useState<"year-end" | "year-start">(
    "year-start"
  );
  const [results, setResults] = useState<Results | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const parsePositive = (v: string): number => {
    const n = parseFloat(v);
    return isFinite(n) && n >= 0 ? n : 0;
  };

  // 🔑 Main Calculation (runs on Calculate button click)
  const calculate = () => {
    let monthlyInvestment = parsePositive(inputs.monthlyInvestment);
    const stepUpPercent = parsePositive(inputs.stepUpPercent) / 100;
    const annualReturn = parsePositive(inputs.annualReturn) / 100;
    const years = Math.max(0, Math.floor(parsePositive(inputs.years)));
    const inflation = parsePositive(inputs.inflationRate) / 100;

    if (monthlyInvestment <= 0 || years <= 0) {
      setResults(null);
      return;
    }

    const months = years * 12;
    const monthlyRate = Math.pow(1 + annualReturn, 1 / 12) - 1;

    let totalInvestment = 0;
    let finalValue = 0;
    let currentMonthly = monthlyInvestment;
    let contributionThisYear = 0;
    const yearlyBreakdown: Results["yearlyBreakdown"] = [];

    for (let m = 0; m < months; m++) {
      const monthIndexInYear = m % 12;

      // Step-up at year start
      if (stepUpTiming === "year-start" && monthIndexInYear === 0 && m > 0) {
        currentMonthly *= 1 + stepUpPercent;
      }

      // Deposit timing handling
      if (depositTiming === "start") {
        finalValue = (finalValue + currentMonthly) * (1 + monthlyRate);
      } else {
        finalValue = finalValue * (1 + monthlyRate) + currentMonthly;
      }

      totalInvestment += currentMonthly;
      contributionThisYear += currentMonthly;

      // At year end
      if (monthIndexInYear === 11) {
        const yearNumber = (m + 1) / 12;
        yearlyBreakdown.push({
          year: yearNumber,
          contributionThisYear: Math.round(contributionThisYear),
          valueAtYearEnd: finalValue,
        });
        contributionThisYear = 0;

        // Step-up at year end
        if (stepUpTiming === "year-end") {
          currentMonthly *= 1 + stepUpPercent;
        }
      }
    }

    const totalReturns = finalValue - totalInvestment;
    const returnsPercentage =
      totalInvestment > 0 ? (totalReturns / totalInvestment) * 100 : 0;
    const realValue =
      inflation > 0 ? finalValue / Math.pow(1 + inflation, years) : finalValue;

    setResults({
      totalInvestment,
      futureValue: finalValue,
      totalReturns,
      returnsPercentage,
      realValue,
      yearlyBreakdown,
    });
  };

  return (
    <Card className="max-w-5xl mx-auto mt-6 border border-gray-200 shadow-lg rounded-xl bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
          Step-Up SIP Calculator
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Inputs */}
        <div className="space-y-4">
          <div>
            <Label className="text-gray-700">Monthly Investment (₹)</Label>
            <Input
              name="monthlyInvestment"
              value={inputs.monthlyInvestment}
              onChange={handleChange}
              type="number"
              className="text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <Label className="text-gray-700">Annual Step-Up (%)</Label>
            <Input
              name="stepUpPercent"
              value={inputs.stepUpPercent}
              onChange={handleChange}
              type="number"
              className="text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <Label className="text-gray-700">Expected Annual Return (%)</Label>
            <Input
              name="annualReturn"
              value={inputs.annualReturn}
              onChange={handleChange}
              type="number"
              className="text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <Label className="text-gray-700">Duration (Years)</Label>
            <Input
              name="years"
              value={inputs.years}
              onChange={handleChange}
              type="number"
              className="text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <Label className="text-gray-700">Inflation Rate (%)</Label>
            <Input
              name="inflationRate"
              value={inputs.inflationRate}
              onChange={handleChange}
              type="number"
              className="text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <Label className="text-gray-700">Deposit Timing</Label>
            <select
              value={depositTiming}
              onChange={(e) =>
                setDepositTiming(e.target.value as "start" | "end")
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-400"
            >
              <option value="start">Start of month (annuity-due)</option>
              <option value="end">End of month (ordinary annuity)</option>
            </select>
          </div>
          <div>
            <Label className="text-gray-700">Step-Up Timing</Label>
            <select
              value={stepUpTiming}
              onChange={(e) =>
                setStepUpTiming(e.target.value as "year-end" | "year-start")
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-400"
            >
              <option value="year-start">At start of year</option>
              <option value="year-end">At year end</option>
            </select>
          </div>

          <div className="flex gap-3 mt-4">
            <Button
              onClick={calculate}
              className="w-full bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold rounded-lg hover:opacity-90 hover:scale-[1.02] transition-transform"
            >
              Calculate
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setInputs({
                  monthlyInvestment: "10000",
                  stepUpPercent: "10",
                  annualReturn: "10",
                  years: "10",
                  inflationRate: "0",
                });
                setResults(null);
              }}
              className="w-full text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Right: Results */}
        {results && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white rounded-xl shadow-md border border-gray-200">
              <div>
                <div className="text-sm text-gray-700">Total Investment</div>
                <div className="text-lg font-semibold text-green-600">
                  {formatIndianValue(results.totalInvestment)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-700">Future Value</div>
                <div className="text-lg font-semibold text-green-600">
                  {formatIndianValue(results.futureValue)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-700">Wealth Gain</div>
                <div className="text-lg font-semibold text-green-600">
                  {formatIndianValue(results.totalReturns)}
                </div>
                <div className="text-sm text-green-600">
                  {results.returnsPercentage.toFixed(2)}%
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-700">
                  Real Value (Post-Inflation)
                </div>
                <div className="text-lg font-semibold text-green-600">
                  {formatIndianValue(results.realValue)}
                </div>
              </div>
            </div>

            {/* Yearly Breakdown */}
            <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200">
              <div className="font-medium mb-2 text-gray-900">
                Year-wise Breakdown
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-sm text-gray-700">
                      <th className="py-2">Year</th>
                      <th className="py-2">Contribution</th>
                      <th className="py-2">Value at Year End</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.yearlyBreakdown.map((y) => (
                      <tr key={y.year} className="border-t border-gray-300">
                        <td className="py-2 text-gray-900">{y.year}</td>
                        <td className="py-2 text-gray-900">
                          {formatIndianValue(y.contributionThisYear)}
                        </td>
                        <td className="py-2 text-gray-900">
                          {formatIndianValue(y.valueAtYearEnd)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StepUpSIPCalculator;
