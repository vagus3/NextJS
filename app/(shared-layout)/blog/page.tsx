
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import Link from "next/dist/client/link";
import { buttonVariants } from "@/components/ui/button";
import { fetchQuery } from "convex/nextjs";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Metadata } from "next";
import { connection } from "next/server";
import { cacheLife, cacheTag } from "next/cache";

export const dynamic = "force-static";
export const revalidate = 30;

export const metadata: Metadata = {
    title: "Read our lastest articles and insights",
    description: "Read our lastest articles and insights",
    category: "blog",
    authors: [{name: "Jan marshal"}]
    };

export default function BlogPage(){
    return (
        <div className="p-12">
            <div className="text-center pb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                    Our Blog</h1>
                <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
                    insights. thought
                </p>
            </div>

            <Suspense
                fallback={<SkeletonLoadingUi />}>   
                <LoadBlogList />
            </Suspense>

        </div>
    );
}

async function LoadBlogList() {
    // await connection();
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // "use cache";
    // cacheLife("hours");
    // cacheTag("blog");

    await connection();
    const data = await fetchQuery(api.posts.getPosts);
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data?.map((post) => (
                <Card key={post._id} className="pt-0">
                    <div className="relative h-48 w-full overflow-hidden">
                        <Image 
                        src={
                            post.imageUrl ?? 
                            "data:image/jpeg;base64,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"
                        }
                        alt="image"
                        fill    
                        className="rounded-t-lg object-cover"                        
                        />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                    <p>{post.body}</p>

                    <CardContent>
                        <Link href={`/blog/${post._id}`} className="text-blue-500 hover:underline">
                            <h1 className="text-2xl font-bold hover:text-primary">{post.title}</h1>
                        </Link>
                        <p className="text-muted-foreground line-clamp-3">{post.body}</p>
                    </CardContent>
                    <CardFooter>
                        <Link className={buttonVariants({className: 'w-full',})} 
                        href={`/blog/${post._id}`}>
                            Read More
                        </Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

function SkeletonLoadingUi() {
    return (
        <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-4">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="flex flex-col space-y-3">
                        <Skeleton className="h-48 w-full rounded-xl" />
                        <div className="space-y-2 flex flex-col">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        </div>
                    </div>
                    ))}
                </div>
    );
}
