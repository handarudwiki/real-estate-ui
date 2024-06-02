import { defer } from "react-router-dom"
import apiRequest from "./api_request"

export const singlePageLoader = async ({request, params})=>{
    const res = await apiRequest.get(`/posts/${params.id}`)
    return res.data.data
}

export const listPageLoader = async ({request, params})=>{
    const query = request.url.split("?")[1]
    const postsPromise = apiRequest.get("/posts?"+query)
    return defer({
        postResponse : postsPromise
    })
}

export const profileLoader = async({request, params})=>{
    const postPromise =  apiRequest.get("/users/profile")
    const chat =  await apiRequest.get("/chats")
    return defer({
         postResponse:postPromise,
        chatResponse:chat
    })
}