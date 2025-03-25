import { useLogin } from "@/context/loginContext";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function LogOutButton() {
  const { setIsLoggedIn } = useLogin();
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("session");
    setIsLoggedIn(false);
    router.push("/");
    return;
  }

  return (
    <Dialog>
      <DialogTrigger asChild className="h-9">
        <Button variant={"outline"} size={"icon"} className={"hover:bg-destructive"}>
          <LogOut />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log Out</DialogTitle>
          <DialogDescription>
            Are you sure you want to log out? You will need to sign in again to access your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button onClick={handleLogout} variant={"destructive"}>
            Yes, Log Out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
