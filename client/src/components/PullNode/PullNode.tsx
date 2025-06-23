import type { FC } from "react"
import type { Pull } from "../api/Pull"
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/User";
import { queryClient } from "../api/QueryClient";
import { Loader } from "../loader/Loader";
import { PullView } from "../PullView/PullView";
import "./PullNode.css"

interface PullNodeProps {
    pull: Pull
}

export const PullNode: FC<PullNodeProps> = ({pull}) => {
    
    const fetchUser = useQuery({
        queryFn: () => getUser(pull.authorId),
        queryKey: ["users","pull"],
    },queryClient);

    return (
        <div className="pull-node">
            {
                (()=>{
                    switch(fetchUser.status){
                        case "pending":
                            return <Loader amount={3} />
                        case "success":
                            return <div className="pull-node__user">
                                <span className="pull-node__user__user">@{fetchUser.data.username}</span>
                                <a className="pull-node__user__tg" href={`t.me/${fetchUser.data.telegram}`} target="_blank">{`t.me/${fetchUser.data.telegram}`}</a>
                            </div>
                        case "error":
                            return <span className="error-msg">Author fetch error</span>
                    }
                })()
            }
            <PullView title={pull.title} text={pull.text} createdAt={pull.createdAt}/>
        </div>
    );
}