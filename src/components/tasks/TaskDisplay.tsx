'use client'
import { useParams } from "next/navigation";
import { useTask } from "@/hooks";
import TaskItem from "./TaskItem";
import { useTaskContext } from "@/context/TaskContext";
import { ITask, TaskActions } from "@/types";
import { updateTask } from "@/utils/task.utils";

const TaskDisplay = () => {
    // retrieve postId
    const { taskId } = useParams();

    const {task, loading, error} = useTask(taskId as string);

    const {dispatchTask} = useTaskContext();


    let content;
    
    if (loading){
        content = <p>Loading...</p>;

    }else if(error){
        content = <p>{error}</p>
    }
    else if (!task) {
        content = <h2>Task not found!</h2>;
    }
    
    else{
        content = <TaskItem task={task} onUpdate={async(doc:ITask)=>{

            
            const _doc = await updateTask(doc);

            dispatchTask({
                type: TaskActions.UPDATE,
                payload: _doc
            })
        }}/>;
    }


    return (
        <section>
            { content }
        </section>
    )
}

export default TaskDisplay