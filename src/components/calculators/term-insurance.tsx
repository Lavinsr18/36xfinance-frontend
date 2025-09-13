// import { useState } from "react";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { Label } from "../../components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

// export default function TermInsuranceCalculator() {
//   const [inputs, setInputs] = useState({
//     currentAge: "",
//     annualIncome: "",
//     currentExpenses: "",
//     outstandingLoans: "",
//     dependents: "",
//   });

//   const [results, setResults] = useState({
//     incomeReplacement: 0,
//     loanCoverage: 0,
//     emergencyFund: 0,
//     totalCoverage: 0,
//   });

//   const calculateCoverage = () => {
//     const currentAge = parseFloat(inputs.currentAge) || 0;
//     const annualIncome = parseFloat(inputs.annualIncome) || 0;
//     const currentExpenses = parseFloat(inputs.currentExpenses) || 0;
//     const outstandingLoans = parseFloat(inputs.outstandingLoans) || 0;
//     const dependents = parseFloat(inputs.dependents) || 0;

//     // Income replacement calculation (12 months expenses)
//     const incomeReplacement = currentExpenses * 12;

//     // Emergency fund (6 months expenses)
//     const emergencyFund = currentExpenses * 0.5;

//     // Total coverage
//     const totalCoverage = incomeReplacement + outstandingLoans + emergencyFund;

//     setResults({
//       incomeReplacement,
//       loanCoverage: outstandingLoans,
//       emergencyFund,
//       totalCoverage,
//     });

//     // Analytics log
//     fetch("/api/calculator-usage", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         calculatorType: "term-insurance",
//         inputData: inputs,
//         resultData: {
//           incomeReplacement,
//           loanCoverage: outstandingLoans,
//           emergencyFund,
//           totalCoverage,
//         },
//       }),
//     }).catch(console.error);
//   };

//   return (
//     <div>
//       <h3
//         className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent"
//         data-testid="text-calculator-title"
//       >
//         Term Insurance Sufficiency Calculator
//       </h3>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Input Form */}
//         <div className="space-y-4">
//           <div>
//             <Label htmlFor="current-age" className="text-gray-700 font-medium">
//               Current Age
//             </Label>
//             <Input
//               id="current-age"
//               type="number"
//               placeholder="30"
//               value={inputs.currentAge}
//               onChange={(e) =>
//                 setInputs({ ...inputs, currentAge: e.target.value })
//               }
//               className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-full"
//               data-testid="input-current-age"
//             />
//           </div>

//           <div>
//             <Label htmlFor="annual-income" className="text-gray-700 font-medium">
//               Annual Income (₹)
//             </Label>
//             <Input
//               id="annual-income"
//               type="number"
//               placeholder="1000000"
//               value={inputs.annualIncome}
//               onChange={(e) =>
//                 setInputs({ ...inputs, annualIncome: e.target.value })
//               }
//               className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-full"
//               data-testid="input-annual-income"
//             />
//           </div>

//           <div>
//             <Label
//               htmlFor="current-expenses"
//               className="text-gray-700 font-medium"
//             >
//               Current Expenses (₹)
//             </Label>
//             <Input
//               id="current-expenses"
//               type="number"
//               placeholder="600000"
//               value={inputs.currentExpenses}
//               onChange={(e) =>
//                 setInputs({ ...inputs, currentExpenses: e.target.value })
//               }
//               className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-full"
//               data-testid="input-current-expenses"
//             />
//           </div>

//           <div>
//             <Label
//               htmlFor="outstanding-loans"
//               className="text-gray-700 font-medium"
//             >
//               Outstanding Loans (₹)
//             </Label>
//             <Input
//               id="outstanding-loans"
//               type="number"
//               placeholder="2000000"
//               value={inputs.outstandingLoans}
//               onChange={(e) =>
//                 setInputs({ ...inputs, outstandingLoans: e.target.value })
//               }
//               className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-full"
//               data-testid="input-outstanding-loans"
//             />
//           </div>

//           <div>
//             <Label htmlFor="dependents" className="text-gray-700 font-medium">
//               Number of Dependents
//             </Label>
//             <Input
//               id="dependents"
//               type="number"
//               placeholder="3"
//               value={inputs.dependents}
//               onChange={(e) =>
//                 setInputs({ ...inputs, dependents: e.target.value })
//               }
//               className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-full"
//               data-testid="input-dependents"
//             />
//           </div>

//           <Button
//             onClick={calculateCoverage}
//             className="w-full mt-4 bg-gradient-to-r from-blue-500 to-green-400 hover:opacity-90 text-white py-3 rounded-xl font-semibold shadow-lg transition-transform hover:scale-[1.02]"
//             data-testid="button-calculate"
//           >
//             Calculate Coverage Needed
//           </Button>
//         </div>

