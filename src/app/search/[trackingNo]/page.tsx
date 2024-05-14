"use client"
import { on } from "events"
import Image from "next/image"
import { use, useState, useEffect, useRef, useCallback } from "react"
import { toPng, toJpeg } from "html-to-image"
import { useParams, useRouter } from "next/navigation"
// import { useRouter } from "next/router"
import { getItemByNo } from "../../libs/fetchUtils"
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

    const getItem = async () => {
        const itemss = await getItemByNo(trackingNo.toString())
        setItems(itemss)
        setBarcode(itemss[0].barcode)
        setLocation(itemss[0].location)
        setCurrentStatus(itemss[itemss.length - 1])
        setStatusNumber(parseInt(itemss[itemss.length - 1].status))
        setDetail(itemss[itemss.length - 1].status_detail)
        setStatus(calStatus(parseInt(itemss[itemss.length - 1].status)))
    }

    useEffect(() => {
        getItem()
    }, [])
    const router = useRouter()

    const calStatus = (statusNo: number) => {
        if (statusNo <= 104) {
            return 1
        } else if (statusNo <= 220) {
            return 2
        } else if (statusNo <= 402) {
            return 3
        }
        return 4
    }

    function calDateTime(inputString: string) {
        return inputString.substring(0, 16)
    }

    

    const onButtonClick = useCallback(() => {
        // if (ref.current === null) {
        //     return
        // }

        const div = document.getElementById("content")

        if (div) {
            toPng(div)
                .then((dataUrl) => {
                    const link = document.createElement("a")
                    link.download = `${trackingNo}.png`
                    link.href = dataUrl
                    setDataURL(dataUrl)
                    link.click()
                    // router.push(`/search/${trackingNo.toString()}`)
                    // router.back()
                    // router.forward()
                    router.refresh()
                    console.log("dataUrl")
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [ref])

    return (
        <>
            <Head>
                <title>ตรวจสอบสถานะ</title>
            </Head>
            <main className="flex flex-col justify-center items-center bg-white w-dvw h-dvh">
                <h2 className="text-black text-2xl">ตรวจสอบสถานะ</h2>
                <div className={styles.kanitExtralight}>
                    <div className="border">
                        <div
                            id="content"
                            className="flex flex-col w-[700px] h-fit pb-16 bg-white items-center text-[#606266]"
                        >
                            <div className="flex justify-between first-letter:h-[15%] mt-6 mb-4 w-full">
                                <div className="text-base flex ml-10">
                                    <svg
                                        className="heart text-[#d6d4d4]"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="26"
                                        height="26"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                                    </svg>
                                    <div className="ml-5">
                                        <div className="font-semibol">
                                            1.{barcode}55555555
                                        </div>
                                        <div className="text-[#3B3C4E] font-bold">
                                            {location}
                                        </div>
                                    </div>
                                    <Image
                                        src={`/images/barcode.png`}
                                        alt="line"
                                        width={20}
                                        height={16}
                                        priority={false}
                                        className="w-[20px] h-[16px] ml-1 mt-1"
                                    />
                                </div>
                                <div className="flex flex-col items-end mr-10">
                                    <div className="text-green-500 text-lg">
                                        {detail}
                                    </div>
                                    <span className="text-xs">
                                        ชื่อผู้รับ:{" "}
                                        {currentStatus?.receiver_name}
                                    </span>
                                    <span className="text-xs">
                                        สถานะ:{" "}
                                        {currentStatus?.delivery_description}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col w-[600px] text-xs items-center">
                                <div className="flex items-center">
                                    <Image
                                        src={`/images/inProcess.png`}
                                        alt="process"
                                        width={64}
                                        height={64}
                                        priority={true}
                                    />
                                    <div
                                        className={`w-[60px] h-[3px] ${
                                            status >= 2
                                                ? "bg-red-500"
                                                : "bg-slate-200"
                                        }`}
                                    ></div>
                                    {status >= 2 ? (
                                        <Image
                                            src={`/images/inTransit.png`}
                                            alt="process"
                                            width={64}
                                            height={64}
                                            priority={true}
                                        />
                                    ) : (
                                        <Image
                                            src={`/images/inTransit-alt.png`}
                                            alt="process"
                                            width={64}
                                            height={64}
                                            priority={true}
                                        />
                                    )}
                                    <div
                                        className={`w-[60px] h-[3px] ${
                                            status >= 3
                                                ? "bg-red-500"
                                                : "bg-slate-200"
                                        }`}
                                    ></div>
                                    {status >= 3 ? (
                                        <Image
                                            src={`/images/inDelivery.png`}
                                            alt="InDeliveryImg"
                                            width={64}
                                            height={64}
                                            priority={true}
                                        />
                                    ) : (
                                        <Image
                                            src={`/images/inDelivery-alt.png`}
                                            alt="InDeliveryAltImg"
                                            width={64}
                                            height={64}
                                            priority={true}
                                        />
                                    )}
                                    <div
                                        className={`w-[60px] h-[3px] ${
                                            status >= 4
                                                ? "bg-red-500"
                                                : "bg-slate-200"
                                        }`}
                                    ></div>
                                    {status >= 4 ? (
                                        <Image
                                            src={`/images/success.png`}
                                            alt="SuccessImg"
                                            width={64}
                                            height={64}
                                            priority={true}
                                        />
                                    ) : (
                                        <Image
                                            src={`/images/success-alt.png`}
                                            alt="SuccessAltImg"
                                            width={64}
                                            height={64}
                                            priority={true}
                                        />
                                    )}
                                </div>
                                <div className="flex gap-16 px-3 relative">
                                    <span>รับเข้าระบบ</span>
                                    <span className="">ระหว่างขนส่ง</span>
                                    <span>ออกไปนำจ่าย</span>
                                    <span>นำจ่ายสำเร็จ</span>
                                </div>
                            </div>

                            <div className="flex flex-col h-[72%] w-full mt-5 ">
                                {immuItems.map((item: Item, index: number) => (
                                    <div
                                        className="flex text-sm h-fit"
                                        key={index}
                                    >
                                        <div className="flex w-full justify-center gap-[10%] relative">
                                            {index ===
                                            items.length - 1 ? null : (
                                                <div
                                                    className={styles.greenLine}
                                                ></div>
                                            )}
                                            {/* <div className="dashedLine h-full border-green-600 absolute left-[67px]"></div> */}
                                            <svg
                                                data-v-609009d6=""
                                                aria-hidden="true"
                                                focusable="false"
                                                data-prefix="fas"
                                                data-icon="check-circle"
                                                role="img"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                                className="svg-inline--fa fa-check-circle fa-w-4 w-4 h-4 text-green-600 bg-white absolute left-[75px]"
                                            >
                                                <path
                                                    data-v-609009d6=""
                                                    fill="currentColor"
                                                    d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                                                    className=""
                                                ></path>
                                            </svg>
                                            <div>
                                                {calDateTime(item.status_date)}{" "}
                                                น.
                                            </div>
                                        </div>
                                        {/* <div className="bg-red-200 w-full">{data.status_date}</div> */}
                                        <div className="w-full pr-12 pb-3">
                                            {item.status_detail}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
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
