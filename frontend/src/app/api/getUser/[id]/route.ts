// ここにbackendのendpointをたたく
import  {NextResponse} from "next/server"

// contextを引数として受け取る
export async function GET(
    {params}: { params: { id: string } }
) {
  // paramsオブジェクトからidを取得
  const { id } = params;

  const upstream = await fetch(
    // 取得したidをURLに埋め込む
    `http://localhost:8000/users/${id}`
  );

  // .json()はPromiseを返すのでawaitが必要
  const data = await upstream.json();

  return NextResponse.json(data);
}