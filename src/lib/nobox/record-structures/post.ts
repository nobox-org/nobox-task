import { Space } from "nobox-client";
import { createRowSchema } from "../config";

interface Post {
    title:string,
    content: string,
    userId: string,
    reaction: string
}

export const PostStructure: Space<Post> = {
    space: "post",
    description: "Record space for posts",
    structure: {
        title: {
            description: "Post title",
            type: String,
            required: true
        },
        content: {
            description: "Post content",
            required: true,
            type: String
        },
        userId: {
            description: "Post author id",
            required: false,
            type: String,
        },
        reaction: {
            description: "Post reaction",
            required: true,
            type: String,
            defaultValue: JSON.stringify({
                thumbsUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
                coffee: 0,
            })
        }
    }
}

export const PostModel = createRowSchema<Post>(PostStructure);
