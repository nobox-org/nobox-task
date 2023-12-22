'use client';
import { IPost, IUser } from "@/types";
import { sendPost } from "@/utils/posts";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PostForm = ({edit}:{edit?:boolean}) => {

    // TODO: load post data if edit is true
    let initialData: IPost | undefined;

    const router = useRouter();

    const [saving, setSaving] = useState(false);


    const [postError, setPostError] = useState<string | null>(null);


    const formik = useFormik({
        initialValues: {
            title: initialData?.title || '',
            content: initialData?.content || '',
            userId: initialData?.userId || '',
        },
        onSubmit: values => {
            console.log(JSON.stringify(values, null, 2));

            const data:IPost = {
                title: values.title,
                content: values.content,
                userId: values.userId
            }


            if (postError) setPostError(null);

            setSaving(true);

            sendPost(data)
            .then((res)=>{
                router.push(`/post/${res.id}`);
                // formik.resetForm()
            })
            .catch((err)=>{
                console.error(err);
                setPostError(()=>"Could not save post")
                setSaving(false)
            })
        },
    });


    // TODO: Implement users query when user is implemented
    const users:IUser[] = [];

    const usersOptions = users.map(user=>(
        <option key={user.id} value={user.id}>
            {user.username}
        </option>
    ))


    return (
        <>
            <h2>
                { edit ? "Edit Post":
                "Add a New Post"}
            </h2>


            <span>{postError}</span>
            <span>{saving && "Saving..."}</span>

            <br/>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                />

                <label htmlFor="postAuthor">Author:</label>
                <select
                    id="author"
                    onChange={formik.handleChange}
                    value={formik.values.userId}
                >
                    <option value=""></option>
                    {usersOptions}
                </select>

                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="content"
                    name="content"
                    onChange={formik.handleChange}
                    value={formik.values.content}
                />
                <button
                    type="submit"
                    // disabled={!canSave}
                >
                    Save Post
                </button>
            </form>
        </>
    )
}


export default PostForm;