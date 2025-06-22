import type { FC, ReactNode } from "react"
import "./FormField.css"

interface FormFieldProps {
    label: string,
    children: ReactNode,
    errorMessage?: string
}

export const FormField: FC<FormFieldProps> = ({label,children,errorMessage}) => {
    return (
        <label className="form-field">
            <span className="form-field__label">{label}</span>
            {children}
            {errorMessage && <span className="form-field__error-message">{errorMessage}</span>}
        </label>
    )
}