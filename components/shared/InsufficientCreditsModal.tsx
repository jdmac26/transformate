"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const InsufficientCreditsModal = () => {
  const router = useRouter();

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-[30px] leading-[140%] text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">Insufficient Credits</p>
            <AlertDialogCancel
              className="border-0 p-0 hover:bg-transparent"
              onClick={() => router.push("/profile")}
            >
              <Image
                src="/assets/icons/close.svg"
                alt="credit coins"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </AlertDialogCancel>
          </div>

          <Image
            src="/assets/images/stacked-coins.png"
            alt="credit coins"
            width={462}
            height={122}
            className="bg-white"
          />

          <AlertDialogTitle className="font-bold text-[24px] leading-[120%] text-black dark:text-white">
            Oops.... Looks like you&#39;ve run out of free credits!
          </AlertDialogTitle>

          <AlertDialogDescription className="font-normal text-[16px] leading-[140%] py-3 text-black dark:text-white">
            No worries, though - you can keep enjoying our services by grabbing
            more credits.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="py-4 px-6 flex-center gap-3 rounded-[4px] font-semibold text-[16px] leading-[140%] focus-visible:ring-offset-0 focus-visible:ring-transparent w-full bg-purple-100 dark:bg-black dark:text-white text-black"
            onClick={() => router.push("/profile")}
          >
            No, Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="py-4 px-6 flex-center gap-3 rounded-[4px] font-semibold text-[16px] leading-[140%] focus-visible:ring-offset-0 focus-visible:ring-transparent w-full bg-purple-gradient  bg-cover"
            onClick={() => router.push("/credits")}
          >
            Yes, Proceed
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};