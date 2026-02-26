import { buttonVariants } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Id } from "@/convex/_generated/dataModel";
import { Separator } from "@/components/ui/separator";
import { CommentSection } from "@/components/web/CommentSection";
import { Metadata } from "next";
import { PostPresence } from "@/components/web/Postprecence";
import { redirect } from "next/navigation";


interface PostIdRouteProps{
    params: Promise<{
        postId: Id<"posts">;
    }>;
}

export async function generateMetadata({
    params,
}: PostIdRouteProps) : Promise<Metadata> {
    const {postId} = await params;

    const post = await fetchQuery(api.posts.getPostById, { postId: postId });
if (!post) {
    return {
        title:"Post not found",
    };
}
    return {
        title: post.title,
        description: post.body,
    };
}

export default async function PostIdRoute({params } : PostIdRouteProps)
{
    const { postId }  = await params;
    
    const token = await getToken();

    const [post, preloadedComments, userId] = await Promise.all([
    await fetchQuery(api.posts.getPostById, { postId: postId }),
    await preloadQuery(
        api.comments.getCommentsByPostId, 
        {
    postId: postId,
        }),
        await fetchQuery(api.presence.getUserId, {}, { token }),
    ]);

    // if(!userId){
    //     return redirect("/auth/login");
    // }

    if (!post) {
        return (
            <div className="max-3xl mx-auto py-8 px-4">
                <h1 className="text-6xl font-extrabold text-red-500 p-20">
                    Post not found
                </h1>
            </div>
        );
    }

    return (
    <div className="max-3xl mx-auto py-8 px-4 
    animate-in fade-in duration-500 relative">
        <Link className={buttonVariants({variant: 'outline', className: 'mb-4 '})} 
        href="/blog">
            <ArrowLeft className="size-4"/>
            back to blog
        </Link>

        <div className="relative w-full h-[400] mb-8 rounded-xl
        overflow-hidden shadow-sm">
            <Image src={
                post.imageUrl ?? 
                ""} 
                alt={post.title}
                fill
                className="object-cover hover:scale-105 
                transition-transform duration-300"
            />

            <div className="space-y-4 flex flex-col">
                <h1 className="text-4xl font-bold tracking-tight text-foreground">
                    {post.title}
                </h1>

            <div className = "flex items-center gap-2">
                <p className= "text-sm text-muted-foreground">Posted on: {" "}
                    {new Date(post._creationTime).toLocaleDateString("ko-KR")}    
                </p>
                {userId &&<PostPresence roomId={post._id} userId={userId}/>}   

            </div>
        </div>    

            <Separator className="my-8"/>

            <p className="text-lg leading-relaxed   
            text-muted-foreground line-clamp-3">{post.body}</p>
            <Separator className="my-8"/>

            <CommentSection preloadedComments={preloadedComments} />
        </div>
    </div>  
    );
}

async function getToken(): Promise<string | undefined> {
    return undefined;
}
