import { useState, useEffect } from 'react';
import CalendarSimulator from './CalendarSimulator';

export default function FinancialSimulator() {
  const [income, setIncome] = useState(null);
  const [monthlyIncome, setMonthlyIncome] = useState(null);
  const [breakdown, setBreakdown] = useState({ needs: 0, wants: 0, savings: 0 });
  const [lifestyle, setLifestyle] = useState("");
  const [selectionsComplete, setSelectionsComplete] = useState(false);

  const incomeLevels = [30000, 50000, 75000, 100000, 200000];
  const lifestyleOptions = {
    basic: { housing: 950, transportation: 200, food: 400, misc: 350 },
    moderate: { housing: 1500, transportation: 300, food: 750, misc: 500 },
    luxury: { housing: 2500, transportation: 500, food: 1000, misc: 1000 },
  };

  const calculateTax = (income) => {
    const taxBrackets = [
      { limit: 8500, rate: 0.04 },
      { limit: 11700, rate: 0.045 },
      { limit: 13900, rate: 0.0525 },
      { limit: 21400, rate: 0.059 },
      { limit: Infinity, rate: 0.0645 },
    ];
    let tax = 0, remainingIncome = income;
    for (const bracket of taxBrackets) {
      if (remainingIncome <= bracket.limit) {
        tax += remainingIncome * bracket.rate;
        break;
      }
      tax += bracket.limit * bracket.rate;
      remainingIncome -= bracket.limit;
    }
    return tax;
  };

  const handleIncomeSelection = (event) => setIncome(parseInt(event.target.value, 10));
  const handleLifestyleSelection = (event) => setLifestyle(event.target.value);

  useEffect(() => {
    if (income && lifestyle) {
      const tax = calculateTax(income);
      const afterTaxIncome = income - tax;
      const monthly = afterTaxIncome / 12;
      setMonthlyIncome(monthly);
      setBreakdown({
        needs: parseFloat((monthly * 0.5).toFixed(2)),
        wants: parseFloat((monthly * 0.3).toFixed(2)),
        savings: parseFloat((monthly * 0.2).toFixed(2)),
      });

      setSelectionsComplete(true);
    }
  }, [income, lifestyle]);

  return (
    <div className="financial-simulator-container">
      {/* Sidebar for lifestyle expenses */}
      <div className="sidebar">
        <h3>Lifestyle Expenses</h3>
        {lifestyle ? (
          <ul>
            {Object.entries(lifestyleOptions[lifestyle]).map(([key, value]) => (
              <li key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}: ${value}
              </li>
            ))}
          </ul>
        ) : (
          <p>Select a lifestyle to see expenses</p>
        )}
      </div>

      {/* Main content area */}
      <div className="main-content">
        <h1>Financial Simulator</h1>

        {!selectionsComplete && (
          <>
            <h2>Select Your Annual Income</h2>
            <select onChange={handleIncomeSelection} value={income || ''}>
              <option value="" disabled>Select income level</option>
              {incomeLevels.map(level => (
                <option key={level} value={level}>${level.toLocaleString()}</option>
              ))}
            </select>

            <h2>Select Your Lifestyle</h2>
            <select onChange={handleLifestyleSelection} value={lifestyle || ''}>
              <option value="" disabled>Select lifestyle</option>
              {Object.keys(lifestyleOptions).map(option => (
                <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
              ))}
            </select>
          </>
        )}

        {income && lifestyle && (
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

            <div className="calendar-container">
              <CalendarSimulator 
                breakdown={breakdown} 
                setBreakdown={setBreakdown} 
                monthlyIncome={monthlyIncome} 
                lifestyleExpenses={lifestyleOptions[lifestyle]} 
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
