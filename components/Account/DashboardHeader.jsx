import { Search, User } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ThemeToggle } from "../Header/ThemeToggle";
import capitalize from "@/lib/capitalize";

export default function DashboardHeader({ user }) {
  return (
    <div className="col-span-3 flex w-full justify-between gap-4">
      <div>
        <h1 className="mb-1 text-2xl font-medium">Overview</h1>
        <p className="text-muted-foreground text-sm">Welcome back, {capitalize(user.username)}!</p>
      </div>
      <div className="flex gap-2">
        <div className="relative hidden sm:flex">
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
