// import { useState } from "react";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { Label } from "../../components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

// export default function BlackScholesCalculator() {
//   const [inputs, setInputs] = useState({
//     stockPrice: "",
//     strikePrice: "",
//     timeToExpiry: "",
//     riskFreeRate: "",
//     volatility: "",
//     optionType: "call",
//   });

//   const [results, setResults] = useState({
//     optionPrice: 0,
//     delta: 0,
//     gamma: 0,
//     theta: 0,
//     vega: 0,
//     rho: 0,
//   });

//   // Standard normal cumulative distribution function (approximation)
//   const normCDF = (x: number): number => {
//     return 0.5 * (1 + erf(x / Math.sqrt(2)));
//   };

//   // Error function approximation
//   const erf = (x: number): number => {
//     const a1 = 0.254829592;
//     const a2 = -0.284496736;
//     const a3 = 1.421413741;
//     const a4 = -1.453152027;
//     const a5 = 1.061405429;
//     const p = 0.3275911;
    
//     const sign = x < 0 ? -1 : 1;
//     x = Math.abs(x);
    
//     const t = 1.0 / (1.0 + p * x);
//     const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    
//     return sign * y;
//   };

//   const calculateBlackScholes = () => {
//     const S = parseFloat(inputs.stockPrice) || 0;
//     const K = parseFloat(inputs.strikePrice) || 0;
//     const T = parseFloat(inputs.timeToExpiry) || 0;
//     const r = parseFloat(inputs.riskFreeRate) / 100 || 0;
//     const sigma = parseFloat(inputs.volatility) / 100 || 0;

//     if (S <= 0 || K <= 0 || T <= 0 || sigma <= 0) {
//       return;
//     }

//     // Black-Scholes formula implementation
//     const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
//     const d2 = d1 - sigma * Math.sqrt(T);

//     let optionPrice: number, delta: number;

//     if (inputs.optionType === 'call') {
//       optionPrice = S * normCDF(d1) - K * Math.exp(-r * T) * normCDF(d2);
//       delta = normCDF(d1);
//     } else {
//       optionPrice = K * Math.exp(-r * T) * normCDF(-d2) - S * normCDF(-d1);
//       delta = -normCDF(-d1);
//     }

//     // Greeks calculation
//     const phi_d1 = Math.exp(-0.5 * d1 * d1) / Math.sqrt(2 * Math.PI);
//     const gamma = phi_d1 / (S * sigma * Math.sqrt(T));
//     const theta = (-S * phi_d1 * sigma / (2 * Math.sqrt(T)) - r * K * Math.exp(-r * T) * normCDF(d2)) / 365;
//     const vega = S * phi_d1 * Math.sqrt(T) / 100;
//     const rho = K * T * Math.exp(-r * T) * normCDF(d2) / 100;

//     setResults({
//       optionPrice,
//       delta,
//       gamma,
//       theta,
//       vega,
//       rho,
//     });

//     // Log usage analytics
//     fetch("/api/calculator-usage", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         calculatorType: "black-scholes",
//         inputData: inputs,
//         resultData: { optionPrice, delta, gamma, theta, vega, rho },
//       }),
//     }).catch(console.error);
//   };

//   return (
//     <div>
//       <h3 className="text-2xl font-bold mb-6 text-white" data-testid="text-calculator-title">
//         Black & Scholes Option Calculator
//       </h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="space-y-4">
//           <div>
//             <Label htmlFor="stock-price" className="text-white">Current Stock Price (S)</Label>
//             <Input
//               id="stock-price"
//               type="number"
//               step="0.01"
//               placeholder="100"
//               value={inputs.stockPrice}
//               onChange={(e) => setInputs({ ...inputs, stockPrice: e.target.value })}
//               className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
//               data-testid="input-stock-price"
//             />
//           </div>
          
//           <div>
//             <Label htmlFor="strike-price" className="text-white">Strike Price (K)</Label>
//             <Input
//               id="strike-price"
//               type="number"
//               step="0.01"
//               placeholder="105"
//               value={inputs.strikePrice}
//               onChange={(e) => setInputs({ ...inputs, strikePrice: e.target.value })}
//               className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
//               data-testid="input-strike-price"
//             />
//           </div>
          
//           <div>
//             <Label htmlFor="time-to-expiry" className="text-white">Time to Expiry (Years)</Label>
//             <Input
//               id="time-to-expiry"
//               type="number"
//               step="0.01"
//               placeholder="0.25"
//               value={inputs.timeToExpiry}
//               onChange={(e) => setInputs({ ...inputs, timeToExpiry: e.target.value })}
//               className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
//               data-testid="input-time-to-expiry"
//             />
//           </div>
          
//           <div>
//             <Label htmlFor="risk-free-rate" className="text-white">Risk-Free Rate (%)</Label>
//             <Input
//               id="risk-free-rate"
//               type="number"
//               step="0.01"
//               placeholder="5"
//               value={inputs.riskFreeRate}
//               onChange={(e) => setInputs({ ...inputs, riskFreeRate: e.target.value })}
//               className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
//               data-testid="input-risk-free-rate"
//             />
//           </div>
          
