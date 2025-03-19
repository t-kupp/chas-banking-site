import { Search, User } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ThemeToggle } from "../Header/ThemeToggle";

export default function DashboardHeader({ user }) {
  return (
    <div className="col-span-3 flex w-full justify-between gap-4">
      <div>
        <h1 className="mb-1 text-2xl font-medium">Account</h1>
        <p className="text-muted-foreground text-sm font-light">
          Welcome back, {capitalize(user.username)}!
        </p>
      </div>
      <div className="flex gap-2">
        <div className="relative">
          <Input placeholder="Search" className={"pr-8"} />
          <Search size={20} className="text-muted-foreground absolute top-2 right-2" />
        </div>
        <ThemeToggle />
        <Button variant={"outline"} size={"icon"}>
          <User className="!h-6 !w-6" />
        </Button>
      </div>
    </div>
  );
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
