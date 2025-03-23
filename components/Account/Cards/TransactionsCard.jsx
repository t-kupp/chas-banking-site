import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/lib/baseUrl";
import { ArrowDownLeft, ArrowUpRight, HandCoins } from "lucide-react";
import formatToSEK from "@/lib/formatToSEK";
import formatDateToSwedish from "@/lib/formatDateToSwedish";

export default function TransactionsCard({ balance }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => {
    getTransactions();
  }, [balance]);

  async function getTransactions() {
    const session = JSON.parse(localStorage.getItem("session"));

    const res = await fetch(`${BASE_URL}/api/account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "getTransactions", session: session }),
    });

    const answer = await res.json();

    if (res.status == 200) {
      setTransactions(answer.transactions.reverse());
    }
  }

  return (
    <Card className={"row-span-2"}>
      <CardHeader>
        <CardTitle>
          <HandCoins size={20} className="text-primary" /> Transactions
        </CardTitle>
        <CardDescription>Stay updated on your account activity.</CardDescription>
      </CardHeader>
      <CardContent className={"max-h-[235px]"}>
        <ScrollArea className={"h-full"}>
          {transactions.map((transaction, index) => {
            const isDeposit = transaction.transactionType == "deposit";
            return (
              <div className="my-6" key={index}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {isDeposit ? (
                      <ArrowDownLeft
                        size={36}
                        className="bg-muted mr-6 rounded-full p-2 text-green-500"
                      />
                    ) : (
                      <ArrowUpRight
                        size={36}
                        className="bg-muted mr-6 rounded-full p-2 text-red-500"
                      />
                    )}

                    <div>
                      <p className="mb-1 text-sm">{isDeposit ? "Deposit" : "Transfer"}</p>
                      <p className="text-muted-foreground text-xs">
                        {formatDateToSwedish(transaction.created)}
                      </p>
                    </div>
                  </div>
                  <p className={`${isDeposit ? "text-green-500" : "text-red-500"} font-medium`}>
                    {isDeposit ? "+" : "-"}
                    {formatToSEK(transaction.amount)}
                  </p>
                </div>
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
