import {usb} from "usb"
import fs from "fs"

let args = ["D:/Temp/", "F:/Backup/", "F:/"], info = null

process.argv.slice(2, 5).forEach((arg, index) => {
    args[index] = arg
})

usb.on("attach", (device) => {
    info = device.deviceDescriptor
    if (info.idVendor === 0x0781 && info.idProduct === 0x5591) {
        if (fs.existsSync(args[0])) {
            fs.cpSync(args[0], args[1], {recursive: true})
        }
    }
    else if (fs.existsSync(args[2])) {
        fs.cpSync(args[2], args[0]+crypto.randomUUID(), {recursive: true})
    }
})