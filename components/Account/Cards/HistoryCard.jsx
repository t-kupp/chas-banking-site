import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { BASE_URL } from "@/lib/baseUrl";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, CartesianGrid, Line, XAxis, YAxis, ReferenceLine } from "recharts";

import formatDateToMonthAndDays from "@/lib/formatDateToMonthAndDays";

export default function HistoryCard({ balance }) {
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
  };

  useEffect(() => {
    getTransactions();
  }, [balance]);

  useEffect(() => {
    formatChartData();
  }, [transactions]); // Run formatChartData() when transactions update

  async function getTransactions() {
    const session = JSON.parse(localStorage.getItem("session"));

    const res = await fetch(`${BASE_URL}/api/account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "getTransactions", session }),
    });

    const answer = await res.json();

    if (res.status == 200) {
      setTransactions(answer.transactions.reverse());
    }
  }

  function formatChartData() {
    let sortedTransactions = [...transactions].sort(
      (a, b) => new Date(a.created) - new Date(b.created),
    );

    let balance = 0;
    let newChartData = sortedTransactions.map((transaction) => {
      balance +=
        transaction.transactionType === "deposit" ? transaction.amount : -transaction.amount;

      return {
        kr: balance,
        date: formatDateToMonthAndDays(transaction.created),
      };
    });

    setChartData(newChartData);
  }

  console.log(chartData);

  return (
    <Card className={"col-span-1 row-span-2 sm:col-span-2"}>
      <CardHeader>
        <CardTitle>Balance History</CardTitle>
        <CardDescription>Track your account's balance over time.</CardDescription>
      </CardHeader>
      <CardContent className={"px-0"}>
        <ChartContainer className="max-h-[235px] w-full" config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
              dataKey="kr"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value + " kr"}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="kr"
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
