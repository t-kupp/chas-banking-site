import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useState } from "react";
import { BASE_URL } from "@/lib/baseUrl";

export default function DepositCard({ updateBalance }) {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);

  function handleKeyDown(e) {
    if (e.key == "." || e.key == "+" || e.key == "-") e.preventDefault();
    if (e.target.value.length >= 6) setAmount(e.target.value.slice(0, 6));
  }

  function handleChange(e) {
    setAmount(e.target.value);
  }

  async function handleClick() {
    if (amount.trim() == "" || amount.trim() == 0) return;

    setIsLoading(true);

    const session = JSON.parse(localStorage.getItem("session"));

    const res = await fetch(`${BASE_URL}/api/account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "depositFunds", amount: parseInt(amount), session: session }),
    });

    const answer = await res.json();

    if (res.status == 200) {
      setTimeout(() => {
        updateBalance(answer.newBalance);
        setAmount("");
        console.log(answer);
        setIsLoading(false);
        setShowCheckmark(true);

        setTimeout(() => {
          setShowCheckmark(false);
        }, 2000);
      }, 1000);
    } else {
      console.log(answer);

      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deposit</CardTitle>
        <CardDescription>Securely deposit funds into your account.</CardDescription>
      </CardHeader>
      <CardContent className={"flex gap-4"}>
        <div className="relative flex items-center">
          <p className="text-muted-foreground absolute left-3">$</p>
          <Input
            min="0"
            value={amount}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            className={"pl-7"}
            type={"number"}
          />
        </div>
        <Button
          onClick={handleClick}
          className={
            showCheckmark &&
            "bg-green-600 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-700"
          }
          variant={"default"}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : showCheckmark ? (
            <Check />
          ) : (
            <ArrowRight />
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
