import { redirect } from "next/navigation";

import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getImageById } from "@/lib/actions/image.actions";
import { auth } from "@/auth";
import { getUserById } from "@/lib/actions/user.actions";

const Page = async ({ params: { id } }: SearchParamProps) => {
  const session = await auth();

  if (!session) redirect("/sign-in");

  const user = await getUserById(session.user?.id!);
  const image = await getImageById(id);

  const transformation =
    transformationTypes[image.transformationType as TransformationTypeKey];

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />

      <section className="mt-10">
        <TransformationForm
          action="Update"
          userId={user?.id as string}
          type={image.transformationType as TransformationTypeKey}
          creditBalance={user?.creditBalance as number}
          config={image.config}
          data={image}
        />
      </section>
    </>
  );
};

export default Page;