import type { FC } from "react"
import type { User } from "../api/User"
import "./UserContactsView.css";

interface UserViewProps {
    user: User
}

export const UserContactsView: FC<UserViewProps> = ({user}) => {
    const {username,email,phone,telegram} = user;

    return (
        <div className="userView">
            <p>
                {`@${username}&#13;${email}&#13;+${phone}&#13;@${telegram}`}
            </p>
        </div>
    )
}