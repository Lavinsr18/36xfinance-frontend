// import { useState } from "react";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { Label } from "../../components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

// export default function BondsCalculator() {
//   const [inputs, setInputs] = useState({
//     faceValue: "",
//     couponRate: "",
//     bondMaturity: "",
//     numberOfBonds: "",
//     currentPrice: "",
//     paymentFrequency: "annual",
//   });

//   const [results, setResults] = useState({
//     annualInterest: 0,
//     totalBondInterest: 0,
//     maturityValue: 0,
//     totalInvestment: 0,
//     totalReturns: 0,
//     yieldToMaturity: 0,
//     currentYield: 0,
//   });

//   const calculateBonds = () => {
//     const faceValue = parseFloat(inputs.faceValue) || 0;
//     const couponRate = parseFloat(inputs.couponRate) || 0;
//     const maturity = parseFloat(inputs.bondMaturity) || 0;
//     const numberOfBonds = parseFloat(inputs.numberOfBonds) || 0;
//     const currentPrice = parseFloat(inputs.currentPrice) || faceValue;
//     const frequency = inputs.paymentFrequency === "semi-annual" ? 2 : 1;

//     if (faceValue <= 0 || maturity <= 0 || numberOfBonds <= 0) {
//       return;
//     }

//     // Calculate bond returns
//     const annualCouponPerBond = (faceValue * couponRate / 100);
//     const annualInterest = annualCouponPerBond * numberOfBonds;
//     const totalBondInterest = annualInterest * maturity;
//     const maturityValue = faceValue * numberOfBonds;
//     const totalInvestment = currentPrice * numberOfBonds;
//     const totalReturns = totalBondInterest + maturityValue - totalInvestment;

//     // Calculate yields
//     const currentYield = (annualCouponPerBond / currentPrice) * 100;
    
//     // Simplified YTM calculation (approximation)
//     const annualReturn = (maturityValue + totalBondInterest - totalInvestment) / maturity;
//     const yieldToMaturity = (annualReturn / totalInvestment) * 100;

//     setResults({
//       annualInterest,
//       totalBondInterest,
//       maturityValue,
//       totalInvestment,
//       totalReturns,
//       yieldToMaturity,
//       currentYield,
//     });

//     // Log usage analytics
//     fetch("/api/calculator-usage", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         calculatorType: "bonds-calculator",
//         inputData: inputs,
//         resultData: { annualInterest, totalBondInterest, maturityValue, yieldToMaturity, currentYield },
//       }),
//     }).catch(console.error);
//   };

//   return (
//     <div>
//       <h3 className="text-2xl font-bold mb-6 text-white" data-testid="text-calculator-title">
//         Bonds Interest Payout Calculator
//       </h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="space-y-4">
//           <div>
//             <Label htmlFor="face-value" className="text-white">Face Value (₹)</Label>
//             <Input
//               id="face-value"
//               type="number"
//               placeholder="1000"
//               value={inputs.faceValue}
//               onChange={(e) => setInputs({ ...inputs, faceValue: e.target.value })}
//               className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
//               data-testid="input-face-value"
//             />
//           </div>
          
//           <div>
//             <Label htmlFor="coupon-rate" className="text-white">Coupon Rate (%)</Label>
//             <Input
//               id="coupon-rate"
//               type="number"
//               step="0.1"
//               placeholder="7.5"
//               value={inputs.couponRate}
//               onChange={(e) => setInputs({ ...inputs, couponRate: e.target.value })}
//               className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
//               data-testid="input-coupon-rate"
//             />
//           </div>
          
//           <div>
//             <Label htmlFor="bond-maturity" className="text-white">Maturity (Years)</Label>
//             <Input
//               id="bond-maturity"
//               type="number"
//               placeholder="10"
//               value={inputs.bondMaturity}
//               onChange={(e) => setInputs({ ...inputs, bondMaturity: e.target.value })}
//               className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
//               data-testid="input-bond-maturity"
//             />
//           </div>
          
//           <div>
//             <Label htmlFor="number-of-bonds" className="text-white">Number of Bonds</Label>
//             <Input
//               id="number-of-bonds"
//               type="number"
//               placeholder="10"
//               value={inputs.numberOfBonds}
//               onChange={(e) => setInputs({ ...inputs, numberOfBonds: e.target.value })}
//               className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
//               data-testid="input-number-of-bonds"
//             />
//           </div>
          
//           <div>
//             <Label htmlFor="current-price" className="text-white">Current Market Price (₹)</Label>
//             <Input
//               id="current-price"
//               type="number"
//               placeholder="1000"
//               value={inputs.currentPrice}
//               onChange={(e) => setInputs({ ...inputs, currentPrice: e.target.value })}
//               className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
//               data-testid="input-current-price"
//             />
//           </div>
          
