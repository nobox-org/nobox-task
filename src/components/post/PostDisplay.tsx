'use client'
import { usePost } from "@/hooks";
import { useParams } from "next/navigation";
import PostItem from "./PostItem";

const PostDisplay = () => {
    // retrieve postId
    const { postId } = useParams();

    const {post, loading, error} = usePost(postId as string);


    let content;
    
    if (loading){
        content = <p>Loading...</p>;

    }else if(error){
        content = <p>{error}</p>
    }
    else if (!post) {
        content = <h2>Page not found!</h2>;
    }
    
    else{
        content = <PostItem post={post}/>;
    }


    return (
        <section>
            { content }
        </section>
    )
}

export default PostDisplay