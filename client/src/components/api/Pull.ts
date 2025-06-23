import { z } from "zod";
import { validateResponse } from "./validateResponse";

const PullSchema = z.object({
    id: z.string(),
    title: z.string(),
    text: z.string(),
    authorId: z.string(),
    createdAt: z.number()
});
export type Pull = z.infer<typeof PullSchema>

const PullListSchema = z.array(PullSchema);
type PullList = z.infer<typeof PullListSchema>

export async function getPulls(): Promise<PullList> {
    return fetch("api/pulls").then(validateResponse).then(response=>response.json()).then(data=>PullListSchema.parse(data));
}

export async function createPull(title: string, text: string): Promise<void> {
    return fetch("api/pulls",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({title,text}),
    }).then(validateResponse).then(()=>undefined);
}