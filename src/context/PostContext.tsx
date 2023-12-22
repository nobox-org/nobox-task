'use client';
import { IPost, IPostContext, IPostReducerAction, PostActions, ReactProps } from '@/types';
import { fetchPosts } from '@/utils/posts';
import {createContext, useContext, useEffect, useReducer} from 'react';


const initialState:IPostContext = {
    loading: false,
    posts: [],
    error: null
}

const PostContext = createContext<IPostContext>(initialState)

const postReducer = (state: any, action:any) => {
    switch(action.type) {
        case PostActions.LOADING:
            return {
                ...state,
                loading: true
            }
        case PostActions.LOADED:
            return {
                ...state,
                loading: false,
                posts: action.payload
            }
        case PostActions.ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            throw new Error("Unknown action type" + action.type)
    }
}


export const usePostContext = ()=>useContext(PostContext);
export const PostContextProvider = ({children}:ReactProps) => {

    const [postState, dispatch] = useReducer(postReducer, initialState);


    useEffect(()=>{
        (()=>{
            dispatch({
                type: PostActions.LOADING,
            })


            fetchPosts()
            .then((posts: IPost[])=>{
                dispatch({
                    type: PostActions.LOADED,
                    payload: posts
                })
            })
            .catch((error)=>{
                console.error(error);
                dispatch({
                    type: PostActions.ERROR,
                    payload: "Could not load posts"
                })
            })
        })()
    }, [])


    const context = {
        ...postState,
        dispatchPost: (action: IPostReducerAction)=>dispatch(action)
    }
    
    return (
        <PostContext.Provider value={context}>
            {children}
        </PostContext.Provider>
    )
}
