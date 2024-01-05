import { useTaskContext } from "@/context/TaskContext";
import { ITask, ITaskContext } from "@/types";
import { fetchTask } from "@/utils/task.utils";
import { useEffect, useState } from "react";


export const useTasks = (): ITaskContext =>{
    const {loading, tasks, error} = useTaskContext();
    
    return {loading, tasks, error}
}

export const useTask = (taskId:string) =>{
    const [task, setTask] = useState<ITask | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(()=>{
        (()=>{
            fetchTask(taskId)
            .then((res)=>{
                setTask(()=>res);
            })
            .catch((err)=>{
                setError(()=>err);
            })
            .finally(()=>{
                setLoading(false);
            })
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return {loading, task, error};
}