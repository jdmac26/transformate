import { Collection } from "@/components/shared/Collection"
import { navLinks } from "@/constants"
import { getAllImages } from "@/lib/actions/image.actions"
import Image from "next/image"
import Link from "next/link"

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';

  const images = await getAllImages({ page, searchQuery})

  return (
    <>
      <section className="sm:flex justify-center items-center hidden h-72 flex-col gap-4 rounded-[30px] p-10 border-2 border-purple-200/20 shadow-2xl shadow-purple-200/20  dark:bg-black dark:bg-opacity-40 bg-opacity-80">
        <h1 className="text-[40px] font-semibold sm:text-[44px] leading-[120%] sm:leading-[56px] max-w-[600px] flex-wrap text-center dark:text-white">
          Unleash Your Creative Vision with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">Transformate</span>
        </h1>
        <ul className="flex justify-center items-center w-full gap-20">
          {navLinks.slice(2, 6).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex justify-center items-center flex-col gap-2"
            >
              <li className="flex justify-center items-center w-fit rounded-full bg-black bg-opacity-10 dark:bg-white  p-4">
                <Image src={link.icon} alt="image" width={24} height={24} className="brightness-0"/>
              </li>
              <p className="font-semibold text-[14px] leading-[120%] text-center dark:text-white">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>

      <section className="sm:mt-12">
          <Collection
            hasSearch={true}
            images={images?.data}
            totalPages ={images?.totalPage}
            page={page}
          />
      </section>
    </>
  )
}

export default Home