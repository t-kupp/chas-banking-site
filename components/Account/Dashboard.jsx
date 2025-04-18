import BalanceCard from "./Cards/BalanceCard";
import DashboardHeader from "./DashboardHeader";
import DepositCard from "./Cards/DepositCard";
import TransferCard from "./Cards/TransferCard";
import TransactionsCard from "./Cards/TransactionsCard";
import HistoryCard from "./Cards/HistoryCard";
import { useState } from "react";

export default function Dashboard({ user }) {
  const [balance, setBalance] = useState(user.amount);

  function updateBalance(newBalance) {
    setBalance(newBalance);
  }

  return (
    <div className="flex h-full w-full flex-col gap-4 lg:gap-8">
      <DashboardHeader user={user} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <BalanceCard balance={balance} />
        <DepositCard updateBalance={updateBalance} />
        <TransferCard updateBalance={updateBalance} />
        <TransactionsCard balance={balance} />
        <HistoryCard balance={balance} />
      </div>
    </div>
  );
}
