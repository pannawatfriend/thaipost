"use client"
import { on } from "events"
import Image from "next/image"
import { use, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Router from "next/router"

export default function Home() {
    const router = useRouter()
    const [strTaacking, setStrTaacking] = useState<string>("")
    // const [trackingNo, setTrackingNo] = useState<number>(0)

    const onchange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        setStrTaacking(event.target.value)
    }

    const onSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (strTaacking) {
           router.push(`/search/${strTaacking}`)
        }
    }

    // useEffect(() => {
    //     Router.reload()
    // }, [])

    const handlePasteClick = async () => {
        // setIsPasteBtnActive((prevState) => !prevState)
        // e.preventDefault()

        try {
            const text = await navigator.clipboard.readText()
            setStrTaacking(text)
            console.log("Pasted content: ", text)
        } catch (err) {
            console.error("Failed to read clipboard contents: ", err)
        }
    }

    return (
        <main className="flex justify-center items-center bg-white w-dvw h-dvh">
            <div className="flex flex-col justify-center tiems-center border border-black w-[500px] h-[600px] rounded-xl">
                <form
                    onSubmit={onSearch}
                    className="flex flex-col gap-3 items-center"
                >
                    <h2 className="text-black text-lg font-bold">
                        กรอกหมายเลขสิ่งของ 13 หลัก
                    </h2>
                    <div className="join">
                        <input
                            className="input input-bordered input-info join-item bg-white text-black font-bold"
                            placeholder="หมายเลข13 หลัก" 
                            onChange={onchange}
                            value={strTaacking}
                        />
                        <button
                            className="btn btn-info join-item rounded-r-xl"
                            onClick={handlePasteClick}
                        >
                            {/* Paste
                            <i className={"fa-regular fa-paste"}></i> */}

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-white"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                                />
                            </svg>
                        </button>
                    </div>
                    <input
                        type="submit"
                        value="ค้นหา"
                        className="btn btn-error w-[100px] text-white hover:scale-[110%] hover:bg-red-400"
                    />
                </form>
            </div>
        </main>
    )
}
