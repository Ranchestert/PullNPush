import type { FC } from "react"
import type { Pull } from "../api/Pull"
import { PullNode } from "../PullNode/PullNode"
import "./PullListView.css"

interface PullListViewProps {
    pullList: Pull[]
}

export const PullListView: FC<PullListViewProps> = ({pullList}) => {
    return (
        <ul className="pull-list">
            {pullList.map(item=>(<li key={item.id}>
                <PullNode pull={item} />
            </li>))}
        </ul>
    )
}