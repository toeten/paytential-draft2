import { useState, useEffect } from 'react';
import CalendarSimulator from './CalendarSimulator';

export default function FinancialSimulator() {
  const [income, setIncome] = useState(null);
  const [monthlyIncome, setMonthlyIncome] = useState(null);
  const [breakdown, setBreakdown] = useState({ needs: 0, wants: 0, savings: 0 });

  const incomeLevels = [30000, 50000, 75000, 100000, 200000];

  const taxBrackets = [
    { limit: 8500, rate: 0.04 },
    { limit: 11700, rate: 0.045 },
    { limit: 13900, rate: 0.0525 },
    { limit: 21400, rate: 0.059 },
    { limit: Infinity, rate: 0.0645 },
  ];

  const calculateTax = (income) => {
    let tax = 0;
    let remainingIncome = income;

    for (const bracket of taxBrackets) {
      if (remainingIncome <= bracket.limit) {
        tax += remainingIncome * bracket.rate;
        break;
      } else {
        tax += bracket.limit * bracket.rate;
        remainingIncome -= bracket.limit;
      }
    }
    return tax;
  };

  const handleIncomeSelection = (event) => {
    const selectedIncome = parseInt(event.target.value, 10);
    setIncome(selectedIncome);
  };

  useEffect(() => {
    if (income) {
      const tax = calculateTax(income);
      const afterTaxIncome = income - tax;
      const monthly = afterTaxIncome / 12;

      setMonthlyIncome(monthly);

      setBreakdown({
        needs: parseFloat((monthly * 0.5).toFixed(2)),
        wants: parseFloat((monthly * 0.3).toFixed(2)),
        savings: parseFloat((monthly * 0.2).toFixed(2)),
      });
    }
  }, [income]);

  return (
    <div>
      <h1>Financial Simulator</h1>
      
      <h2>Select Your Annual Income</h2>
      <select onChange={handleIncomeSelection} value={income || ''}>
        <option value="" disabled>Select income level</option>
        {incomeLevels.map((level) => (
          <option key={level} value={level}>${level.toLocaleString()}</option>
        ))}
      </select>

      {income && (
        <>
          <h3>Annual Income: ${income.toLocaleString()}</h3>
          <p>After Taxes: ${(income - calculateTax(income)).toFixed(2)}</p>
          <p>Monthly Income: ${monthlyIncome?.toFixed(2)}</p>

          <h4>Monthly Breakdown</h4>
          <ul>
            <li>Needs (50%): ${breakdown.needs.toFixed(2)}</li>
            <li>Wants (30%): ${breakdown.wants.toFixed(2)}</li>
            <li>Savings (20%): ${breakdown.savings.toFixed(2)}</li>
          </ul>

          <CalendarSimulator breakdown={breakdown} setBreakdown={setBreakdown} monthlyIncome={monthlyIncome} />
        </>
      )}
    </div>
  );
}
