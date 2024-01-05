'use client';
import { ITask, ITaskContext, ITaskReducerAction, ReactProps, TaskActions } from '@/types';
import { fetchTasks } from '@/utils/task.utils';
import {createContext, useContext, useEffect, useReducer} from 'react';


interface TaskStateProps {
    loading: boolean,
    tasks: ITask[],
    error?: string | null
}

interface TaskContextProps extends TaskStateProps {

    dispatchTask: (action: ITaskReducerAction)=>any
}



const initialState = {
    loading: false,
    tasks: [],
    error: null,
}





const TaskContext = createContext<TaskContextProps>({
    ...initialState,
    dispatchTask(action: any){}
})

const postReducer = (state: any, action:any) => {
    switch(action.type) {
        case TaskActions.LOADING:
            return {
                ...state,
                loading: true
            }
        case TaskActions.LOADED:
            return {
                ...state,
                loading: false,
                tasks: action.payload
            }
        case TaskActions.ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case TaskActions.UPDATE:
            return {
                ...state,
                loading: false,
                tasks: state.tasks.map((item: ITask)=>{
                    if (item.id === action.payload.id) {
                        return action.payload
                    }

                    return item;
                })
            }
        default:
            throw new Error("Unknown action type" + action.type)
    }
}


export const useTaskContext = ()=>useContext(TaskContext);
export const TaskContextProvider = ({children}:ReactProps) => {

    const [taskstate, dispatch] = useReducer(postReducer, initialState);


    useEffect(()=>{
        (()=>{
            dispatch({
                type: TaskActions.LOADING,
            })


            fetchTasks()
            .then((tasks: ITask[])=>{
                dispatch({
                    type: TaskActions.LOADED,
                    payload: tasks
                })
            })
            .catch((error)=>{
                console.error(error);
                dispatch({
                    type: TaskActions.ERROR,
                    payload: "Could not load tasks"
                })
            })
        })()
    }, [])


    const context: TaskContextProps = {
        ...taskstate,
        dispatchTask: (action: ITaskReducerAction)=>dispatch(action)
    }
    
    return (
        <TaskContext.Provider value={context}>
            {children}
        </TaskContext.Provider>
    )
}
