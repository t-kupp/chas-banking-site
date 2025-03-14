import Link from "next/link";
import { Button } from "../ui/button";
import Logo from "./Logo";
import { Search, MapPin, Phone } from "lucide-react";
import { SelectMenu } from "./SelectMenu";

export default function Header() {
  return (
    <div className="bg-background sticky top-0 flex w-full items-center justify-between border-b px-8 py-4">
      <div className="flex items-center gap-4">
        <Link href={"/"}>
          <Logo />
        </Link>
        <SelectMenu />
      </div>
      <div className="flex items-center gap-2">
        <Button variant={"link"}>
          <Phone /> Contact Us
        </Button>
        <Button variant={"link"}>
          <MapPin /> Find Big Stacks
        </Button>
        <Button variant={"link"}>
          <Search /> Search
        </Button>
        {/* <ThemeToggle /> */}
        <Button>Login</Button>
      </div>
    </div>
  );
}
