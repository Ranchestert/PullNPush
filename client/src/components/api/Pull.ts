import { z } from "zod";
import { validateResponse } from "./validateResponse";

const PullSchema = z.object({
    title: z.string(),
    text: z.string(),
    authorId: z.string(),
    createdAt: z.number()
});

const PullListSchema = z.array(PullSchema);
type PullList = z.infer<typeof PullListSchema>

export async function getPulls(): Promise<PullList> {
    return fetch("api/pulls").then(validateResponse).then(response=>response.json()).then(data=>PullListSchema.parse(data));
}