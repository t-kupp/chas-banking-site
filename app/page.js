import { ThemeToggle } from "@/components/Header/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center justify-center gap-8 px-4 lg:max-w-7xl lg:px-8">
      {/* Hero Section  */}
      <section className="flex h-full w-full max-w-2xl flex-col items-center justify-center p-8 text-center lg:py-64">
        <h1 className="text-4xl font-bold sm:text-5xl">
          Big Stacks Bank – Where Your Money Gets Taller
        </h1>
        <p className="text-muted-foreground mt-4 text-lg opacity-90">
          Banking should be simple, secure, and profitable. At Big Stacks Bank, your money works
          harder—so you don’t have to.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Button variant={"default"} size={"lg"}>
            Login
          </Button>
          <Button variant={"outline"} size={"lg"}>
            Create Account
          </Button>
        </div>
      </section>

      {/* Article Section  */}

      <div className="grid max-w-5xl grid-cols-1 rounded-xl border lg:grid-cols-2">
        <section className="flex w-full flex-col items-center justify-center p-8">
          <h1 className="text-3xl font-bold sm:text-4xl">
            How to Build a Budget That Actually Works
          </h1>
          <p className="text-muted-foreground mt-4 text-base opacity-90">
            Creating a budget can feel overwhelming, but it doesn’t have to be. Discover
            easy-to-follow steps to build a budget that works for you, and how to stick to it
            without feeling restricted.
          </p>

          <Button variant={"outline"} className={"mt-6"} size={"lg"}>
            Find out more
          </Button>
        </section>
        <Image
          width={1000}
          height={400}
          src={"/hero-1.png"}
          className="h-full w-full rounded-tr-xl rounded-br-xl object-cover"
          alt="Image of a dollar bill roll."
        />
      </div>
    </div>
  );
}