//         {/* Results Card */}
//         <Card className="bg-white border border-gray-200 shadow-lg rounded-xl backdrop-blur-sm">
//           <CardHeader>
//             <CardTitle className="text-gray-800 font-bold">
//               Coverage Recommendation
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-3 text-gray-700">
//             <div className="flex justify-between">
//               <span>Income Replacement:</span>
//               <span data-testid="result-income-replacement">
//                 ₹{results.incomeReplacement.toLocaleString()}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span>Loan Coverage:</span>
//               <span data-testid="result-loan-coverage">
//                 ₹{results.loanCoverage.toLocaleString()}
//               </span>
//             </div>
//             <div className="flex justify-between">
//               <span>Emergency Fund:</span>
//               <span data-testid="result-emergency-fund">
//                 ₹{results.emergencyFund.toLocaleString()}
//               </span>
//             </div>
//             <div className="border-t border-gray-200 pt-3">
//               <div className="flex justify-between font-bold text-lg">
//                 <span>Total Coverage Needed:</span>
//                 <span
//                   className="text-green-600"
//                   data-testid="result-total-coverage"
//                 >
//                   ₹{results.totalCoverage.toLocaleString()}
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

function formatINR(num: number) {
  if (!isFinite(num)) return "-";
  return "₹" + Math.round(num).toLocaleString("en-IN");
}

type Child = {
  id: number;
  age: number | "";
  basicOn: boolean;
  basicAmt: number; // default calculated from expenses
  higherOn: boolean;
  higherAmt: number; // user input lumpsum
  marriageOn: boolean;
  marriageAmt: number; // user input lumpsum
};

