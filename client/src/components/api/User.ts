import { z } from "zod";
import { validateResponse } from "./validateResponse";

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  phone: z.string(),
  telegram: z.string()
});
export type User = z.infer<typeof UserSchema>;

export async function getMe(): Promise<User> {
  return fetch("api/users/me")
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => UserSchema.parse(data));
}

export async function loginUser(
  email: string,
  password: string
): Promise<void> {
  return fetch("api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then(validateResponse)
    .then(() => undefined);
}

export async function registerUser(
  username: string,
  email: string,
  password: string,
  phone: string,
  telegram: string
): Promise<void> {
  return fetch("api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
      phone,
      telegram,
    }),
  })
    .then(validateResponse)
    .then(() => undefined);
}

export async function getUser(id: string): Promise<User> {
  return fetch(`api/users/${id}`)
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => UserSchema.parse(data));
}

export async function logOutUser(): Promise<void> {
    return fetch("api/users/me",{
        method: "POST",
    }).then(validateResponse).then(()=>undefined);
}