import { auth } from "@/auth";
import NewVerificationForm from "@/components/auth/new-verification-form";
import { redirect } from "next/navigation";
import { Suspense } from "react";


const NewVerificationPage = async () => {
  // const session = await auth();

  // if (session) redirect("/");
  return ( 
    <>
      <Suspense>
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
            <NewVerificationForm />
    </div>
    </div>
        </Suspense>
    </>
   );
}
 
export default NewVerificationPage;