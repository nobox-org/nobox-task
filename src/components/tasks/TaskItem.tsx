import { ITask } from "@/types"
import Link from "next/link";
import TimeAgo from "../TimeAgo";
import { updateTask } from "@/utils/task.utils";



const TaskItem = ({task, onUpdate}: {task: ITask, onUpdate:(doc:ITask)=>void}) => {

    return (
        <article>
            <h2>{task.task}</h2>

            <p className="postCredit">

                <label htmlFor={`check-${task.id}`}>
                    <input
                        type="checkbox"
                        name={`check-${task.id}`}
                        id={`check-${task.id}`}
                        // checked={task.completed}
                        onChange={(e)=>updateTask({...task, completed: e.target.checked})}
                    />

                    <span>Completed</span>
                </label>
                {/* <PostAuthor userId={task.userId as string} /> */}
                <TimeAgo timestamp={task.created_at as string} />
            </p>

      </article>
    )
}

export default TaskItem;
