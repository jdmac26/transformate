import Image from "next/image"
import DarkModeToggle from "@/components/DarkModeToggle"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AspectRatio } from "@/components/ui/aspect-ratio"


async function authHeader() {

    return (
        <header className="sticky top-0 z-50  ">
            <nav className="flex flex-col sm:flex-row items-center p-5 pl-2 max-w-7xl mx-auto min-w-1">
                <Link href="/" className="overflow-hidden">
                    <div className="flex items-center w-72 h-14">
                        <AspectRatio
                            ratio={16 / 9}
                            className="flex items-center justify-center">
                    <Image src="/space-man.png" alt="logo" width={30} height={30} />
                    <span className="text-[25px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">TRANSFORMATE</span>
                        </AspectRatio>
                    </div>
                </Link>

                <div className="flex-1 flex items-center justify-end space-x-4">
                    <Button className="px-8 flex-center gap-3  focus-visible:ring-offset-0 focus-visible::ring-transparent bg-cover bg-gradient-to-r from-purple-500 to-cyan-500 text-white dark:text-black rounded-[4px] items-center font-semibold text-[16px] leading-[140%] transition-all hover:shadow-inner shadow-sm shadow-purple-200/20">
                        <Link href="/sign-in">Login</Link>
                    </Button>

                    <DarkModeToggle />

                </div>
            </nav>

        </header>
    )
}

export default authHeader