//#6673ff

import type { FC } from "react"
import type { Pull } from "../api/Pull"
import { useQuery } from "@tanstack/react-query";
import { getUser, type User } from "../api/User";
import { queryClient } from "../api/QueryClient";
import { Loader } from "../loader/Loader";

interface PullNodeProps {
    pull: Pull
}

export const PullNode: FC<PullNodeProps> = ({pull}) => {
    
    const fetchUser = useQuery({
        queryFn: () => getUser(pull.authorId),
        queryKey: ["users","pull"],
    },queryClient);

    function handleClick(user: User): void{
         
    }

    return (
        <div className="pull-node">
            {
                (()=>{
                    switch(fetchUser.status){
                        case "pending":
                            return <Loader amount={3} />
                        case "success":
                            return <div className="pull-node__user">
                                <span className="pull-node__user__user" onMouseEnter={()=>handleClick(fetchUser.data)}>@{fetchUser.data.username}</span>
                            </div>
                        case "error":
                            return <span className="error-msg">Author fetch error</span>
                    }
                })()
            }
        </div>
    );
}