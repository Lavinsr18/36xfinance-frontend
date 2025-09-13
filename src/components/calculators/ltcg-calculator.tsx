import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";

// FY25–26 CII values (adjustable as per IT Dept)
const CII = {
  2017: 272, 2018: 280, 2019: 289, 2020: 301,
  2021: 317, 2022: 331, 2023: 348, 2024: 351, 2025: 348
};

export default function LTCGCalculator() {
  const [inputs, setInputs] = useState({
    purchasePrice: "",
    salePrice: "",
    purchaseDate: "",
    saleDate: "",
    assetType: "equity",
    improvementCost: "",
  });

  const [results, setResults] = useState({
    capitalGains: 0,
    indexedCost: 0,
    taxableGains: 0,
    taxRate: 0,
    exemption: 0,
    ltcgTax: 0,
  });

  const calculateLTCG = () => {
    const purchasePrice = parseFloat(inputs.purchasePrice) || 0;
    const salePrice = parseFloat(inputs.salePrice) || 0;
    const improvementCost = parseFloat(inputs.improvementCost) || 0;
    const purchaseDate = new Date(inputs.purchaseDate);
    const saleDate = new Date(inputs.saleDate);

    if (!purchaseDate || !saleDate || saleDate <= purchaseDate) {
      alert("Please enter valid purchase and sale dates.");
      return;
    }

    const holdingPeriodYears = (saleDate.getTime() - purchaseDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
    const totalCost = purchasePrice + improvementCost;
    let indexedCost = totalCost;
    let capitalGains = salePrice - totalCost;
    let taxableGains = 0;
    let taxRate = 0;
    let exemption = 0;

    const purchaseFY = purchaseDate.getFullYear();
    const saleFY = saleDate.getFullYear();

    if (inputs.assetType === "equity" || inputs.assetType === "mutual-fund") {
      if (holdingPeriodYears > 1) {
        taxRate = 10; // LTCG
        exemption = Math.min(100000, Math.max(0, capitalGains)); // ₹1 lakh exemption
        taxableGains = Math.max(0, capitalGains - exemption);
      } else {
        taxRate = 15; // STCG
        taxableGains = capitalGains;
      }
    } else if (inputs.assetType === "immovable") {
      if (holdingPeriodYears > 2) {
        taxRate = 20;
        const ciiPurchase = CII[purchaseFY as keyof typeof CII] || 100;
        const ciiSale = CII[saleFY as keyof typeof CII] || 100;
        indexedCost = totalCost * (ciiSale / ciiPurchase);
        taxableGains = Math.max(0, salePrice - indexedCost);
      } else {
        taxRate = 30; // STCG slab
        taxableGains = capitalGains;
      }
    } else {
      // Other assets
      if (holdingPeriodYears > 3) {
        taxRate = 20;
        const ciiPurchase = CII[purchaseFY as keyof typeof CII] || 100;
        const ciiSale = CII[saleFY as keyof typeof CII] || 100;
        indexedCost = totalCost * (ciiSale / ciiPurchase);
        taxableGains = Math.max(0, salePrice - indexedCost);
      } else {
        taxRate = 30;
        taxableGains = capitalGains;
      }
    }

    const ltcgTax = taxableGains * taxRate / 100;

    setResults({ capitalGains, indexedCost, taxableGains, taxRate, exemption, ltcgTax });

    // Analytics log
    fetch("/api/calculator-usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calculatorType: "ltcg-calculator",
        inputData: inputs,
        resultData: { capitalGains, indexedCost, taxableGains, taxRate, exemption, ltcgTax },
      }),
    }).catch(console.error);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h3 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400" data-testid="text-calculator-title">
        Long Term Capital Gains Calculator
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Card className="bg-white rounded-xl border border-gray-200 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-gray-800">Asset Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="purchase-price" className="text-gray-700">Purchase Price (₹)</Label>
                <Input
                  id="purchase-price"
                  type="number"
                  placeholder="100000"
                  value={inputs.purchasePrice}
                  onChange={(e) => setInputs({ ...inputs, purchasePrice: e.target.value })}
                  className="bg-gray-50 border-gray-300 placeholder-gray-400 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  data-testid="input-purchase-price"
                />
              </div>

              <div>
                <Label htmlFor="sale-price" className="text-gray-700">Sale Price (₹)</Label>
                <Input
                  id="sale-price"
                  type="number"
                  placeholder="150000"
                  value={inputs.salePrice}
                  onChange={(e) => setInputs({ ...inputs, salePrice: e.target.value })}
                  className="bg-gray-50 border-gray-300 placeholder-gray-400 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  data-testid="input-sale-price"
                />
              </div>
              
              <div>
                <Label htmlFor="improvement-cost" className="text-gray-700">Improvement Cost (₹)</Label>
                <Input
                  id="improvement-cost"
                  type="number"
                  placeholder="0"
                  value={inputs.improvementCost}
                  onChange={(e) => setInputs({ ...inputs, improvementCost: e.target.value })}
                  className="bg-gray-50 border-gray-300 placeholder-gray-400 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  data-testid="input-improvement-cost"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="purchase-date" className="text-gray-700">Purchase Date</Label>
                  <Input
                    id="purchase-date"
                    type="date"
                    value={inputs.purchaseDate}
                    onChange={(e) => setInputs({ ...inputs, purchaseDate: e.target.value })}
                    className="bg-gray-50 border-gray-300 placeholder-gray-400 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    data-testid="input-purchase-date"
                  />
                </div>

                <div>
                  <Label htmlFor="sale-date" className="text-gray-700">Sale Date</Label>
                  <Input
                    id="sale-date"
                    type="date"
                    value={inputs.saleDate}
                    onChange={(e) => setInputs({ ...inputs, saleDate: e.target.value })}
                    className="bg-gray-50 border-gray-300 placeholder-gray-400 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    data-testid="input-sale-date"
                  />
                </div>
              </div>
              
              <div className="z-10">
                <Label htmlFor="asset-type" className="text-gray-700">Asset Type</Label>
                <Select
                  value={inputs.assetType}
                  onValueChange={(value) => setInputs({ ...inputs, assetType: value })}
                >
                  <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400" data-testid="select-asset-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-white border border-gray-200 rounded-md shadow-lg">
                    <SelectItem value="immovable">Immovable Property</SelectItem>
                    <SelectItem value="equity">Equity Shares</SelectItem>
                    <SelectItem value="mutual-fund">Equity Mutual Funds</SelectItem>
                    <SelectItem value="other">Other Assets</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={calculateLTCG}
                className="w-full mt-4 bg-gradient-to-r from-blue-500 to-green-400 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all hover:scale-[1.02]"
                data-testid="button-calculate"
              >
                Calculate LTCG Tax
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white rounded-xl border border-gray-200 shadow-lg backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-gray-800">LTCG Calculation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-gray-700">
              <span>Capital Gains:</span>
              <span className="text-gray-800 font-medium" data-testid="result-capital-gains">₹{results.capitalGains.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Indexed Cost:</span>
              <span className="text-gray-800 font-medium" data-testid="result-indexed-cost">₹{Math.round(results.indexedCost).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Taxable Gains:</span>
              <span className="text-gray-800 font-medium" data-testid="result-taxable-gains">₹{results.taxableGains.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Tax Rate:</span>
              <span className="text-gray-800 font-medium" data-testid="result-tax-rate">{results.taxRate}%</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Exemption Available:</span>
              <span className="text-gray-800 font-medium" data-testid="result-exemption">₹{results.exemption.toLocaleString()}</span>
            </div>
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between font-bold text-lg text-gray-800">
                <span>LTCG Tax:</span>
                <span className="text-red-600" data-testid="result-ltcg-tax">
                  ₹{Math.round(results.ltcgTax).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}