// ここにbackendのendpointをたたく
import  {NextResponse} from "next/server"

export async function GET() {
    // const upstream = await fetch(
    //     "http://localhost:8000/me"
    // )

    // const data = upstream.json

    const data = {
        user:{
            id:1,
            name:"test",
            icon:"test.png"
        },
        account:{
            deposit:3000,
            accountNumber:1
        }
    }
    return NextResponse.json(data)
}