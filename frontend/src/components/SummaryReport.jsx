export default function SummaryReport({ transactions, finalBreakdown }) {
  // Flatten transactions to a single array
  const allTransactions = Object.values(transactions).flat();

  // Filter transactions for expenses
  const totalSpent = allTransactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((acc, item) => acc + Math.abs(item.amount), 0);

  // Get the final savings amount from breakdown
  const finalSavings = finalBreakdown.savings;

  return (
    <div>
      <h2>Summary Report</h2>
      <p>Total spent this year: ${totalSpent.toFixed(2)}</p>
      <p>Final savings balance: ${finalSavings.toFixed(2)}</p>
      <p>Thanks for playing!</p>
    </div>
  );
}
