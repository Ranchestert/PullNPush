import type { ReactElement } from "react";
import { Button } from "../Button/Button";
import { useMutation } from "@tanstack/react-query";
import { logOutUser } from "../api/User";
import { queryClient } from "../api/QueryClient";

export const LogoutButton = (): ReactElement => {
    const logoutMutate = useMutation({
        mutationFn: ()=>logOutUser()
    },queryClient);

    const handleClick = () => {
        logoutMutate.mutate();
    }

    return(
        <Button kind="secondary" type="button" isLoading={logoutMutate.isPending} onClick={handleClick}>Logout</Button>
    )
}