//           <div>
//             <Label htmlFor="volatility" className="text-white">Volatility (%)</Label>
//             <Input
//               id="volatility"
//               type="number"
//               step="0.01"
//               placeholder="20"
//               value={inputs.volatility}
//               onChange={(e) => setInputs({ ...inputs, volatility: e.target.value })}
//               className="bg-white bg-opacity-10 border-white border-opacity-20 text-white"
//               data-testid="input-volatility"
//             />
//           </div>
          
//           <div>
//             <Label htmlFor="option-type" className="text-white">Option Type</Label>
//             <Select
//               value={inputs.optionType}
//               onValueChange={(value) => setInputs({ ...inputs, optionType: value })}
//             >
//               <SelectTrigger className="bg-white bg-opacity-10 border-white border-opacity-20 text-white" data-testid="select-option-type">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="call">Call Option</SelectItem>
//                 <SelectItem value="put">Put Option</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
          
//           <Button 
//             onClick={calculateBlackScholes}
//             className="w-full bg-finance-blue hover:bg-blue-600 text-white py-3 rounded-lg font-semibold"
//             data-testid="button-calculate"
//           >
//             Calculate Option Price
//           </Button>
//         </div>
        
//         <Card className="bg-white bg-opacity-5 border-white border-opacity-10">
//           <CardHeader>
//             <CardTitle className="text-white">Option Valuation</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-3">
//             <div className="flex justify-between text-white">
//               <span>Option Price:</span>
//               <span className="text-green-400 font-bold" data-testid="result-option-price">
//                 ₹{results.optionPrice.toFixed(2)}
//               </span>
//             </div>
//             <div className="flex justify-between text-white">
//               <span>Delta (Δ):</span>
//               <span data-testid="result-delta">{results.delta.toFixed(4)}</span>
//             </div>
//             <div className="flex justify-between text-white">
//               <span>Gamma (Γ):</span>
//               <span data-testid="result-gamma">{results.gamma.toFixed(4)}</span>
//             </div>
//             <div className="flex justify-between text-white">
//               <span>Theta (Θ):</span>
//               <span data-testid="result-theta">{results.theta.toFixed(4)}</span>
//             </div>
//             <div className="flex justify-between text-white">
//               <span>Vega (ν):</span>
//               <span data-testid="result-vega">{results.vega.toFixed(4)}</span>
//             </div>
//             <div className="flex justify-between text-white">
//               <span>Rho (ρ):</span>
//               <span data-testid="result-rho">{results.rho.toFixed(4)}</span>
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

