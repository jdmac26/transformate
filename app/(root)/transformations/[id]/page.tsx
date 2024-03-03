import Image from "next/image";
import Link from "next/link";

import Header from "@/components/shared/Header";
import TransformedImage from "@/components/shared/TransformedImage";
import { Button } from "@/components/ui/button";
import { getImageById } from "@/lib/actions/image.actions";
import { getImageSize } from "@/lib/utils";
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";
import { useSession } from "next-auth/react";
import { auth } from "@/auth";


const ImageDetails = async ({ params: { id } }: SearchParamProps) => {
  const session = await auth();

  const image = await getImageById(id);

  return (
    <>
      <Header title={image.title} />

      <section className="mt-5 flex flex-wrap gap-4">
        <div className="font-medium text-[14px] leading-[120%] md:font-medium md:text-[16px] md:leading-[140%] flex gap-2">
          <p className="text-dark-600">Transformation:</p>
          <p className=" capitalize text-purple-400">
            {image.transformationType}
          </p>
        </div>

        {image.prompt && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="font-medium text-[14px] leading-[120%] md:font-medium md:text-[16px] md:leading-[140%] flex gap-2 ">
              <p className="text-dark-600">Prompt:</p>
              <p className=" capitalize text-purple-400">{image.prompt}</p>
            </div>
          </>
        )}

        {image.color && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="font-medium text-[14px] leading-[120%] md:font-medium md:text-[16px] md:leading-[140%] flex gap-2">
              <p className="text-dark-600">Color:</p>
              <p className=" capitalize text-purple-400">{image.color}</p>
            </div>
          </>
        )}

        {image.aspectRatio && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="font-medium text-[14px] leading-[120%] md:font-medium md:text-[16px] md:leading-[140%] flex gap-2">
              <p className="text-dark-600">Aspect Ratio:</p>
              <p className=" capitalize text-purple-400">{image.aspectRatio}</p>
            </div>
          </>
        )}
      </section>

      <section className="mt-10 border-t border-dark-400/15">
        <div className="grid h-fit min-h-[200px] grid-cols-1 gap-5 py-8 md:grid-cols-2">
          {/* MEDIA UPLOADER */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-[30px] leading-[140%] ">Original</h3>

            <Image
              width={getImageSize(image.transformationType, image, "width")}
              height={getImageSize(image.transformationType, image, "height")}
              src={image.secureURL}
              alt="image"
              className="h-fit min-h-72 w-full rounded-[10px] border border-dashed bg-purple-100/20 object-cover p-2"
            />
          </div>

          {/* TRANSFORMED IMAGE */}
          <TransformedImage
            image={image}
            type={image.transformationType}
            title={image.title}
            isTransforming={false}
            transformationConfig={image.config}
            hasDownload={true}
          />
        </div>
       
        { session?.user?.id === image.author._id && (
          <div className="mt-4 space-y-4">
            <Button asChild type="button" className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white dark:text-black bg-cover rounded-[4px] py-4 px-6 font-semibold text-[16px] leading-[140%] h-[50px] w-full md:h-[54px] capitalize">
              <Link href={`/transformations/${image._id}/update`}>
                Update Image
              </Link>
            </Button>

            <DeleteConfirmation imageId={image._id} />
          </div>
        )}
      </section>
    </>
  );
};

export default ImageDetails;