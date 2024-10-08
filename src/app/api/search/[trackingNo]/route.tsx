import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"
import { ImageResponse } from "next/og"
import MainImage from "../../../components/MainImage/index"
export const runtime = "edge"

const loadFont = async (fontWait:string) => {
    if (fontWait === "medium") {
        return fetch(
            new URL("../../../../../public/fonts/Kanit/Kanit-Medium.ttf", import.meta.url)
        ).then((r) => r.arrayBuffer())
    }
    if (fontWait === "bold") {
        return fetch(
            new URL("../../../../../public/fonts/Kanit/Kanit-Bold.ttf", import.meta.url)
        ).then((r) => r.arrayBuffer())
    }
    return fetch(
        new URL("../../../../../public/fonts/Kanit/Kanit-Light.ttf", import.meta.url)
    ).then((r) => r.arrayBuffer())
}

export async function GET(req: Request) {
    const KanitLigth = await loadFont("light")
    const KanitMedium = await loadFont("medium")
    // const body = await req.json()

    // const all = await convertHTML(JSON.stringify(body))
    // res.setHeader("Content-Type", "image/png")

    // const imgdata = await fetch(
    //     new URL("../../../../public/images/barcode.png", import.meta.url)
    // ).then((r) => r.arrayBuffer())

    

    return new ImageResponse(<MainImage />, {
        width: 1100,
        height: 700,
        fonts: [
            {
                name: "Kanit-Light",
                data: KanitLigth,
            },
            {
                name: "Kanit-Medium",
                data: KanitMedium,
            },
        ],
        status: 200,
        statusText: "Ok",
        headers: {
            "content-type": "image/png",
        },
    })
}
