import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";

export default function BalanceCard({ balance }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Balance</CardTitle>
        <CardDescription>Total funds currently in your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{formatToUSD(balance)}</p>
      </CardContent>
    </Card>
  );
}

function formatToUSD(amount) {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
  }).format(amount);
}
