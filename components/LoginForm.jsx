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

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

export default function LoginForm({ handleSubmit, response }) {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (response) {
      if (response.status === 201) {
        setErrorMessage("");
        console.log("Account successfully created!\nTodo: Forwarding to /account");
      }

      if (response.status === 400) {
        setErrorMessage("User already exists. Please try a different username.");
        form.reset();
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

  function onSubmit(values, action) {
    handleSubmit({ ...values, action });
  }

  return (
    <>
      <div className="mb-6 w-full text-center">
        <h1 className="mb-2 text-3xl font-medium">Welcome!</h1>
        <p className="text-muted-foreground">Please sign into your account.</p>
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
                      onFocus={() => setErrorMessage("")}
                      placeholder="Enter your username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
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
              onClick={form.handleSubmit((values) => onSubmit(values, "login"))}
            >
              Sign In
            </Button>
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background text-muted-foreground px-2">Or continue with</span>
              </div>
            </div>
            <Button
              type="button"
              variant={"secondary"}
              className="w-full text-sm"
              onClick={form.handleSubmit((values) => onSubmit(values, "register"))}
            >
              Create an Account
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
