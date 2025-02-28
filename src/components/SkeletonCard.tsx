import { Card, Skeleton } from "@heroui/react";

export default function SkeletonCard() {
  return (
    <Card className="border-none bg-[#131313] text-white shadow-sm p-4">
      <div className="flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-4 items-center">
        {/* Image Skeleton */}
        <div className="relative flex justify-center w-full md:col-span-3">
          <Skeleton className="rounded-lg">
            <div className="h-[150px] w-[150px] rounded-lg bg-default-300" />
          </Skeleton>
        </div>

        {/* Content Skeleton */}
        <div className="flex flex-col w-full md:col-span-9">
          <div className="flex flex-col gap-1">
            {/* Title and Price Skeleton */}
            <div className="flex justify-between items-center">
              <Skeleton className="w-1/3 rounded-lg">
                <div className="h-4 w-full rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="w-1/4 rounded-lg">
                <div className="h-4 w-full rounded-lg bg-default-200" />
              </Skeleton>
            </div>

            {/* Category Skeleton */}
            <Skeleton className="w-2/5 rounded-lg mt-2">
              <div className="h-3 w-full rounded-lg bg-default-200" />
            </Skeleton>

            {/* Description Skeleton */}
            <Skeleton className="w-full rounded-lg mt-2">
              <div className="h-3 w-full rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-3/4 rounded-lg mt-1">
              <div className="h-3 w-full rounded-lg bg-default-200" />
            </Skeleton>

            {/* Stock and Button Skeleton */}
            <div className="flex justify-end items-center gap-4 mt-4">
              <Skeleton className="w-[100px] rounded-lg">
                <div className="h-3 w-full rounded-lg bg-default-300" />
              </Skeleton>
              <Skeleton className="w-[80px] h-[32px] rounded-md">
                <div className="h-[32px] w-full rounded-md bg-default-300" />
              </Skeleton>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
