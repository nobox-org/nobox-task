'use client'
import { usePosts } from "@/hooks";

import PostItem from "./PostItem";



const PostList = () => {

    const {loading, posts, error} = usePosts();

    let content;
    
    if (loading){
        content = <p>Loading...</p>;

    }else if(error){
        content = <p>{error}</p>
    }
    else if (posts.length < 1) {
        content = <p>No Post</p>;
    }
    
    else{
        content = posts.map((postItem) => <PostItem key={postItem.id} post={postItem} />);
    }

    return (
        <section>
            {content}
        </section>
    )
}

export default PostList;