export default function BlackScholesCalculator() {
  const [inputs, setInputs] = useState({
    stockPrice: "",
    strikePrice: "",
    daysToExpiry: "",
    riskFreeRate: "",
    dividendYield: "",
    volatility: "",
    optionType: "call",
  });

  const [results, setResults] = useState({
    optionPrice: 0,
    delta: 0,
    gamma: 0,
    theta: 0,
    vega: 0,
    rho: 0,
  });

  // Standard normal CDF
  const normCDF = (x: number): number => {
    return 0.5 * (1 + erf(x / Math.sqrt(2)));
  };

  // Error function approximation
  const erf = (x: number): number => {
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;

    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);

    const t = 1.0 / (1.0 + p * x);
    const y =
      1.0 -
      (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) *
        t *
        Math.exp(-x * x);

    return sign * y;
  };

  const calculateBlackScholes = () => {
    const S = parseFloat(inputs.stockPrice) || 0;
    const K = parseFloat(inputs.strikePrice) || 0;
    const days = parseFloat(inputs.daysToExpiry) || 0;
    const T = days / 365; // convert days → years
    const r = parseFloat(inputs.riskFreeRate) / 100 || 0;
    const q = parseFloat(inputs.dividendYield) / 100 || 0;
    const sigma = parseFloat(inputs.volatility) / 100 || 0;

    if (S <= 0 || K <= 0 || T <= 0 || sigma <= 0) {
      return;
    }

    const d1 =
      (Math.log(S / K) + (r - q + 0.5 * sigma * sigma) * T) /
      (sigma * Math.sqrt(T));
    const d2 = d1 - sigma * Math.sqrt(T);

    const phi_d1 = Math.exp(-0.5 * d1 * d1) / Math.sqrt(2 * Math.PI);

    let optionPrice: number,
      delta: number,
      theta: number,
      rho: number;

    if (inputs.optionType === "call") {
      optionPrice =
        S * Math.exp(-q * T) * normCDF(d1) -
        K * Math.exp(-r * T) * normCDF(d2);

      delta = Math.exp(-q * T) * normCDF(d1);

      theta =
        (-S * phi_d1 * sigma * Math.exp(-q * T)) / (2 * Math.sqrt(T)) -
        r * K * Math.exp(-r * T) * normCDF(d2) +
        q * S * Math.exp(-q * T) * normCDF(d1);

      rho = K * T * Math.exp(-r * T) * normCDF(d2);
    } else {
      optionPrice =
        K * Math.exp(-r * T) * normCDF(-d2) -
        S * Math.exp(-q * T) * normCDF(-d1);

      delta = -Math.exp(-q * T) * normCDF(-d1);

      theta =
        (-S * phi_d1 * sigma * Math.exp(-q * T)) / (2 * Math.sqrt(T)) +
        r * K * Math.exp(-r * T) * normCDF(-d2) -
        q * S * Math.exp(-q * T) * normCDF(-d1);

      rho = -K * T * Math.exp(-r * T) * normCDF(-d2);
    }

    // scale
    theta = theta / 365; // per day
    const gamma = (phi_d1 * Math.exp(-q * T)) / (S * sigma * Math.sqrt(T));
    const vega = (S * Math.exp(-q * T) * phi_d1 * Math.sqrt(T)) / 100;
    rho = rho / 100;

    setResults({
      optionPrice,
      delta,
      gamma,
      theta,
      vega,
      rho,
    });

    // optional logging
    fetch("/api/calculator-usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calculatorType: "black-scholes",
        inputData: inputs,
        resultData: { optionPrice, delta, gamma, theta, vega, rho },
      }),
    }).catch(console.error);
  };

  return (
    <div>
      {/* Title with gradient */}
      <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
        Black & Scholes Option Calculator
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="stock-price" className="text-gray-700 font-medium">
              Current Stock Price (S)
            </Label>
            <Input
              id="stock-price"
              type="number"
              step="0.01"
              placeholder="100"
              value={inputs.stockPrice}
              onChange={(e) =>
                setInputs({ ...inputs, stockPrice: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-full"
            />
          </div>

          <div>
            <Label htmlFor="strike-price" className="text-gray-700 font-medium">
              Strike Price (K)
            </Label>
            <Input
              id="strike-price"
              type="number"
              step="0.01"
              placeholder="105"
              value={inputs.strikePrice}
              onChange={(e) =>
                setInputs({ ...inputs, strikePrice: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-full"
            />
          </div>

          <div>
            <Label htmlFor="days-to-expiry" className="text-gray-700 font-medium">
              Days to Expiry
            </Label>
            <Input
              id="days-to-expiry"
              type="number"
              step="1"
              placeholder="30"
              value={inputs.daysToExpiry}
              onChange={(e) =>
                setInputs({ ...inputs, daysToExpiry: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-full"
            />
          </div>

          <div>
            <Label htmlFor="risk-free-rate" className="text-gray-700 font-medium">
              Risk-Free Rate (%)
            </Label>
            <Input
              id="risk-free-rate"
              type="number"
              step="0.01"
              placeholder="5"
              value={inputs.riskFreeRate}
              onChange={(e) =>
                setInputs({ ...inputs, riskFreeRate: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-full"
            />
          </div>

          <div>
            <Label htmlFor="dividend-yield" className="text-gray-700 font-medium">
              Dividend Yield (%)
            </Label>
            <Input
              id="dividend-yield"
              type="number"
              step="0.01"
              placeholder="2"
              value={inputs.dividendYield}
              onChange={(e) =>
                setInputs({ ...inputs, dividendYield: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-full"
            />
          </div>

          <div>
            <Label htmlFor="volatility" className="text-gray-700 font-medium">
              Volatility (%)
            </Label>
            <Input
              id="volatility"
              type="number"
              step="0.01"
              placeholder="20"
              value={inputs.volatility}
              onChange={(e) =>
                setInputs({ ...inputs, volatility: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-full"
            />
          </div>

          <div>
            <Label htmlFor="option-type" className="text-gray-700 font-medium">
              Option Type
            </Label>
            <Select
              value={inputs.optionType}
              onValueChange={(value) =>
                setInputs({ ...inputs, optionType: value })
              }
            >
              <SelectTrigger className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="call">Call Option</SelectItem>
                <SelectItem value="put">Put Option</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={calculateBlackScholes}
            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-green-400 hover:opacity-90 text-white py-3 rounded-xl font-semibold shadow-lg transition-transform hover:scale-[1.02]"
          >
            Calculate Option Price
          </Button>
        </div>

        {/* Results */}
        <Card className="bg-white border border-gray-200 shadow-lg rounded-xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-gray-800 font-bold">
              Option Valuation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Option Price:</span>
              <span className="text-green-600 font-bold">
                ₹{results.optionPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Delta (Δ):</span>
              <span>{results.delta.toFixed(4)}</span>
            </div>
            <div className="flex justify-between">
              <span>Gamma (Γ):</span>
              <span>{results.gamma.toFixed(4)}</span>
            </div>
            <div className="flex justify-between">
              <span>Theta (Θ):</span>
              <span>{results.theta.toFixed(4)}</span>
            </div>
            <div className="flex justify-between">
              <span>Vega (ν):</span>
              <span>{results.vega.toFixed(4)}</span>
            </div>
            <div className="flex justify-between">
              <span>Rho (ρ):</span>
              <span>{results.rho.toFixed(4)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
