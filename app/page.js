import ArticleCard from "@/components/ArticleCard";
import { ThemeToggle } from "@/components/Header/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center justify-center px-4 py-16 md:max-w-2xl lg:max-w-5xl lg:px-8">
      {/* Hero Section  */}
      {/* <section className="flex h-full w-full max-w-2xl flex-col items-center justify-center p-8 text-center lg:py-32">
        <h1 className="text-4xl font-bold sm:text-5xl">
          Big Stacks Bank – Where Your Money Gets Taller
        </h1>
        <p className="text-muted-foreground mt-4 text-lg opacity-90">
          Banking should be simple, secure, and profitable. At Big Stacks Bank, your money works
          harder—so you don’t have to.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Button variant={"default"} size={"lg"}>
            Get started <ArrowRight />
          </Button>
        </div>
      </section> */}

      {/* Article Section  */}

      <section className="mb-16 grid max-w-5xl grid-cols-1 gap-8 lg:my-16 lg:grid-cols-2">
        <div className="flex w-full flex-col items-center justify-center">
          <h1 className="text-3xl font-bold sm:text-4xl">Smart Banking, Bigger Stacks!</h1>
          <p className="text-muted-foreground mt-4 text-base opacity-90">
            Welcome to Big Stacks—where managing money is simple, secure, and maybe even a little
            fun. Whether you're saving for a rainy day or planning your next big move, we’ve got the
            tools to help you stack up success. Why settle for loose change when you could have
            stacks?
          </p>

          <Link href={"/login"} className={"mt-6 self-start"}>
            <Button variant={"default"} size={"lg"}>
              Start stacking!
            </Button>
          </Link>
        </div>
        <Image
          width={1000}
          height={400}
          src={"/hero-1.png"}
          className="h-full w-full rounded-lg object-cover"
          alt="Image of a dollar bill roll."
        />
      </section>

      <section className="mb-16 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Button className={"w-full"} variant={"secondary"} size={"lg"}>
          Market Trends <ArrowRight className="ml-auto" />
        </Button>
        <Button className={"w-full"} variant={"secondary"} size={"lg"}>
          Investment News <ArrowRight className="ml-auto" />
        </Button>
        <Button className={"w-full"} variant={"secondary"} size={"lg"}>
          Earnings Reports <ArrowRight className="ml-auto" />
        </Button>
        <Button className={"w-full"} variant={"secondary"} size={"lg"}>
          Mortgage <ArrowRight className="ml-auto" />
        </Button>
        <Button className={"w-full"} variant={"secondary"} size={"lg"}>
          Get Mobile BankID <ArrowRight className="ml-auto" />
        </Button>
      </section>

      <section className="mb-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <ArticleCard
          title={"How to improve your money mindset"}
          imageSource={"/article-1.png"}
          linkText={"Make better choices"}
        />
        <ArticleCard
          title={"Should I pay down debt, save or invest?"}
          imageSource={"/article-2.png"}
          linkText={"Help me decide"}
        />
        <ArticleCard
          title={"Top 5 reasons to refinance"}
          imageSource={"/article-3.png"}
          linkText={"Pros and cons"}
        />
      </section>
    </div>
  );
}
