import jsonData from "../../datas/out.json"

export default function MainImage() {
    const datass = JSON.parse(JSON.stringify(jsonData))
    const datas = datass[0]
    const reverseDatas = [...datas].reverse()
    const immuItems = JSON.parse(JSON.stringify(datas)).reverse()

    const { barcode, location } = datas[0]
    const currentStatus = datas[datas.length - 1]
    const statusNumber: number = parseInt(currentStatus.status)
    const detail = currentStatus.status_detail
    const receiver = currentStatus.receiver_name
    const deliveryDescription = currentStatus.delivery_description

    const calStatus = () => {
        if (statusNumber <= 104) {
            return 1
        } else if (statusNumber <= 220) {
            return 2
        } else if (statusNumber <= 402) {
            return 3
        }
        return 4
    }
    const status = calStatus()
    // const status = 4

    function calDateTime(inputString: string) {
        // const date = new Date(inputString)
        // console.log(date)
        // const formattedDate = date.toLocaleDateString("th-TH", {
        //     day: "numeric",
        //     month: "numeric",
        //     year: "numeric",
        //     hour: "numeric",
        //     minute: "numeric",
        // })
        // return formattedDate

        return inputString.substring(0, 16)
    }

    const customFont = {
        fontFamily: "CustomFont",
        "@font-face": {
            fontFamily: "CustomFont",
            src: `url('/fonts/nKKZ-Go6G5tXcraBGwCKd6xBDFs.woff2'), url('/fonts/nKKZ-Go6G5tXcraVGwCKd6xB.woff2') format("woff2")`,
            fontWeight: "normal",
            fontStyle: "normal",
        },
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                backgroundColor: "#fff",
                color: "#606266",
            }}
        >
            <div
                style={{
                    // height: "100px",
                    width: "100%",
                    display: "flex",
                    // border: "1px solid #000",
                    marginTop: "16px",
                    justifyContent: "space-between",
                    // backgroundimg: `url("../../../public/imgs/inProcess.png")`,
                }}
            >
                <div
                    style={{
                        fontSize: "1rem",
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: "16px",
                    }}
                >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <svg
                            className="heart"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="26"
                            height="26"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            style={{ color: "#d6d4d4", marginRight: "20px" }}
                        >
                            <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                        </svg>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            color: "#3B3C4E",
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ display: "flex" }}> 1.{barcode}</div>
                            <img
                                src="https://img5.pic.in.th/file/secure-sv1/barcode3dec6040548ace4a.png"
                                alt="barcode"
                                width={20}
                                height={16}
                            />
                        </div>
                        <div>{location}</div>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        height: "70px",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        // border: "1px solid #00B034",
                        marginRight: "16px",
                    }}
                >
                    <div
                        style={{
                            color: "#00B034",
                            justifyContent: "flex-end",
                            fontSize: "18px",
                        }}
                    >
                        {detail}
                    </div>
                    <span style={{ fontSize: "13px" }}>
                        ชื่อผู้รับ: {receiver}
                    </span>
                    <span style={{ fontSize: "13px" }}>
                        สถานะ: {deliveryDescription}
                    </span>
                </div>
            </div>
            <div
                style={{
                    height: "80px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    // border: "1px solid #000",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                    }}
                >
                    {/* <img
                        src={InProcessImg}
                        alt="process"
                        width={60}
                        height={60}
                        priority={true}
                    /> */}
                    <img
                        src="https://img5.pic.in.th/file/secure-sv1/inProcess.png"
                        alt="inprocess"
                        width={64}
                        height={64}
                    />
                    <span
                        style={{
                            position: "absolute",
                            width: "90px",
                            top: "64px",
                            left: "4px",
                        }}
                    >
                        รับเข้าระบบ
                    </span>
                </div>
                <div
                    style={{
                        width: "60px",
                        height: "3px",
                        backgroundColor: status >= 2 ? "#EF4444" : "#CBD5E0",
                    }}
                    className={`w-[60px] h-[3px] ${
                        status >= 2 ? "bg-red-500" : "bg-slate-200"
                    }`}
                ></div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center",
                        position: "relative",
                    }}
                >
                    {status >= 2 ? (
                        <img
                            src="https://img5.pic.in.th/file/secure-sv1/inTransit.png"
                            alt="process"
                            width={64}
                            height={64}
                        />
                    ) : (
                        <img
                            src="https://img5.pic.in.th/file/secure-sv1/inTransit-alt.png"
                            alt="process"
                            width={64}
                            height={64}
                        />
                    )}
                    <span
                        style={{
                            position: "absolute",
                            top: "64px",
                            width: "90px",
                        }}
                    >
                        ระหว่างขนส่ง
                    </span>
                </div>
                <div
                    style={{
                        width: "60px",
                        height: "3px",
                        backgroundColor: status >= 3 ? "#EF4444" : "#CBD5E0",
                    }}
                    className={`w-[60px] h-[3px] ${
                        status >= 3 ? "bg-red-500" : "bg-slate-200"
                    }`}
                ></div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                    }}
                >
                    {status >= 3 ? (
                        <img
                            src="https://img2.pic.in.th/pic/inDelivery.png"
                            alt="InDeliveryImg"
                            width={64}
                            height={64}
                        />
                    ) : (
                        <img
                            src="https://img2.pic.in.th/pic/inDelivery-alt.png"
                            alt="InDeliveryAltImg"
                            width={64}
                            height={64}
                        />
                    )}
                    <span
                        style={{
                            position: "absolute",
                            top: "64px",
                            width: "90px",
                        }}
                    >
                        ออกไปนำจ่าย
                    </span>
                </div>
                <div
                    style={{
                        width: "60px",
                        height: "3px",
                        backgroundColor: status >= 4 ? "#EF4444" : "#CBD5E0",
                    }}
                    className={`w-[60px] h-[3px] ${
                        status >= 4 ? "bg-red-500" : "bg-slate-200"
                    }`}
                ></div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                    }}
                >
                    {status >= 4 ? (
                        <img
                            src="https://img5.pic.in.th/file/secure-sv1/success.png"
                            alt="SuccessImg"
                            width={64}
                            height={64}
                        />
                    ) : (
                        <img
                            src="https://img2.pic.in.th/pic/success-alt.png"
                            alt="SuccessAltImg"
                            width={64}
                            height={64}
                        />
                    )}
                    <span
                        style={{
                            position: "absolute",
                            width: "90px",
                            top: "64px",
                        }}
                    >
                        นำจ่ายสำเร็จ
                    </span>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "10px",
                    fontSize: "13px",
                    textDecoration: "underline",
                    color: "#1e40af",
                }}
            >
                <span>ลายเซ็น</span>
                <span>ติดต่อเจ้าหน้าที่</span>
            </div>

            <div
                style={{
                    marginTop: "30px",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {reverseDatas.map((data, index) => (
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                        }}
                        key={index}
                    >
                        <div
                            style={{
                                display: "flex",
                                width: "50%",
                                justifyContent: "center",
                                gap: "10%",
                                // position: "relative",
                            }}
                        >
                            {index === reverseDatas.length - 1 ? null : (
                                <div
                                    style={{
                                        borderLeft: "dashed",
                                        borderLeftWidth: "2px",
                                        height: "100%",
                                        borderColor: "#2e9a7b",
                                        position: "absolute",
                                        left: "68px",
                                        top: "2px",
                                    }}
                                ></div>
                            )}
                            {/* <div className="dashedLine h-full border-green-600 absolute left-[67px]"></div> */}
                            <svg
                                style={{
                                    width: "18px",
                                    height: "18px",
                                    position: "absolute",
                                    left: "60px",
                                    top: "2px",
                                    color: "#2e9a7b",
                                    backgroundColor: "#fff",
                                }}
                                data-v-609009d6=""
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="check-circle"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                className="svg-inline--fa fa-check-circle"
                            >
                                <path
                                    data-v-609009d6=""
                                    fill="currentColor"
                                    d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                                    className=""
                                ></path>
                            </svg>
                            <div style={{ display: "flex" }}>
                                {calDateTime(data.status_date)} น.
                            </div>
                        </div>
                        {/* <div className="bg-red-200 w-full">{data.status_date}</div> */}
                        <div
                            style={{
                                width: "100%",
                                paddingBottom: "22px",
                                marginRight: "40px",
                            }}
                        >
                            {data.status_detail}
                        </div>
                    </div>
                ))}
            </div>
            <div
                style={{
                    display: "flex",
                    position: "absolute",
                    border: "1px solid #000",
                    width: "150px",
                    height: "150px",
                    bottom: "280px",
                    right: "180px",
                    backgroundColor: "#fff",
                }}
            >
                {immuItems[0]?.signature && (
                    <img
                        src={immuItems[0]?.signature}
                        onError={(e) => {
                            e.currentTarget.src =
                                "https://img5.pic.in.th/file/secure-sv1/Screenshot-2024-09-25-at-2.46.20AM.png"
                        }}
                        alt="signature"
                        width={150}
                        height={150}
                    />
                )}
            </div>
        </div>
    )
}
