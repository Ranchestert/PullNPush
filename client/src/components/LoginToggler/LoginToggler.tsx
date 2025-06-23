import { useQuery } from "@tanstack/react-query";
import type { ReactElement } from "react";
import { getMe } from "../api/User";
import { queryClient } from "../api/QueryClient";
import { Loader } from "../loader/Loader";
import { AuthForm } from "../AuthForm/AuthForm";
import { PullPage } from "../PullPage/PullPage";

export const LoginToggler = (): ReactElement => {
    const LoginQuery = useQuery({
        queryFn: () => getMe(),
        queryKey: ["users", "me"],
        retry: false,
    },queryClient)
    
    switch(LoginQuery.status){
        case "pending":
            return <Loader amount={3} />
        case "error":
            return <AuthForm />
        case "success":
            return <PullPage />
    }
}