"use client";

import * as z from "zod";
import { useForm } from "react-hook-form"
import { CardWrapper } from "@/components/auth/CardWrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import { login } from "@/lib/actions/login";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { SyncLoader } from "react-spinners";


function LoginForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with different provider!"
        : "";
        
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
        email: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {

        login(values);
        setError("");
        setSuccess("");
        
        startTransition(() => {
         
        login(values)
            .then((data) => {
            if (data?.error) {
                form.reset();
                setError(data.error);
            } else {
                setSuccess("A magic link has been sent your email!")
            }
            })
            .catch(() => setError("Something went wrong"));
        });
    };
  return (
    <CardWrapper
        headerTitle="Welcome Back"
        headerLabel="Enter your email to sign in to your account"
        backButtonLabel="Don't have an account? Sign Up"
        backButtonHref="/sign-up"
        showSocial
    >
        
       <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-6">
            <div className="space-y-4">
                <FormField 
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel className="sr-only" htmlFor="email">Email</FormLabel>
                            <FormControl>
                                <Input 
                                    {...field}
                                    disabled={isPending}
                                    placeholder="name@example.com"
                                    type="email"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            {isPending && (
                <div className="flex items-center w-full justify-center">
                          <SyncLoader color="purple" />
                </div>
            )}
            <FormError message={error || urlError}/>
            <FormSuccess message={success}/>
            
            <Button
                disabled={isPending}
                type="submit"
                className={cn(buttonVariants())}
            >
                Sign In with Email
            </Button>
        </form>
        <div className="relative space-y-4">
            <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
                Or continue with
            </span>
            </div>
        </div>
       </Form>

    </CardWrapper>
  )
}

export default LoginForm