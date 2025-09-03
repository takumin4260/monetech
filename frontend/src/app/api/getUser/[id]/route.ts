// ここにbackendのendpointをたたく
import  {NextResponse} from "next/server"

// contextを引数として受け取る
export async function GET(request: Request, context: { params: { id: string } }) {
  console.log("Fetching user with ID:", context.params);
  // paramsオブジ ェクトからidを取得
  const { id } = await context.params;

  console.log("Fetching user with ID:", id);

  const upstream = await fetch(
    // 取得したidをURLに埋め込む
    `http://localhost:8000/users/${id}`
  );

  console.log("Upstream response status:", upstream);

  // .json()はPromiseを返すのでawaitが必要
  const data = await upstream.json();

  return NextResponse.json(data);
}