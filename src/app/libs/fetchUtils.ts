import datas from "../datas/out.json"
import { Item, Items } from "../search/[trackingNo]/page"

export interface ArrayItems extends Array<Items> {}

async function getItemByNo(trackNo: string) {
    let data
    const jsobj: ArrayItems = JSON.parse(JSON.stringify(datas))

    // const st = jsobj.find((items: any) => items.barcode === trackNo)
    const st = await jsobj[0]
    const nd = await jsobj[1]

    // try {
    //     data = await fetch(`${url}/${ver}/tasks/${id}`)
    //     const item = await data.json()
    //     return { resCode: data.status, data: item }
    // } catch (error) {
    //     console.log(data.status)
    //     return { resCode: data.status }
    // }
    // return jsobj.find((items: any) => items.barcode === trackNo)
    if (trackNo === "test1") {
        return st
    } else {
        return nd
    }
    return st
}

export { getItemByNo }
