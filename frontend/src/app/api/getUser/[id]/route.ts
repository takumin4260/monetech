// ここにbackendのendpointをたたく
import  {NextResponse} from "next/server"

// contextを引数として受け取る
export async function GET(request: Request, context: { params: { id: string } }) {
  console.log("Fetching user with ID:", context.params);
  // paramsオブジェクトからidを取得
  const {id} = context.params;

  const upstream = await fetch(
    // 取得したidをURLに埋め込む
    `http://localhost:8000/users/${id}`
  );

  // .json()はPromiseを返すのでawaitが必要
  const data = await upstream.json();

  console.log("Fetched user data:", data);

  return NextResponse.json(data);
}