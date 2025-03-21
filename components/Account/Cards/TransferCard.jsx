import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

export default function TransferCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transfer</CardTitle>
        <CardDescription>Send money in just a few clicks.</CardDescription>
      </CardHeader>
      {/* <CardContent className={"flex gap-4"}>
        <div className="relative flex items-center">
          <p className="text-muted-foreground absolute left-3">$</p>
          <Input className={"pl-7"} type={"number"} />
        </div>
        <Button variant={"outline"}>
          <ArrowRight />
        </Button>
      </CardContent> */}
    </Card>
  );
}
