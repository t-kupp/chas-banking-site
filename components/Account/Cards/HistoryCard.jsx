import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";

export default function HistoryCard() {
  return (
    <Card className={"col-span-2 row-span-2"}>
      <CardHeader>
        <CardTitle>Balance History</CardTitle>
        <CardDescription>Track your account's balance over time.</CardDescription>
      </CardHeader>
      <CardContent>Hello</CardContent>
    </Card>
  );
}
