// ここにbackendのendpointをたたく
import  {NextResponse} from "next/server"

export async function GET() {
    // const upstream = await fetch(
    //     "http://localhost:8000/users"
    // )

    // const data = upstream.json

    const data = [
        { id: 1, name: 'test1', icon: 'test1.png' },        
        { id: 2, name: 'test2', icon: 'test2.png' },
        { id: 3, name: 'test3', icon: 'test3.png' },
        { id: 4, name: 'test4', icon: 'test4.png' },
        { id: 5, name: 'test5', icon: 'test5.png' },
        { id: 6, name: 'test6', icon: 'test6.png' },
        { id: 7, name: 'test7', icon: 'test7.png' },
        { id: 8, name: 'test8', icon: 'test8.png' },
        { id: 9, name: 'test9', icon: 'test9.png' },
        { id: 10, name: 'test10', icon: 'test10.png' }

    ];
    
    return NextResponse.json(data)
}