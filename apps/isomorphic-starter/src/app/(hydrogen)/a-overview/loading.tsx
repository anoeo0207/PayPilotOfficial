import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return <div className="space-y-6">
            <Skeleton className="relative h-64 grid grid-cols-1 gap-4 p-4 bg-gray-200 2xl:bg-gray-400 rounded-lg shadow-m w-full"/>
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6"> 
                <Skeleton className="w-full h-[150px] rounded-lg bg-gray-200 2xl:bg-gray-400 animate-pulse"/>
                <Skeleton className="w-full h-[150px] rounded-lg bg-gray-200 2xl:bg-gray-400 animate-pulse"/>
                <Skeleton className="w-full h-[150px] rounded-lg bg-gray-200 2xl:bg-gray-400 animate-pulse"/>
                <Skeleton className="w-full h-[150px] rounded-lg bg-gray-200 2xl:bg-gray-400 animate-pulse"/>
            </div>
            <Skeleton className="h-96 w-full bg-gray-200 rounded-lg 2xl:bg-gray-400 animate-pulse" />
            <Skeleton className="h-48 w-full bg-gray-200 rounded-lg 2xl:bg-gray-400 animate-pulse" />
        </div>;
  }