import { createContext, useState } from "react";

export const PostContext = createContext(null)

function Post ({children}){

    const [postDetials,setPostDetails] = useState()
    return (
        <PostContext.Provider  value={{postDetials,setPostDetails}}>
            {children}
        </PostContext.Provider>
    )
}

export default Post