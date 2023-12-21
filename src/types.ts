import {ReactNode} from "react"

export interface ReactProps {
    children: ReactNode
}

export type IPost = {
    title:string,
    body: string,
    id:string,
    date: string,
    userId: string,
    reaction: {
        thumbsUp: number,
        wow: number,
        heart: number,
        rocket: number,
        coffee: number,
        [k:string]: number // to dynamically index keys
    }
}

export type IUser = {
    id:string,
    name: string,
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