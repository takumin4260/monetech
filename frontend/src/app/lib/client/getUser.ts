export async function getUser(id: string){
  const response = await fetch(`http://localhost:8000/users/${id}`);
  return await response.json();
}