//           <div>
//             <Label htmlFor="payment-frequency" className="text-white">Payment Frequency</Label>
//             <Select
//               value={inputs.paymentFrequency}
//               onValueChange={(value) => setInputs({ ...inputs, paymentFrequency: value })}
//             >
//               <SelectTrigger className="bg-white bg-opacity-10 border-white border-opacity-20 text-white" data-testid="select-payment-frequency">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="annual">Annual</SelectItem>
//                 <SelectItem value="semi-annual">Semi-Annual</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
          
//           <Button 
//             onClick={calculateBonds}
//             className="w-full bg-finance-blue hover:bg-blue-600 text-white py-3 rounded-lg font-semibold"
//             data-testid="button-calculate"
//           >
//             Calculate Bond Returns
//           </Button>
//         </div>
        
//         <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
//           <CardHeader>
//             <CardTitle className="text-white">Bond Investment Analysis</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-3">
//             <div className="flex justify-between text-white">
//               <span>Annual Interest:</span>
//               <span className="text-green-400" data-testid="result-annual-interest">
//                 ₹{results.annualInterest.toLocaleString()}
//               </span>
//             </div>
//             <div className="flex justify-between text-white">
//               <span>Total Interest Over Term:</span>
//               <span data-testid="result-total-bond-interest">₹{results.totalBondInterest.toLocaleString()}</span>
//             </div>
//             <div className="flex justify-between text-white">
//               <span>Maturity Value:</span>
//               <span data-testid="result-maturity-value">₹{results.maturityValue.toLocaleString()}</span>
//             </div>
//             <div className="flex justify-between text-white">
//               <span>Total Investment:</span>
//               <span data-testid="result-total-investment">₹{results.totalInvestment.toLocaleString()}</span>
//             </div>
//             <div className="flex justify-between text-white">
//               <span>Total Returns:</span>
//               <span data-testid="result-total-returns">₹{results.totalReturns.toLocaleString()}</span>
//             </div>
//             <div className="border-t border-white border-opacity-20 pt-3 space-y-2">
//               <div className="flex justify-between font-bold text-white">
//                 <span>Current Yield:</span>
//                 <span className="text-green-400" data-testid="result-current-yield">
//                   {results.currentYield.toFixed(2)}%
//                 </span>
//               </div>
//               <div className="flex justify-between font-bold text-white">
//                 <span>Yield to Maturity:</span>
//                 <span className="text-green-400" data-testid="result-yield-to-maturity">
//                   {results.yieldToMaturity.toFixed(2)}%
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

