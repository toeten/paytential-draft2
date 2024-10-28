import { useState, useEffect } from 'react';
import SummaryReport from './SummaryReport';

export default function CalendarSimulator({ breakdown, setBreakdown, monthlyIncome }) {
  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentYear, setCurrentYear] = useState(2024);
  const [popup, setPopup] = useState(null);
  const [transactions, setTransactions] = useState({});
  const [simulationOver, setSimulationOver] = useState(false);
  const [dayStates, setDayStates] = useState({});
  const [currentDay, setCurrentDay] = useState(1);
  const [monthInProgress, setMonthInProgress] = useState(false);
  const [monthlyEvents, setMonthlyEvents] = useState([]);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  if (isLeapYear(currentYear)) daysInMonth[1] = 29;

  const rent = parseFloat((monthlyIncome * -0.3).toFixed(2));
  const days = Array.from({ length: daysInMonth[currentMonth] }, (_, i) => i + 1);

   // Define random events pool
   const randomEvents = [
    { description: "Uh oh, your dog ate a rock!", amount: -200, bucket: "savings" },
    { description: "Your mom gave you some birthday money!", amount: 100, bucket: "wants" },
    { description: "Surprise inheritance!", amount: 500, bucket: "savings" },
    { description: "You won a small lottery!", amount: 200, bucket: "wants" },
    { description: "Gift from a distant relative!", amount: 150, bucket: "savings" },
    { description: "Refund on your taxes!", amount: 100, bucket: "needs" },
    { description: "Freelance gig bonus!", amount: 300, bucket: "savings" },
    { description: "Your friend treated you to dinner!", amount: 30, bucket: "wants" },
    { description: "You found $20 on the street!", amount: 20, bucket: "wants" },
    { description: "Employee of the Month reward!", amount: 150, bucket: "needs" },
    { description: "Tax refund came early!", amount: 250, bucket: "savings" },
    { description: "Landlord gave a rent discount!", amount: 100, bucket: "needs" },
    { description: "You got a small raise!", amount: 200, bucket: "savings" },
    { description: "Online shopping cashback bonus!", amount: 15, bucket: "wants" },
    { description: "Birthday gift from family!", amount: 100, bucket: "wants" },
    { description: "Discount on utility bill!", amount: 30, bucket: "needs" },
    { description: "Reimbursement for a work expense!", amount: 120, bucket: "needs" },
    { description: "Won a raffle!", amount: 50, bucket: "wants" },
    { description: "Bought a lottery ticket and won!", amount: 75, bucket: "wants" },
    { description: "Random act of kindness – someone paid your grocery bill!", amount: 80, bucket: "needs" },
    { description: "Sold old clothes online!", amount: 60, bucket: "wants" },
    { description: "Discounted groceries this week!", amount: 20, bucket: "needs" },
    { description: "Part-time job income boost!", amount: 200, bucket: "savings" },
    { description: "Energy bill rebate!", amount: 50, bucket: "needs" },
    { description: "Received a tip at work!", amount: 10, bucket: "wants" },
    { description: "Free coffee for a month!", amount: 15, bucket: "wants" },
    { description: "Unexpected medical bill.", amount: -150, bucket: "needs" },
    { description: "Car broke down.", amount: -300, bucket: "savings" },
    { description: "Lost your wallet.", amount: -50, bucket: "wants" },
    { description: "Speeding ticket.", amount: -100, bucket: "needs" },
    { description: "Pet emergency vet visit.", amount: -200, bucket: "savings" },
    { description: "Forgot to cancel a subscription.", amount: -20, bucket: "wants" },
    { description: "Bike repair cost.", amount: -60, bucket: "needs" },
    { description: "Parking fine.", amount: -30, bucket: "wants" },
    { description: "Had to pay a friend back.", amount: -75, bucket: "savings" },
    { description: "Appliance broke and needed replacement.", amount: -150, bucket: "needs" },
    { description: "Missed rent payment penalty.", amount: -100, bucket: "needs" },
    { description: "Flight got canceled; booking fee lost.", amount: -50, bucket: "wants" },
    { description: "Unplanned work expenses.", amount: -120, bucket: "savings" },
    { description: "Car towed unexpectedly.", amount: -150, bucket: "needs" },
    { description: "Surprise dental bill.", amount: -90, bucket: "needs" },
    { description: "ATM fee for out-of-network use.", amount: -5, bucket: "savings" },
    { description: "Utility bill surge.", amount: -60, bucket: "needs" },
    { description: "Lost your keys and paid for a locksmith.", amount: -45, bucket: "wants" },
    { description: "Extra expense on rent due to repair costs.", amount: -80, bucket: "needs" },
    { description: "Forgot to return a rental; late fee applied.", amount: -15, bucket: "wants" },
    { description: "Borrowed cash from a friend, now repaying.", amount: -50, bucket: "wants" },
    { description: "Phone screen cracked; paid for repair.", amount: -100, bucket: "savings" },
    { description: "Surge pricing on a ride-hailing app.", amount: -25, bucket: "wants" },
    { description: "Extra pet supplies expense.", amount: -35, bucket: "needs" }
  ];

  const groceryEvent = { name: 'Groceries', amount: -200, bucket: 'needs' };
  const utilitiesEvents = [
    { name: 'Electric Bill', amount: -100, bucket: 'needs' },
    { name: 'Water Bill', amount: -50, bucket: 'needs' },
    { name: 'Internet Bill', amount: -60, bucket: 'needs' },
  ];

  const startMonth = () => {
    if (currentMonth === 11) {
      setSimulationOver(true);
      return;
    }

    transferToSavings();
    replenishBuckets();

    setCurrentMonth((prevMonth) => (prevMonth + 1) % 12);
    if (currentMonth === 11) setCurrentYear((prevYear) => prevYear + 1);

    const eventCount = Math.floor(Math.random() * 4);
    const selectedEvents = Array.from({ length: eventCount }, () => randomEvents[Math.floor(Math.random() * randomEvents.length)]);
    setMonthlyEvents(selectedEvents);

    setCurrentDay(1);
    setDayStates({});
    setMonthInProgress(true);

    advanceDay(1);
  };

  const transferToSavings = () => {
    const totalTransfer = parseFloat((breakdown.needs + breakdown.wants).toFixed(2));
    setTransactions((prevTransactions) => ({
      ...prevTransactions,
      [currentMonth]: [
        ...(prevTransactions[currentMonth] || []),
        { name: "End-of-Month Transfer", amount: totalTransfer, type: "transfer" }
      ]
    }));
    setBreakdown((prevBreakdown) => ({
      needs: 0,
      wants: 0,
      savings: parseFloat((prevBreakdown.savings + totalTransfer).toFixed(2)),
    }));
  };

  const replenishBuckets = () => {
    setBreakdown({
      needs: parseFloat((monthlyIncome * 0.5).toFixed(2)),
      wants: parseFloat((monthlyIncome * 0.3).toFixed(2)),
      savings: parseFloat((breakdown.savings + monthlyIncome * 0.2).toFixed(2)),
    });
    setTransactions((prevTransactions) => ({
      ...prevTransactions,
      [currentMonth]: [
        ...(prevTransactions[currentMonth] || []),
        { name: "Monthly Paycheck", amount: monthlyIncome, type: "paycheck" }
      ]
    }));
  };

  const advanceDay = (day = currentDay) => {
    if (!monthInProgress || day > daysInMonth[currentMonth]) {
      handleEndOfMonthEvents();
      return;
    }

    const newDayStates = { ...dayStates, [day]: 'completed' };
    setDayStates(newDayStates);
    setCurrentDay(day);

    if (day === 14 || day === 28) {
      handleTransaction(groceryEvent);
      setDayStates((prev) => ({ ...prev, [day]: 'event-negative' }));
      return;
    }

    if (monthlyEvents.length > 0 && day % 7 === 0) {
      const event = monthlyEvents.pop();
      handleTransaction(event);
      const eventClass = event.amount > 0 ? 'event-positive' : 'event-negative';
      setDayStates((prev) => ({ ...prev, [day]: eventClass }));
      setPopup({ name: event.description, amount: event.amount, bucket: event.bucket });
      return;
    }

    setTimeout(() => advanceDay(day + 1), 200);
  };

  const handleEndOfMonthEvents = () => {
    if (!monthInProgress) return;
    utilitiesEvents.forEach(event => handleTransaction(event));
    const rentEvent = { name: 'Monthly Rent', amount: rent, bucket: 'needs' };
    handleTransaction(rentEvent);
    setMonthInProgress(false);
  };

  useEffect(() => {
    if (currentMonth >= 0 || currentYear > 2024) {
      const rentEvent = { name: 'Monthly Rent', amount: rent, bucket: 'needs' };
      handleTransaction(rentEvent);
    }
  }, [currentMonth]);

  const handleTransaction = (event) => {
    setPopup(event);
    setBreakdown((prevBreakdown) => {
      const { bucket, amount } = event;
      let updatedBreakdown = { ...prevBreakdown };

      if (bucket === 'needs' && updatedBreakdown.needs < Math.abs(amount)) {
        if (updatedBreakdown.wants >= Math.abs(amount)) {
          updatedBreakdown.wants += amount;
        } else if (updatedBreakdown.savings >= Math.abs(amount)) {
          updatedBreakdown.savings += amount;
        } else {
          const remainingAmount = amount + updatedBreakdown.needs + updatedBreakdown.wants + updatedBreakdown.savings;
          updatedBreakdown.needs = 0;
          updatedBreakdown.wants = 0;
          updatedBreakdown.savings = Math.max(updatedBreakdown.savings + remainingAmount, 0);
        }
      } else {
        updatedBreakdown[bucket] += amount;
      }

      setTransactions((prevTransactions) => ({
        ...prevTransactions,
        [currentMonth]: [
          ...(prevTransactions[currentMonth] || []),
          { name: event.name || event.description, amount, type: amount > 0 ? "income" : "expense" }
        ]
      }));
      return updatedBreakdown;
    });
  };

  const closePopup = () => {
    setPopup(null);
    if (monthInProgress && currentDay < daysInMonth[currentMonth]) {
      advanceDay(currentDay + 1);
    }
  };

  const getStartDay = (month, year) => new Date(year, month, 1).getDay();
  const startDay = getStartDay(currentMonth, currentYear);

  return (
    <div className="container">
      <div className="main-content">
        <h2>{months[currentMonth]} {currentYear}</h2>
        
        {!simulationOver && !monthInProgress && (
          <button onClick={startMonth}>Start Month</button>
        )}

        {simulationOver ? (
          <SummaryReport transactions={transactions} finalBreakdown={breakdown} />
        ) : (
          <>
            {popup && (
              <div className="popup">
                <p>{popup.name} - Amount: ${popup.amount.toFixed(2)}</p>
                <p>This will be {popup.amount > 0 ? "added to" : "deducted from"} your {popup.bucket} bucket.</p>
                <button onClick={closePopup}>OK</button>
              </div>
            )}

            <div className="calendar">
              <div className="weekdays">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="weekday">{day}</div>
                ))}
              </div>
              <div className="days">
                {Array.from({ length: startDay }).map((_, index) => (
                  <div key={index} className="empty-day"></div>
                ))}
                {days.map((day) => (
                  <div
                    key={day}
                    className={`day ${dayStates[day] === 'completed' ? 'completed' : ''} ${dayStates[day] === 'event-positive' ? 'event-positive' : ''} ${dayStates[day] === 'event-negative' ? 'event-negative' : ''}`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>

            <h3>Remaining Balances</h3>
            <ul>
              <li>Needs: ${breakdown.needs.toFixed(2)}</li>
              <li>Wants: ${breakdown.wants.toFixed(2)}</li>
              <li>Savings: ${breakdown.savings.toFixed(2)}</li>
            </ul>
          </>
        )}
      </div>

      <div className="sidebar">
        <h3>Transaction Log</h3>
        <ul className="transaction-list">
          {Object.keys(transactions).map((monthIndex) => (
            <li key={monthIndex}>
              <h4>{months[monthIndex]}</h4>
              <ul>
                {transactions[monthIndex].map((transaction, index) => (
                  <li key={index} className={`transaction-item ${transaction.amount > 0 ? 'transaction-item-positive' : 'transaction-item-negative'}`}>
                    {transaction.name}: ${transaction.amount.toFixed(2)} ({transaction.type})
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}