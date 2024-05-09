"use client"
import { on } from "events"
import Image from "next/image"
import { use, useState } from "react"
import { useRouter } from 'next/navigation'

export default function Home() {
    const router = useRouter()
    const [strTaacking, setStrTaacking] = useState<string>("")
    // const [trackingNo, setTrackingNo] = useState<number>(0)

    const onchange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStrTaacking(event.target.value)
    }


    const onSearch = (event:  React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.push(`/search/${strTaacking}`)
    }

    return (
        <main className="flex justify-center items-center bg-white w-dvw h-dvh">
            <div className="flex flex-col justify-center tiems-center  border border-black w-[500px] h-[300px]">
                <h2 className="text-black">กรอกหมายเลขสิ่งของ 13 หลัก</h2>
                <form onSubmit={onSearch}>
                    <label className="input input-bordered flex items-center gap-2 bg-white w-full max-w-[300px]">
                        <input
                            type="text"
                            className="w-full"
                            placeholder="Search"
                            onChange={onchange}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-4 h-4 opacity-70"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </label>
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
