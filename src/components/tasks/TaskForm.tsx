'use client';
import { ITask, IUser } from "@/types";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TaskDisplay from "./TaskDisplay";
import { sendTask } from "@/utils/task.utils";

const TaskForm = ({edit}:{edit?:boolean}) => {

    // TODO: Implement Post edit information still using this same template
    // * Load current post data, store it in initialData variable
    // *    and tweak the onSubmit function to edit instead of send post
    let initialData: ITask | undefined;

    const router = useRouter();

    const [saving, setSaving] = useState(false);


    const [taskError, setTaskError] = useState<string | null>(null);


    const formik = useFormik({
        initialValues: {
            task: initialData?.task || '',
        },
        onSubmit: values => {            

            const data:ITask = {
                task: values.task,
                completed: false,
                userId: ''
            }


            if (taskError) setTaskError(null);

            setSaving(true);

            sendTask(data)
            .then((res)=>{
                router.push(`/tasks/${res.id}`);
                // formik.resetForm()
            })
            .catch((err)=>{
                console.error(err);
                setTaskError(()=>"Could not save post")
                setSaving(false)
            })
        },
    });



    /* 
        TODO: Implement users query when user is implemented
        * After implementing User and User authentication
        * Create custom hook to load user details by id
        * use the hook to load author's information here
        * display users username in this option template
    */
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


            <span>{taskError}</span>
            <span>{saving && "Saving..."}</span>

            <br/>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="postTitle">Task:</label>
                <input
                    type="text"
                    id="task"
                    name="task"
                    onChange={formik.handleChange}
                    value={formik.values.task}
                />

                {/* <label htmlFor="postAuthor">Author:</label>
                <select
                    id="author"
                    onChange={formik.handleChange}
                    value={formik.values.userId}
                >
                    <option value=""></option>
                    {usersOptions}
                </select> */}

                <button
                    type="submit"
                    // disabled={!canSave}
                >
                    Assign Task
                </button>
            </form>
        </>
    )
}


export default TaskForm;