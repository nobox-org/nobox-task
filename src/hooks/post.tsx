import { usePostContext } from "@/context/PostContext"
import { IPost, IPostContext } from "@/types"


export const usePosts = (): IPostContext =>{
    const {loading, posts, error} = usePostContext();
    return {loading, posts, error}
}

export const usePost = ()=>{
    return {}
}