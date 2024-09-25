"use client"
import Image from "next/image"
import { use, useState, useEffect, useRef, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
// import { useRouter } from "next/router"
import styles from "./styles.module.css"
import Head from "next/head"

export interface Item {
    barcode: string
    status: string
    status_description: string
    status_date: string
    location: string
    postcode: string
    delivery_status: string | null
    delivery_description: string | null
    delivery_datetime: string | null
    receiver_name: string | null
    signature: string | null
    status_detail: string
    delivery_officer_name: string | null
    delivery_officer_tel: string | null
    office_name: string | null
    office_tel: string | null
    call_center_tel: string
}
export interface Items extends Array<Item> {}

export default function Page() {
    const { trackingNo } = useParams()
    const [items, setItems] = useState<Items>([])

    const [barcode, setBarcode] = useState<string>("")
    const [location, setLocation] = useState<string>("")
    const [currentStatus, setCurrentStatus] = useState<Item | null>()
    const [statusNumber, setStatusNumber] = useState<number>(0)
    const [detail, setDetail] = useState<string>("")
    const [status, setStatus] = useState(0)
    const immuItems: Items = JSON.parse(JSON.stringify(items)).reverse()
    const ref = useRef<HTMLDivElement>(null)
    const [dataURL, setDataURL] = useState("")

    const router = useRouter()

    const fetchData = async () => {
        try {
            const res = await fetch(`/api/search/${trackingNo}`)
            const blob = await res.blob()
            const url = URL.createObjectURL(blob)
            setDataURL(url)
        } catch (e) {
            console.log(`Error: ${e}`)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const onButtonClick = async () => {
        const link = document.createElement("a")
        link.download = `${trackingNo}.png`
        // let dataUrl = ""
        link.href = dataURL
        // setDataURL(dataUrl)
        link.click()
    }

    return (
        <>
            <Head>
                <title>ตรวจสอบสถานะ</title>
            </Head>
            <main className="flex flex-col justify-center items-center bg-white w-dvw h-dvh">
                <h2 className="text-black text-2xl">ตรวจสอบสถานะ</h2>
                <div className="kanitExtralight">
                    <div className="border border-b-2 w-[1100px] h-[700px]">
                        {dataURL ? (
                            <img src={dataURL} alt="Guido Van Rossum" />
                        ) : (
                            "loading..."
                        )}
                    </div>
                </div>
                <div className="mt-5">
                    <button
                        className="btn bg-blue-700 w-[130px] text-white hover:scale-[110%] hover:bg-blue-400"
                        onClick={() => {
                            router.push("/")
                        }}
                    >
                        กลับหน้าหลัก
                    </button>
                    <button
                        className="btn btn-error w-[100px] text-white hover:scale-[110%] hover:bg-red-400"
                        onClick={onButtonClick}
                    >
                        ดาวน์โหลด
                    </button>
                </div>
            </main>
        </>
    )
}
