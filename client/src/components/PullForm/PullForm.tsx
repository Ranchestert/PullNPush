import type { ReactElement } from "react";
import { FormField } from "../FormField/FormField";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../Button/Button";
import { useMutation } from "@tanstack/react-query";
import { createPull } from "../api/Pull";
import { queryClient } from "../api/QueryClient";
import "./PullForm.css"

const FormInputSchema = z.object({
    title: z.string().min(5,"Title is minimum 5 digits.").max(32,"Title is maximum 32 digits."),
    text: z.string().min(10,"Text is minimum 10 digits").max(512, "Text is maximum 512 digits.")
});
type FormInputType = z.infer<typeof FormInputSchema>

export const PullForm = (): ReactElement => {
    const {register,reset,handleSubmit,formState:{errors}} = useForm<FormInputType>({
        resolver: zodResolver(FormInputSchema)
    });
    const pullCreateMutation = useMutation({
        mutationFn: ({title,text}:FormInputType)=>createPull(title,text),
        onSuccess: ()=>{
            reset();
            queryClient.invalidateQueries({queryKey:["get","posts"]})
        }
    },queryClient);

    return (
        <form className="pull-form" onSubmit={handleSubmit((item)=>{
            pullCreateMutation.mutate(item);
        })}>
            <FormField label="title" errorMessage={errors.title?.message}>
                <input type="text" {...register("title")} />
            </FormField>
            <FormField label="text" errorMessage={errors.text?.message}>
                <textarea {...register("text")} />
            </FormField>
            <Button type="submit" kind="primary" isLoading={pullCreateMutation.isPending}>Create pull</Button>
        </form>
    )
}