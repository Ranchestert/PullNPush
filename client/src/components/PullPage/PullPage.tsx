import { useQuery } from "@tanstack/react-query";
import type { ReactElement } from "react";
import { getPulls } from "../api/Pull";
import { queryClient } from "../api/QueryClient";
import { PullForm } from "../PullForm/PullForm";
import { Loader } from "../loader/Loader";
import { PullListView } from "../PullListView/PullListView";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import "./PullPage.css"

export const PullPage = ():ReactElement => {
    const postsQuery = useQuery({
        queryFn: ()=>getPulls(),
        queryKey: ["get","posts"],
    },queryClient);

    return (
        <div className="pull-page">
            <div className="pull-page__form">
                <PullForm />
            </div>
            <div className="pull-page__list">
                {
                    (()=>{
                        switch(postsQuery.status){
                            case "pending":
                                return <Loader amount={3} />
                            case "success":
                                return <PullListView pullList={postsQuery.data} />
                            case "error":
                                return <span>Error fetching posts</span>
                        }
                    })()
                }
            </div>
            <div className="pull-page__logout">
                <LogoutButton />
            </div>
        </div>
    )
}