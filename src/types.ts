import {ReactNode} from "react"

export interface ReactProps {
    children: ReactNode
}

export type ITask = {
    task:string,
    completed: boolean,
    userId: string,
    id?:string,
    createAt?: string,
    updateAt?: string,
}

export type IUser = {
    id?:string,
    username: string,
    email:string,
    password: string,
}

export interface ITaskContext {
    loading: boolean,
    tasks: ITask[],
    error?: string | null
}

export interface IAuthContext {
    user: IUser | null,
    logout: ()=>void
    login: (data:any)=>Promise<void>
}


export type ITaskReducerAction = {
    type: string,
    payload: Record<string, any>
}

export enum TaskActions {
    LOADING='loading',
    LOADED='loaded',
    ERROR='error',
    UPDATE='update',
}