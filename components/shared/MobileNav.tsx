"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { navLinks } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"
import { logout } from "@/lib/actions/logout"
import { Session } from "next-auth"
import { useSession } from "next-auth/react"
import { Separator } from "../ui/separator"
import DarkModeToggle from "../DarkModeToggle"
import React from "react"
import { LuLogOut } from "react-icons/lu"

function MobileNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);

   return (
    <header 
      className="flex justify-between items-center fixed h-16 w-full bg-white dark:bg-black border-b-2 p-5 lg:hidden"
      >
      <Link href="/" className="flex items-center gap-2 py-2">
         <Image src="/space-man.png" alt="logo" width={30} height={30} />
         <span className="text-[25px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">TRANSFORMATE</span>
      </Link>

      <nav className="flex gap-2">
        {session ? (
          <>
            <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <Image 
                src="/assets/icons/menu.svg"
                alt="menu"
                width={32}
                height={32}
                className="cursor-pointer"
              />
            </SheetTrigger>
               <SheetContent className="focus:ring-0 focus-visible:ring-transparent focus:ring-offset-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-none lg:hidden pt-0">
              <>
                   <div className="flex items-center gap-2 py-2">
                <Image src="/space-man.png" alt="logo" width={30} height={30} />
         <span className="text-[25px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">TRANSFORMATE</span></div>
                   <Separator/>
                   
              <ul className="mt-2 flex w-full flex-col items-start gap-2">
              {navLinks.map((link) => {
                const isActive = link.route === pathname
                const isDisabled = link.disabled === "true"
                return (
                  <li 
                    className={`flex-flex justify-center items-center font-semibold text-[16px] leading-[140%] w-full whitespace-nowrap rounded-[4px]  transition-all hover:shadow-inner group border-2  shadow-purple-200/20 ${isActive ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white dark:text-black' : 'border text-gray-700'
                      }`}
                    key={link.route}
                    >
                    <Link className={`font-semibold text-[16px] leading-[140%] flex size-full gap-4 p-4 cursor-pointer${isDisabled ? 'pointer-events-none' : ''}`} href={link.route}>
                      <Image 
                        src={link.icon}
                        alt="logo"
                        width={24}
                        height={24}
                        className={`${isActive && 'brightness-200 dark:brightness-0'}`}
                      />
                      {isDisabled ? 'Coming Soon' : link.label}
                    </Link>
                  </li>
                )
              })}
                     <Separator />
                     <li className="size-full cursor-pointer  flex justify-center items-center font-semibold text-[16px] leading-[140%] w-full whitespace-nowrap ">

                       <Button variant={"outline"} className='w-full mr-2 flex justify-center items-center  font-semibold text-[16px] leading-[140%] focus-visible:ring-offset-0 focus-visible:ring-transparent gap-4 p-4' onClick={() => logout()}><LuLogOut /> Sign Out</Button>
                       <DarkModeToggle />
                     </li>
              </ul>
              </>
            </SheetContent>
          </Sheet>
          </>
        ) : (
          <>
            <Button asChild className="py-4 px-8 flex-center gap-3  focus-visible:ring-offset-0 focus-visible::ring-transparent bg-cover bg-gradient-to-r from-purple-500 to-cyan-500 text-white dark:text-black rounded-[4px] items-center font-semibold text-[16px] leading-[140%] w-full transition-all hover:shadow-inner shadow-sm shadow-purple-200/20">
              <Link href="/sign-in">Login</Link>
            </Button>
            <div><DarkModeToggle /></div>
             </>
        )}
      </nav>
    </header>
  )
}

export default MobileNav