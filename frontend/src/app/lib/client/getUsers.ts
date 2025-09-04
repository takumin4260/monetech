// import { components } from "@/app/gen/schema";

// type User = components["schemas"]["User"];

export async function getUsers() {
  const response = await fetch(`http://localhost:8000/users/`);
  return await response.json();
}
