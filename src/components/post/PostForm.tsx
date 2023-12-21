'use client';
import { IPost, IUser } from "@/types";
import { useFormik } from "formik";

const PostForm = ({edit}:{edit?:boolean}) => {

    // TODO: load post data if edit is true
    let initialData: IPost | undefined;
    
    const formik = useFormik({
        initialValues: {
            title: initialData?.title || '',
            content: initialData?.body || '',
            userId: initialData?.userId || '',
        },
        onSubmit: values => {
            console.log(JSON.stringify(values, null, 2));

            // TODO: Implement submit form
            alert("Add user not yet implemented");

            formik.resetForm()
        },
    });


    // TODO: Implement users query when user is implemented
    const users:IUser[] = [];

    const usersOptions = users.map(user=>(
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))


    return (
        <>
            <h2>
                { edit ? "Edit Post":
                "Add a New Post"}
            </h2>

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