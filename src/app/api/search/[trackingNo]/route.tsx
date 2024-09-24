import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"
import { ImageResponse } from "next/og"
import MainImage from "../../../components/MainImage/index"

export async function GET(req: Request) {
    // const body = await req.json()

    // const all = await convertHTML(JSON.stringify(body))
    // res.setHeader("Content-Type", "image/png")

    return new ImageResponse(<MainImage />, {
        width: 700,
        height: 700,
        status: 200,
        statusText: "Ok",
        headers: {
            "content-type": "image/png",
        },
    })
}
