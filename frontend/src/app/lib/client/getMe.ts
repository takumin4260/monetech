import { components } from "@/app/gen/schema";

type MeResponse = components["schemas"]["MeResponse"];

export async function getMe(): Promise<MeResponse> {
  const response = await fetch("http://localhost:8000/me");
  const data = await response.json();
  console.log("[debug] response", data);
  return data;
}
