import { components } from "@/app/gen/schema";

type User = components["schemas"]["User"];

export async function getUsers(): Promise<User[]> {
  const response = await fetch("http://localhost:3000/api/getUsers");
  return await response.json();
}