"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import Logo from "./Logo";
import { Search, MapPin, Phone, Lock, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "../ui/separator";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-muted sticky top-0 z-50 border-b px-4 py-4 lg:px-8">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <Link href={"/"}>
            <Logo />
          </Link>
          <Button variant={"link"} className={"hidden lg:block"}>
            Personal
          </Button>
          <Button variant={"link"} className={"hidden lg:block"}>
            Business
          </Button>
        </div>

        {/* Desktop navbar */}
        <div className="hidden items-center lg:flex">
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

        {/* Mobile navbar */}
        <div className="flex items-center lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger onClick={() => setIsOpen(true)}>
              <Menu />
            </SheetTrigger>
            <SheetContent className={"flex w-fit flex-col items-start p-4"}>
              <SheetHeader>
                <SheetTitle />
              </SheetHeader>
              <Link href={"/login"} className="w-full">
                <Button className={"w-full"} onClick={() => setIsOpen(false)}>
                  <Lock /> Login
                </Button>
              </Link>
              <Separator />
              <Button variant={"link"} onClick={() => setIsOpen(false)}>
                <Phone /> Contact Us
              </Button>
              <Button variant={"link"} onClick={() => setIsOpen(false)}>
                <MapPin /> Find Big Stacks
              </Button>
              <Button variant={"link"} onClick={() => setIsOpen(false)}>
                <Search /> Search
              </Button>
              <Separator />
              <Button variant={"link"} onClick={() => setIsOpen(false)}>
                Personal
              </Button>
              <Button variant={"link"} onClick={() => setIsOpen(false)}>
                Business
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
