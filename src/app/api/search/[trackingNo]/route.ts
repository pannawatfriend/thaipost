import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    // const body = await req.json()


    // const all = await convertHTML(JSON.stringify(body))
    // res.setHeader("Content-Type", "image/png")

    return NextResponse.json({ message: "hello world" })
}
