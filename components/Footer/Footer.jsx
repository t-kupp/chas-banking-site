import { Button } from "../ui/button";

export default function Footer() {
  return (
    <div className="bg-muted mt-auto border-t py-8">
      <div className="mx-auto flex max-w-5xl">
        <div className="grid-cols grid w-full grid-cols-2 sm:grid-cols-3">
          <Button variant={"link"}>Support</Button>
          <Button variant={"link"}>Security</Button>
          <Button variant={"link"}>Financial Education</Button>
          <Button variant={"link"}>Site map</Button>
          <Button variant={"link"}>Careers</Button>
          <Button variant={"link"}>Accessibility</Button>
          <Button variant={"link"}>Online tracking</Button>
          <Button variant={"link"}>Advertisement</Button>
          <Button variant={"link"}>Privacy</Button>
        </div>
      </div>
    </div>
  );
}
