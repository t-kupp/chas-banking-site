"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

export default function RegisterForm({ handleSubmit, response }) {
  const [loginLoading, setLoginLoading] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (response) {
      setLoginLoading(false);

      if (response.status === 201) {
        alert("Account successfully created!");
        router.push("/login");
      }

      if (response.status === 400) {
        setShowErrorMessage(true);
      }
    }
  }, [response]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values) {
    setLoginLoading(true);

    handleSubmit({ ...values });
  }

  return (
    <>
      <div className="mb-6 w-full text-center">
        <h1 className="mb-2 text-3xl font-medium">Welcome to Big Stacks!</h1>
        <p className="text-muted-foreground">Sign up and start stacking big today.</p>
      </div>
      <div className="mb-2 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      onFocus={() => setShowErrorMessage(false)}
                      placeholder="Enter your username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  {showErrorMessage && (
                    <p className="text-sm text-red-500 dark:text-red-900">
                      Username already taken, please choose a different name.
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              className={"w-full"}
              onClick={form.handleSubmit((values) => onSubmit(values))}
            >
              {loginLoading ? (
                <span className="animate-spin">
                  <LoaderCircle />
                </span>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </Form>
      </div>

      <Link href={"/register"} className="mb-4 w-full"></Link>

      <p className="text-muted-foreground px-8 text-center text-sm">
        By continuing, you agree to our{" "}
        <span className="hover:text-primary cursor-pointer underline underline-offset-4" href="/">
          Terms of Service
        </span>{" "}
        and{" "}
        <span className="hover:text-primary cursor-pointer underline underline-offset-4" href="/">
          Privacy Policy
        </span>
        .
      </p>
    </>
  );
}
