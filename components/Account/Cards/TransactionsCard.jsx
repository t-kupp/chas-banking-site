import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";

export default function TransactionsCard() {
  return (
    <Card className={"row-span-2"}>
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
        <CardDescription>Stay updated on your account activity.</CardDescription>
      </CardHeader>
      <CardContent>Hello</CardContent>
    </Card>
  );
}
