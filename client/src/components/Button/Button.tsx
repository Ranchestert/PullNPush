import type { FC, HTMLAttributes } from "react"
import { Loader } from "../loader/Loader"
import "./Button.css";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean,
    isDisabled?: boolean,
    kind?: "secondary" | "primary",
    type?: "submit" | "reset" | "button"
}

export const Button: FC<ButtonProps> = ({
    isLoading,
    isDisabled=isLoading,
    kind="primary",
    type,
    children,
    ...props
}) => {
    return (
        <button
            disabled={isDisabled}
            type={type}
            data-kind={kind}
            className="button"
            {...props}
        >
            {isLoading?(<Loader amount={4} />):children}
        </button>
    )
}