export default function HybridTermInsuranceCalculator() {
  const [inputs, setInputs] = useState({
    currentAge: "",
    annualIncome: "",
    annualExpenses: "",
    monthlyExpenses: "",
    outstandingLoans: "",
    existingAssets: "",
    incomeMultiplier: 12, // 10-15 typical
    withdrawalRate: 0.04, // 4% default
    emergencyMonths: 6,
  });

  const [children, setChildren] = useState<Child[]>([]);

  // results
  const [results, setResults] = useState({
    coverIncome: 0,
    coverCapital: 0,
    baseCover: 0,
    childrenNeeds: 0,
    emergencyFund: 0,
    totalCover: 0,
  });

  const addChild = () => {
    setChildren((c) => [
      ...c,
      {
        id: Date.now(),
        age: "",
        basicOn: false,
        basicAmt: 0,
        higherOn: false,
        higherAmt: 3000000, // default ₹30L
        marriageOn: false,
        marriageAmt: 3000000, // default ₹30L
      },
    ]);
  };

  const removeChild = (id: number) => {
    setChildren((c) => c.filter((ch) => ch.id !== id));
  };

  const updateChild = (id: number, patch: Partial<Child>) => {
    setChildren((c) => c.map((ch) => (ch.id === id ? { ...ch, ...patch } : ch)));
  };

  const calculate = () => {
    const annualIncome = parseFloat(inputs.annualIncome) || 0;
    const annualExpenses = parseFloat(inputs.annualExpenses) || 0;
    const monthlyExpenses = parseFloat(inputs.monthlyExpenses) || (annualExpenses / 12) || 0;
    const outstandingLoans = parseFloat(inputs.outstandingLoans) || 0;
    const existingAssets = parseFloat(inputs.existingAssets) || 0;
    const incomeMultiplier = Number(inputs.incomeMultiplier) || 12;
    const withdrawalRate = Number(inputs.withdrawalRate) || 0.04;
    const emergencyMonths = Number(inputs.emergencyMonths) || 6;

    // 1. Income Replacement
    const coverIncome = annualIncome * incomeMultiplier;

    // 2. Capital Retention
    const coverCapital = withdrawalRate > 0 ? (annualExpenses / withdrawalRate) : coverIncome;

    const baseCover = Math.max(coverIncome, coverCapital);

    // 3. Children needs (user-defined when toggles on)
    let childrenNeeds = 0;
    children.forEach((ch) => {
      const age = typeof ch.age === "number" ? ch.age : NaN;
      // Default basic education suggestion = 10% of annual expenses * years left till 21
      let defaultBasic = 0;
      if (!isNaN(age)) {
        const yearsLeft = Math.max(21 - age, 0);
        defaultBasic = 0.1 * annualExpenses * yearsLeft;
      }
      const basicAmt = ch.basicOn ? (ch.basicAmt || defaultBasic) : 0;
      const higherAmt = ch.higherOn ? (ch.higherAmt || 0) : 0;
      const marriageAmt = ch.marriageOn ? (ch.marriageAmt || 0) : 0;
      childrenNeeds += basicAmt + higherAmt + marriageAmt;
    });

    // 4. Emergency fund
    const emergencyFund = (monthlyExpenses) * emergencyMonths;

    // 5. Final total
    const totalCover = Math.max(0, baseCover + childrenNeeds + outstandingLoans + emergencyFund - existingAssets);

    setResults({
      coverIncome,
      coverCapital,
      baseCover,
      childrenNeeds,
      emergencyFund,
      totalCover,
    });

    // send analytics (best-effort)
    fetch("/api/calculator-usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calculator: "hybrid-term-insurance",
        inputs,
        children,
        results: { coverIncome, coverCapital, baseCover, childrenNeeds, emergencyFund, totalCover },
      }),
    }).catch(() => {});
  };

  return (
    <div className="bg-white min-h-screen p-8 rounded-lg shadow-lg">
      <h3 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400">
        Hybrid Term Insurance Sufficiency Calculator
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT: Inputs */}
        <div className="space-y-4">
          <Card className="bg-white border border-gray-200 shadow-lg rounded-xl backdrop-blur-sm p-4">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-gray-800 text-lg">Your Financial Details</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <div>
                <Label htmlFor="annual-income" className="text-gray-700">Annual Income (₹)</Label>
                <Input id="annual-income" type="number" value={inputs.annualIncome}
                  onChange={(e) => setInputs({ ...inputs, annualIncome: e.target.value })}
                  placeholder="2500000"
                  className="bg-gray-50 border-gray-300 placeholder-gray-400 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 rounded-lg"
                />
              </div>

              <div>
                <Label htmlFor="annual-expenses" className="text-gray-700">Annual Household Expenses (₹)</Label>
                <Input id="annual-expenses" type="number" value={inputs.annualExpenses}
                  onChange={(e) => setInputs({ ...inputs, annualExpenses: e.target.value })}
                  placeholder="1200000"
                  className="bg-gray-50 border-gray-300 placeholder-gray-400 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 rounded-lg"
                />
              </div>

              <div>
                <Label htmlFor="monthly-expenses" className="text-gray-700">Monthly Expenses (optional, auto from annual) (₹)</Label>
                <Input id="monthly-expenses" type="number" value={inputs.monthlyExpenses}
                  onChange={(e) => setInputs({ ...inputs, monthlyExpenses: e.target.value })}
                  placeholder="100000"
                  className="bg-gray-50 border-gray-300 placeholder-gray-400 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="outstanding-loans" className="text-gray-700">Outstanding Loans (₹)</Label>
                  <Input id="outstanding-loans" type="number" value={inputs.outstandingLoans}
                    onChange={(e) => setInputs({ ...inputs, outstandingLoans: e.target.value })}
                    placeholder="5000000"
                    className="bg-gray-50 border-gray-300 placeholder-gray-400 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="existing-assets" className="text-gray-700">Existing Assets / Insurance (₹)</Label>
                  <Input id="existing-assets" type="number" value={inputs.existingAssets}
                    onChange={(e) => setInputs({ ...inputs, existingAssets: e.target.value })}
                    placeholder="10000000"
                    className="bg-gray-50 border-gray-300 placeholder-gray-400 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="income-mult" className="text-gray-700">Income Multiplier (10-15)</Label>
                  <Input id="income-mult" type="number" value={String(inputs.incomeMultiplier)}
                    onChange={(e) => setInputs({ ...inputs, incomeMultiplier: Number(e.target.value) })}
                    className="bg-gray-50 border-gray-300 placeholder-gray-400 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="withdrawal-rate" className="text-gray-700">Withdrawal Rate (decimal)</Label>
                  <Input id="withdrawal-rate" type="number" step="0.01" value={String(inputs.withdrawalRate)}
                    onChange={(e) => setInputs({ ...inputs, withdrawalRate: Number(e.target.value) })}
                    className="bg-gray-50 border-gray-300 placeholder-gray-400 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="emergency-months" className="text-gray-700">Emergency Fund (months)</Label>
                  <Input id="emergency-months" type="number" value={String(inputs.emergencyMonths)}
                    onChange={(e) => setInputs({ ...inputs, emergencyMonths: Number(e.target.value) })}
                    className="bg-gray-50 border-gray-300 placeholder-gray-400 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 rounded-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          

          {/* Children section */}
          <Card className="bg-white border border-gray-200 shadow-lg rounded-xl backdrop-blur-sm p-4">
            <div className="pt-4">
              <div className="flex items-center justify-between">
                <Label className="font-semibold text-gray-800">Children</Label>
                <div className="space-x-2">
                  <Button onClick={addChild} className="bg-gradient-to-r from-blue-500 to-green-400 text-white hover:opacity-90 transition-all hover:scale-[1.02]">
                    Add Child
                  </Button>
                </div>
              </div>

              <div className="space-y-3 mt-3">
                {children.length === 0 && <div className="text-sm text-gray-500">No children added</div>}

                {children.map((ch) => (
                  <Card key={ch.id} className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <CardHeader className="p-0 mb-2 flex flex-row items-center justify-between">
                      <CardTitle className="text-gray-800 text-sm">Child</CardTitle>
                      <Button variant="ghost" className="text-red-500 hover:bg-red-100" onClick={() => removeChild(ch.id)}>
                        Remove
                      </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div>
                        <Label className="text-gray-700">Age</Label>
                        <Input type="number" value={String(ch.age)} onChange={(e) => updateChild(ch.id, { age: e.target.value === "" ? "" : Number(e.target.value) })}
                          className="bg-gray-100 border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                        />
                      </div>

                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" checked={ch.basicOn} onChange={(e) => updateChild(ch.id, { basicOn: e.target.checked })}
                            className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                          />
                          <Label className="mb-0 text-gray-700">Basic Education (10% of expenses × years left) or custom</Label>
                        </div>
                        {ch.basicOn && (
                          <Input type="number" value={String(ch.basicAmt || "")} onChange={(e) => updateChild(ch.id, { basicAmt: Number(e.target.value) })}
                            placeholder={formatINR(0.1 * (parseFloat(inputs.annualExpenses) || 0) * (Math.max(21 - (Number(ch.age) || 0), 0)))}
                            className="bg-gray-100 border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                          />
                        )}

                        <div className="flex items-center gap-2 mt-2">
                          <input type="checkbox" checked={ch.higherOn} onChange={(e) => updateChild(ch.id, { higherOn: e.target.checked })}
                             className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                          />
                          <Label className="mb-0 text-gray-700">Higher Education (lump sum)</Label>
                        </div>
                        {ch.higherOn && (
                          <Input type="number" value={String(ch.higherAmt || "")}
                            onChange={(e) => updateChild(ch.id, { higherAmt: Number(e.target.value) })} placeholder="e.g. 3000000"
                            className="bg-gray-100 border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                          />
                        )}

                        <div className="flex items-center gap-2 mt-2">
                          <input type="checkbox" checked={ch.marriageOn} onChange={(e) => updateChild(ch.id, { marriageOn: e.target.checked })}
                             className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                          />
                          <Label className="mb-0 text-gray-700">Marriage (lump sum)</Label>
                        </div>
                        {ch.marriageOn && (
                          <Input type="number" value={String(ch.marriageAmt || "")}
                            onChange={(e) => updateChild(ch.id, { marriageAmt: Number(e.target.value) })} placeholder="e.g. 3000000"
                            className="bg-gray-100 border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                          />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
          <Button onClick={calculate} className="w-full bg-gradient-to-r from-blue-500 to-green-400 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all hover:scale-[1.02]">
            Calculate Coverage Needed
          </Button>
        </div>
        
        {/* RIGHT: Results */}
        <Card className="bg-white rounded-xl border border-gray-200 shadow-lg backdrop-blur-sm p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-gray-800 text-xl font-bold">Coverage Recommendation</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Income Replacement Cover</span>
                <strong className="text-gray-800">{formatINR(results.coverIncome)}</strong>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Capital Retention Cover</span>
                <strong className="text-gray-800">{formatINR(results.coverCapital)}</strong>
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between font-bold text-gray-800">
                  <span>Base Cover (higher of above)</span>
                  <strong>{formatINR(results.baseCover)}</strong>
                </div>
              </div>

              <div className="border-t pt-3 space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Children's Needs (sum of toggles)</span>
                  <strong className="text-gray-800">{formatINR(results.childrenNeeds)}</strong>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Outstanding Loans</span>
                  <strong className="text-gray-800">{formatINR(parseFloat(inputs.outstandingLoans || "0"))}</strong>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Emergency Fund</span>
                  <strong className="text-gray-800">{formatINR(results.emergencyFund)}</strong>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-gray-800">Total Cover Required</span>
                  <span className="text-green-600">{formatINR(results.totalCover)}</span>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Existing assets / insurance will be deducted from the required cover in the calculation.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}