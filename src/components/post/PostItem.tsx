import { IPost } from "@/types"
import Link from "next/link";
import PostAuthor from "./PostAuthor";
import TimeAgo from "../TimeAgo";
import Reactions from "./Reactions";



const PostItem = ({post}: {post: IPost}) => {
    
    return (
        <article>
            <h2>{post.title}</h2>

            <p className='excerpt'>{post.body.substring(0, 75)}</p>

            <p className="postCredit">
                <Link href={`post/${post.id}`}>View Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
                <br />
                <Reactions post={post} />
            </p>

      </article>
    )
}

export default PostItem;
