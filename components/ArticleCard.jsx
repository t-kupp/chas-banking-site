import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ArticleCard({ title, imageSource, linkText }) {
  return (
    <Link href={"/"}>
      <div className="group flex h-full max-w-xs flex-col rounded-xl border">
        <Image
          className="max-h-64 rounded-tl-xl rounded-tr-xl object-cover"
          src={imageSource}
          alt={"Image"}
          width={400}
          height={300}
        />
        <div className="flex h-full flex-col p-4">
          <h1 className="font-semibold">{title}</h1>
          <Button
            variant={"link"}
            className={
              "text-foreground mt-auto gap-1 self-start !p-0 text-base font-normal group-hover:underline"
            }
          >
            {linkText} <ArrowRight className="transition-[margin] duration-200 group-hover:ml-1" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
