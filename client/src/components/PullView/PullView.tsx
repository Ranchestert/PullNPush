import type { FC } from "react"
import { formatDate } from "../../controllers/FormatDate"
import "./PullView.css"

interface PullViewProps{
    title: string,
    text: string,
    createdAt: number
}

export const PullView: FC<PullViewProps> = ({title,text,createdAt}) => {
    return (
        <div className="pull">
            <div className="pull__main">
                <label className="pull__main__title">{title}</label>
                <p className="pull__main__text">{text}</p>
            </div>
            <span className="pull__date">{formatDate(createdAt)}</span>
        </div>
    )
}