"use client"

import { navLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import { Session } from 'next-auth'
import { logout } from '@/lib/actions/logout'
import { useSession } from 'next-auth/react'
import { Separator } from '../ui/separator'
import { LuLogOut } from "react-icons/lu";
import DarkModeToggle from '../DarkModeToggle'
import { getUserById } from '@/lib/actions/user.actions'

function Sidebar() {
// const Sidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
    
  return (
    <aside className={`max-h-screen w-72 p-5 shadow-sm shadow-purple-200/50 lg:flex dark:bg-black bg-white rounded-r-lg hidden dark:bg-opacity-80 bg-opacity-25`}>
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="flex items-flex justify-center items-center gap-4 ">
          <Image src="/space-man.png" alt="logo" width={30} height={30} />
          <span className="text-[25px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">TRANSFORMATE</span>
        </Link>
        <Separator />

        <nav className="h-full flex-col justify-between md:flex md:gap-4">
          {session ? (
            <>
              <ul className="hidden w-full flex-col items-start gap-2 md:flex">
              {navLinks.slice(0, 7).map((link) => {
                const isActive = link.route === pathname
                const isDisabled = link.disabled === "true"

                return (
                  <li key={link.route} className={`flex-flex justify-center items-center font-semibold text-[16px] leading-[140%] w-full whitespace-nowrap rounded-[4px]  transition-all hover:shadow-inner group border-2 shadow-sm shadow-purple-200/20 ${
                    isActive ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white dark:text-black' : 'border text-gray-700'
                  }`}>
                    <Link className={`font-semibold text-[16px] leading-[140%] flex size-full gap-4 p-4 ${isDisabled ? 'pointer-events-none' : ''}`} href={link.route}>
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
              </ul>


              <ul className="hidden w-full flex-col items-start gap-2 md:flex">
              {navLinks.slice(7).map((link) => {
                const isActive = link.route === pathname

                return (
                  <li key={link.route} className={`flex justify-center rounded-[4px] items-center font-semibold text-[16px] leading-[140%] w-full whitespace-nowrap transition-all hover:shadow-inner border-2  shadow-sm shadow-purple-200/20 ${
                    isActive ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white dark:text-black' : 'border text-gray-700'
                  }`}>
                    <Link className="font-semibold text-[16px] leading-[140%] flex size-full gap-4 p-4" href={link.route}>
                      <Image 
                        src={link.icon}
                        alt="logo"
                        width={24}
                        height={24}
                        className={`${isActive && 'brightness-200 dark:brightness-0'}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                )
              })}
              <Separator />
                <li className="size-full cursor-pointer  flex justify-center items-center font-semibold text-[16px] leading-[140%] w-full whitespace-nowrap ">
                  
                  <Button variant={"outline"} className='w-full mr-2 flex justify-center items-center  font-semibold text-[16px] leading-[140%] focus-visible:ring-offset-0 focus-visible:ring-transparent gap-2 p-2' onClick={() => logout()}><LuLogOut />Sign Out</Button>
                  <DarkModeToggle />
              </li>
            </ul>
            
            </>
          ) : (

              <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white dark:text-black flex justify-center rounded-[4px] items-center font-semibold text-[16px] leading-[140%] w-full whitespace-nowrap transition-all hover:shadow-inner shadow-sm shadow-purple-200/20">
              <Link href="/sign-in">Login</Link>
            </Button>
          )}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar