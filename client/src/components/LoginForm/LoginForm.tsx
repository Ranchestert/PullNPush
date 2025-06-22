import type { ReactElement } from "react";
import "./LoginForm.css";
import { FormField } from "../FormField/FormField";
import { Button } from "../Button/Button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/User";
import { queryClient } from "../api/QueryClient";

const FormInputSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8,"Password is minimum 8 digits.").max(32, "Password is maximum 32 digits."),
});
type FormInputType = z.infer<typeof FormInputSchema>

export const LoginForm = (): ReactElement => {
    const {register, handleSubmit, formState:{errors}} = useForm<FormInputType>({
        resolver: zodResolver(FormInputSchema)
    });

    const LoginMutation = useMutation({
        mutationFn: ({email,password}: FormInputType) => loginUser(email,password),
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey: ["users","me"]})
        }
    },queryClient)

    return (
        <form className="form" onSubmit={handleSubmit((data)=>{
            LoginMutation.mutate(data)
        })}>
            <FormField label="Email" errorMessage={errors.email?.message}>
                <input type="text" {...register("email")} />
            </FormField>
            <FormField label="Password" errorMessage={errors.password?.message}>
                <input type="password" {...register("password")} />
            </FormField>
            <Button type="submit" kind="primary" isLoading={LoginMutation.isPending}>Login</Button>
        </form>
    );
}