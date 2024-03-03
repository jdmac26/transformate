import { auth } from "@/auth";
import LoginForm from "@/components/auth/LoginForm";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const LoginPage = async () => {
    return (
        <>
            <Suspense>
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
                    <div className="mx-auto mb-60 flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
                <LoginForm />
            </div>
        </div>
                </Suspense>
        </>
    );
}

export default LoginPage;