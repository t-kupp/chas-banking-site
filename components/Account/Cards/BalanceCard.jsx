import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";

export default function BalanceCard({ balance }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Balance</CardTitle>
        <CardDescription>Total funds currently in your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">${balance}.00</p>
      </CardContent>
    </Card>
  );
}
