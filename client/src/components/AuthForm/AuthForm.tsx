import { useState, type ReactElement } from "react"
import { LoginForm } from "../LoginForm/LoginForm";
import { RegistrationForm } from "../RegistrationForm/RegistrationForm";
import "./AuthForm.css"

type optionsType = "login" | "registration"

export const AuthForm = (): ReactElement => {
    const [FormType, setFormType] = useState<optionsType>("login");

    return (
        <div className="authForm">
            {FormType==="login"?<LoginForm />:<RegistrationForm />}
            <div className="authForm__toggle">
                <span className="authForm__toggle__text">{FormType==="login"?"Still have no account?":"Have an account?"}</span>
                <a className="authForm__toggle__anchor" href="#" onClick={(event)=>{
                    event.preventDefault();

                    if(FormType==="login"){
                        setFormType("registration");
                    }else{
                        setFormType("login");
                    }
                }}>{FormType==="login"?"Sign up":"Log in"}</a>
            </div>
        </div>
    );
}