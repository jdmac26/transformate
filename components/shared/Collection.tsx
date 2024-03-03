"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";

import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { transformationTypes } from "@/constants";
import { IImage } from "@/lib/database/models/image.model";
import { formUrlQuery } from "@/lib/utils";

import { Button } from "../ui/button";

import { Search } from "./Search";
import { Suspense } from "react";

export const Collection = ({
  hasSearch = false,
  images,
  totalPages = 1,
  page,
}: {
  images: IImage[];
  totalPages?: number;
  page: number;
  hasSearch?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // PAGINATION HANDLER
  const onPageChange = (action: string) => {
    const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      searchParams: searchParams.toString(),
      key: "page",
      value: pageValue,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      <div className="md:flex md:justify-between md:items-center mb-6 flex flex-col gap-5 md:flex-row">
        <h2 className="text-[30px] font-bold md:text-[36px] leading-[110%]">Recent Edits</h2>
        {hasSearch && <Suspense><Search /></Suspense>}
      </div>

      {images.length > 0 ? (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {images.map((image) => (
            <Card image={image} key={image._id} />
          ))}
         </ul>
      ) : (
      <div className="flex justify-center items-center h-60 w-full rounded-[10px] border-2 border-purple-200/20 shadow-2xl shadow-purple-200/20  dark:bg-black dark:bg-opacity-40 bg-opacity-90">
        <p className="font-semibold text-[30px] leading-[140%]">Empty List</p>
        </div>
       )}

      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent className="flex w-full">
            <Button
              disabled={Number(page) <= 1}
              className="py-4 px-6 flex justify-center items-center gap-3 rounded-full font-semibold text-[16px] leading-[140%] focus-visible:ring-offset-0 focus-visible:ring-transparent w-32 bg-gradient-to-r from-purple-500 to-cyan-500 bg-cover text-white"
              onClick={() => onPageChange("prev")}
            >
              <PaginationPrevious className="hover:bg-transparent hover:text-white" />
            </Button>

            <p className="flex justify-center items-center font-medium text-[16px] leading-[140%] w-fit flex-1">
              {page} / {totalPages}
            </p>

            <Button
              className="py-4 px-6 flex justify-center items-center gap-3 rounded-full font-semibold text-[16px] leading-[140%] focus-visible:ring-offset-0 focus-visible:ring-transparent w-32 bg-gradient-to-r from-purple-500 to-cyan-500 bg-cover text-black dark:text-white"
              onClick={() => onPageChange("next")}
              disabled={Number(page) >= totalPages}
            >
              <PaginationNext className="hover:bg-transparent hover:text-white" />
            </Button>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

const Card = ({ image }: { image: IImage }) => {

  
  return (
    <li className="flex flex-1 flex-col gap-2 rounded-[8px] border-2 border-purple-300/20 p-2 shadow-xl shadow-purple-200/10 transition-all hover:shadow-purple-200/40 ">
      <Link href={`/transformations/${image._id}`} className="cursor-pointer">
        <CldImage
          src={image.publicId}
          alt={image.title}
          width={image.width}
          height={image.height}
          {...image.config}
          loading="lazy"
          className="h-56 w-full rounded-[4px] object-cover"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        />
      
        <div className="flex justify-between items-center rounded-sm bg-opacity-20 p-1">
          <p className="font-semibold text-[20px] leading-[140%] mr-3 line-clamp-1 dark:text-white text-black">
            {image.title}
          </p>
          <Image
            src={`/assets/icons/${
              transformationTypes[
                image.transformationType as TransformationTypeKey
              ].icon
            }`}
            alt={image.title}
            width={28}
            height={28}
          />
        </div>
        </Link>
    </li>
  );
};