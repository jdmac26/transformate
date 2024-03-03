import AuthHeader from "@/components/auth/authHeader"
interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
  <div className="min-h-screen">
    <div className="absolute inset-x-0 top-20 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[50deg] bg-gradient-to-tr from-purple-500 to-cyan-500 opacity-20 sm:left-[calc(70%-30rem)] sm:w-[72.1875rem]">
        </div>
      </div>
    <AuthHeader />
      {children}
  </div>
)}