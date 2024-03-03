import MobileNav from '@/components/shared/MobileNav'
import Sidebar from '@/components/shared/Sidebar'
import { Toaster } from '@/components/ui/toaster'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row ">
      <Sidebar />
      <MobileNav />
      <div className="absolute inset-x-0 top-20 -z-10 transform-gpu overflow-hidden  blur-3xl" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[50deg] bg-gradient-to-tr from-purple-500 to-cyan-500 opacity-20 sm:left-[calc(70%-30rem)] sm:w-[72.1875rem]" >
        </div>
      </div>
      <div className="mt-16 flex-1 overflow-auto py-8 lg:mt-0 lg:max-h-screen lg:py-10 ">
        <div className="max-w-5xl mx-auto px-5 md:px-10 w-full font-normal text-[16px] leading-[140%] ">
          {children}
        </div>
      </div>
      <Toaster />
      
    </div>
  )
}

export default Layout