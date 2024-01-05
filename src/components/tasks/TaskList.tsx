'use client'
import { useTasks } from "@/hooks";
import TaskItem from "./TaskItem";



const TaskList = () => {

    const {loading, tasks, error} = useTasks();

    let content;
    
    if (loading){
        content = <p>Loading...</p>;

    }else if(error){
        content = <p>{error}</p>
    }
    else if (tasks.length < 1) {
        content = <p>No Task</p>;
    }
    
    else{
        content = tasks.map((item) => <TaskItem key={item.id} task={item} />);
    }

    return (
        <section>
            {content}
        </section>
    )
}

export default TaskList;