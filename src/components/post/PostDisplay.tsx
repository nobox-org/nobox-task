'use client'
import { usePost } from "@/hooks";
import { useParams } from "next/navigation";
import PostItem from "./PostItem";

const PostDisplay = () => {
    // retrieve postId
    const { postId } = useParams();

    const post = usePost(postId as string);

    
    if(!post){
        return(
            <section>
                <h2>Page not found!</h2>
            </section>
        )
    }


    return <PostItem post={post}/>
}

export default PostDisplay