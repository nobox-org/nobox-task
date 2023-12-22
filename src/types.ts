import {ReactNode} from "react"

export interface ReactProps {
    children: ReactNode
}

export type IPost = {
    title:string,
    content: string,
    userId?: string,
    id?:string,
    date?: string,
    reaction?: {
        thumbsUp: number,
        wow: number,
        heart: number,
        rocket: number,
        coffee: number,
        [k:string]: number // to dynamically index keys
    }
}

export type IUser = {
    id?:string,
    username: string,
    email:string,
    password: string,
}

export interface IPostContext {
    loading: boolean,
    posts: IPost[],
    error?: string | null
}


export type IPostReducerAction = {
    type: string,
    payload: Record<string, any>
}

export enum PostActions {
    LOADING='loading',
    LOADED='loaded',
    ERROR='error',
}