export default function BondsCalculator() {
  const [inputs, setInputs] = useState({
    faceValue: "",
    couponRate: "",
    bondMaturity: "",
    numberOfBonds: "",
    currentPrice: "",
    paymentFrequency: "annual",
  });

  const [results, setResults] = useState({
    interestPerPeriod: 0,
    annualInterest: 0,
    totalBondInterest: 0,
    maturityValue: 0,
    totalInvestment: 0,
    totalReturns: 0,
    yieldToMaturity: 0,
    currentYield: 0,
  });

  const calculateBonds = () => {
    const faceValue = parseFloat(inputs.faceValue) || 0;
    const couponRate = parseFloat(inputs.couponRate) || 0;
    const maturity = parseFloat(inputs.bondMaturity) || 0;
    const numberOfBonds = parseFloat(inputs.numberOfBonds) || 0;
    const currentPrice = parseFloat(inputs.currentPrice) || faceValue;

    let frequencyMultiplier = 1;
    if (inputs.paymentFrequency === "semi-annual") frequencyMultiplier = 2;
    else if (inputs.paymentFrequency === "monthly") frequencyMultiplier = 12;

    if (faceValue <= 0 || maturity <= 0 || numberOfBonds <= 0) {
      return;
    }

    const couponPerPeriod = (faceValue * couponRate / 100) / frequencyMultiplier;
    const totalPeriods = maturity * frequencyMultiplier;

    const interestPerPeriod = couponPerPeriod * numberOfBonds;
    const totalBondInterest = couponPerPeriod * totalPeriods * numberOfBonds;
    const maturityValue = faceValue * numberOfBonds;
    const totalInvestment = currentPrice * numberOfBonds;
    const totalReturns = totalBondInterest + maturityValue - totalInvestment;

    const annualInterest = interestPerPeriod * frequencyMultiplier;
    const currentYield = (annualInterest / totalInvestment) * 100;

    const annualReturn = (totalBondInterest + maturityValue - totalInvestment) / maturity;
    const yieldToMaturity = (annualReturn / totalInvestment) * 100;

    setResults({
      interestPerPeriod,
      annualInterest,
      totalBondInterest,
      maturityValue,
      totalInvestment,
      totalReturns,
      currentYield,
      yieldToMaturity,
    });

    fetch("/api/calculator-usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calculatorType: "bonds-calculator",
        inputData: inputs,
        resultData: { interestPerPeriod, annualInterest, totalBondInterest, maturityValue, yieldToMaturity, currentYield },
      }),
    }).catch(console.error);
  };

  const getPeriodLabel = () => {
    if (inputs.paymentFrequency === "monthly") return "Month";
    if (inputs.paymentFrequency === "semi-annual") return "6 Months";
    return "Year";
  };

  return (
    <div className="max-w-5xl mx-auto mt-6">
      <h3
        className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400 text-center"
        data-testid="text-calculator-title"
      >
        Bonds Interest Payout Calculator
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="face-value" className="text-gray-700">Face Value (₹)</Label>
            <Input
              id="face-value"
              type="number"
              placeholder="1000"
              value={inputs.faceValue}
              onChange={(e) => setInputs({ ...inputs, faceValue: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
              data-testid="input-face-value"
            />
          </div>

          <div>
            <Label htmlFor="coupon-rate" className="text-gray-700">Coupon Rate (%)</Label>
            <Input
              id="coupon-rate"
              type="number"
              step="0.1"
              placeholder="7.5"
              value={inputs.couponRate}
              onChange={(e) => setInputs({ ...inputs, couponRate: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
              data-testid="input-coupon-rate"
            />
          </div>

          <div>
            <Label htmlFor="bond-maturity" className="text-gray-700">Maturity (Years)</Label>
            <Input
              id="bond-maturity"
              type="number"
              placeholder="10"
              value={inputs.bondMaturity}
              onChange={(e) => setInputs({ ...inputs, bondMaturity: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
              data-testid="input-bond-maturity"
            />
          </div>

          <div>
            <Label htmlFor="number-of-bonds" className="text-gray-700">Number of Bonds</Label>
            <Input
              id="number-of-bonds"
              type="number"
              placeholder="10"
              value={inputs.numberOfBonds}
              onChange={(e) => setInputs({ ...inputs, numberOfBonds: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
              data-testid="input-number-of-bonds"
            />
          </div>

          <div>
            <Label htmlFor="current-price" className="text-gray-700">Current Market Price (₹)</Label>
            <Input
              id="current-price"
              type="number"
              placeholder="1000"
              value={inputs.currentPrice}
              onChange={(e) => setInputs({ ...inputs, currentPrice: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
              data-testid="input-current-price"
            />
          </div>

          <div>
            <Label htmlFor="payment-frequency" className="text-gray-700">Payment Frequency</Label>
            <Select
              value={inputs.paymentFrequency}
              onValueChange={(value) => setInputs({ ...inputs, paymentFrequency: value })}
            >
              <SelectTrigger className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-400" data-testid="select-payment-frequency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="annual">Annual</SelectItem>
                <SelectItem value="semi-annual">Semi-Annual</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={calculateBonds}
            className="w-full bg-gradient-to-r from-blue-500 to-green-400 text-white py-3 rounded-lg font-semibold hover:opacity-90 transform hover:scale-[1.02] transition"
            data-testid="button-calculate"
          >
            Calculate Bond Returns
          </Button>
        </div>

        {/* Results Section */}
        <Card className="bg-white border border-gray-200 shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-gray-900 font-bold">Bond Investment Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Interest per {getPeriodLabel()}:</span>
              <span className="text-green-600 font-semibold" data-testid="result-interest-per-period">
                ₹{results.interestPerPeriod.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Annual Interest:</span>
              <span className="text-green-600 font-semibold" data-testid="result-annual-interest">
                ₹{results.annualInterest.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total Interest Over Term:</span>
              <span data-testid="result-total-bond-interest">₹{results.totalBondInterest.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Maturity Value:</span>
              <span data-testid="result-maturity-value">₹{results.maturityValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Investment:</span>
              <span data-testid="result-total-investment">₹{results.totalInvestment.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Returns:</span>
              <span className="font-semibold" data-testid="result-total-returns">₹{results.totalReturns.toLocaleString()}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 space-y-2">
              <div className="flex justify-between font-bold">
                <span>Current Yield:</span>
                <span className="text-green-600" data-testid="result-current-yield">
                  {results.currentYield.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Yield to Maturity:</span>
                <span className="text-green-600" data-testid="result-yield-to-maturity">
                  {results.yieldToMaturity.toFixed(2)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
