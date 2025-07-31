# USB Auto Backup Tool
## 🧠 How It Works:
* **Known USB Drives:**
  If the inserted USB drive matches a preconfigured Volume GUID, the tool will **copy files from a specified local folder to that USB drive** (outbound sync).
* **Unknown USB Drives:**
  If the inserted USB drive is **not recognized**, the tool will **backup files from the USB drive to a designated local folder** (inbound backup).
## 🔧 Key Features:
* Real-time detection of USB insertion events
* Configurable Volume GUIDs for recognized USB drives
* Automatic file copy logic based on drive identity
* Customizable source and destination paths
* Supports overwrite, skip, or incremental backup strategies
* Lightweight and easy to configure
# How to use?
```shell
node index.js [volumeGuid] [localPath] [backupPath]
```
