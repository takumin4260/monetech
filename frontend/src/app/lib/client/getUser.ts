import { components } from "@/app/gen/schema";

export async function getUser(id: string){
  const response = await fetch(`http://localhost:3000/api/getUser/${id}`);
  return await response.json();
}