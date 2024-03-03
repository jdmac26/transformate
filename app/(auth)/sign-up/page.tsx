import { auth } from "@/auth";
import { RegisterForm } from "@/components/auth/RegisterForm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const RegisterPage = async () => {
    // const session = await auth();

    // if (session) redirect("/");
    return (
        <>
        <Suspense>
        <div className="container flex h-screen w-screen flex-col items-center justify-center ">
            <div className="mx-auto mb-60 flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
                <RegisterForm />
                <p className="px-8 text-center text-sm text-muted-foreground">
                    By clicking continue, you agree to our{" "}
                    <Link
                        href="/terms"
                        className="hover:text-brand underline underline-offset-4"
                    >
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                        href="/privacy"
                        className="hover:text-brand underline underline-offset-4"
                    >
                        Privacy Policy
                    </Link>
                    .
                </p>
            </div>
        </div>
        </Suspense>
        </>
    );
}

export default RegisterPage;