
import Image from "next/image";
import { redirect } from "next/navigation";

import { Collection } from "@/components/shared/Collection";
import Header from "@/components/shared/Header";
import { getUserImages } from "@/lib/actions/image.actions";
import { auth } from "@/auth";
import { getUserById } from "@/lib/actions/user.actions";
import UserAvatar from "@/components/auth/UserAvatar";

const Profile = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const session = await auth();

  if (!session) redirect("/sign-in");

  const user = await getUserById(session?.user?.id!);
  const images = await getUserImages({ page, userId: session?.user?.id! });

  return (
    <>
      {/* <UserAvatar name={session.user?.name} image={session.user?.image} /> */}
      <Header title="Profile" subtitle={`Welcome, ${session.user?.name}!`}/>

      <section className="mt-5 flex flex-col gap-5 sm:flex-row md:mt-8 md:gap-10">
        <div className="w-full rounded-[16px] border-2 border-purple-200/20  p-5 shadow-lg shadow-purple-200/10 md:px-6 md:py-8">
          <p className="font-medium text-[14px] leading-[120%] md:font-medium md:text-[16px] md:leading-[140%]">CREDITS AVAILABLE</p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/coins.svg"
              alt="coins"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="text-[30px] font-bold md:text-[36px] leading-[110%] text-dark-600">{user.creditBalance}</h2>
          </div>
        </div>

        <div className="w-full rounded-[16px] border-2 border-purple-200/20  p-5 shadow-lg shadow-purple-200/10 md:px-6 md:py-8">
          <p className="font-medium text-[14px] leading-[120%] md:font-medium md:text-[16px] md:leading-[140%]">IMAGE MANIPULATION DONE</p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/photo.svg"
              alt="coins"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="text-[30px] font-bold md:text-[36px] leading-[110%] text-dark-600">{images?.data.length}</h2>
          </div>
        </div>
      </section>

      <section className="mt-8 md:mt-14">
        <Collection
          images={images?.data}
          totalPages={images?.totalPages}
          page={page}
        />
      </section>
    </>
  );
};

export default Profile;