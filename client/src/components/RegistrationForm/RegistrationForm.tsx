import { useState, type ReactElement } from "react";
import { FormField } from "../FormField/FormField";
import { Button } from "../Button/Button";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/User";
import { queryClient } from "../api/QueryClient";
import "./RegistrationForm.css"

const FormInputSchema = z.object({
    username: z.string().min(3,"Username is minimum 3 digits.").max(16,"Username is maximum 16 digits."),
    password: z.string().min(8,"Password is minimum 8 digits.").max(32, "Password is maximum 32 digits."),
    email: z.string().email("Invalid email format"),
    phone: z.string().regex(/^[0-9]{10}$/,"Enter your number with this format: XXXXXXXXXX."),
    telegram: z.string()
});
type FormInputType = z.infer<typeof FormInputSchema>

export const RegistrationForm = (): ReactElement => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormInputType>({
        resolver: zodResolver(FormInputSchema),
    });

    const [success, setSuccess] = useState<boolean>(false);

    const registerMutation = useMutation({
        mutationFn: ({username,password,email,phone,telegram}: FormInputType) => registerUser(username,email,password,phone,telegram),
        onSuccess: ()=>{
            setSuccess(true);
        }
    }, queryClient);

    return (
        <form className="form" onSubmit={handleSubmit((item)=>{
            registerMutation.mutate(item);
        })}>
            <FormField label="Username" errorMessage={errors.username?.message}>
                <input type="text" {...register("username")}/>
            </FormField>
            <FormField label="Password" errorMessage={errors.password?.message}>
                <input type="password" {...register("password")} />
            </FormField>
            <FormField label="Email" errorMessage={errors.email?.message}>
                <input type="text" {...register("email")} />
            </FormField>
            <FormField label="Phone" errorMessage={errors.phone?.message}>
                <input type="text" {...register("phone")} />
            </FormField>
            <FormField label="Telegram" errorMessage={errors.telegram?.message}>
                <input type="text" {...register("telegram")} />
            </FormField>

            {success && <span>Registration succeed. Proceed to login below.</span>}

            <Button type="submit" kind="primary" isLoading={registerMutation.isPending}>Sign up</Button>
        </form>
    )
}