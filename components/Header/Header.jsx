import Link from "next/link";
import { Button } from "../ui/button";
import Logo from "./Logo";
import { Search, MapPin, Phone, Lock } from "lucide-react";
import { SelectMenu } from "./SelectMenu";

export default function Header() {
  return (
    <div className="bg-muted sticky top-0 z-50 flex w-full items-center justify-between border-b px-8 py-4">
      <div className="flex items-center">
        <Link href={"/"}>
          <Logo />
        </Link>
        {/* <SelectMenu /> */}
        <Button variant={"link"}>Personal</Button>
        <Button variant={"link"}>Business</Button>
      </div>
      <div className="flex items-center">
        <Button variant={"link"}>
          <Phone /> Contact Us
        </Button>
        <Button variant={"link"}>
          <MapPin /> Find Big Stacks
        </Button>
        <Button variant={"link"}>
          <Search /> Search
        </Button>

        <Link href={"/login"}>
          <Button className={"ml-4"}>
            <Lock /> Login
          </Button>
        </Link>
      </div>
    </div>
  );
}
