import formatToSEK from "@/lib/formatToSEK";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Landmark } from "lucide-react";

export default function BalanceCard({ balance }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Landmark size={20} className="text-primary" /> Current Balance
        </CardTitle>
        <CardDescription>Total funds currently in your account.</CardDescription>
      </CardHeader>
      <CardContent className={"mt-auto"}>
        <p className="text-2xl font-bold">{formatToSEK(balance)}</p>
      </CardContent>
    </Card>
  );
}
