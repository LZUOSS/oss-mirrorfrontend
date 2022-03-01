let publicUrl = "http://127.0.0.1/public"
let recordUrl = "http://127.0.0.1/record"

let syncStatus = ["NotStart", "Running", "Success", "Failed"]

var publicRequest = new XMLHttpRequest()
publicRequest.open("GET", publicUrl, true)
publicRequest.send()

publicRequest.onload = function () {
    if (publicRequest.readyState = 4 && publicRequest.status === 200) {
        let fileList = JSON.parse(publicRequest.responseText)
        for (file of fileList) {
            recordRequest = new XMLHttpRequest()
            recordRequest.open("GET", recordUrl + "/" + file.name + ".json", true)
            recordRequest.send()
            recordRequest.onload = function () {
                if (recordRequest.readyState = 4 && recordRequest.status === 200) {
                    let record = JSON.parse(recordRequest.responseText)
                    mirrorListElem = document.createElement("tr")
                    mirrorName = document.createElement("td")
                    mirrorUrl = document.createElement("a")
                    mirrorUrl.setAttribute("href", publicUrl + "/" + file.name)
                    mirrorUrl.innerText = file.name
                    mirrorName.appendChild(mirrorUrl)
                    mirrorStatus = document.createElement("td")
                    mirrorStatus.innerText = syncStatus[record.sync_status]
                    mirrorLastUpdateTime = document.createElement("td")
                    mirrorLastUpdateTime.innerText = record.last_change_time
                    mirrorListElem.appendChild(mirrorName)
                    mirrorListElem.appendChild(mirrorStatus)
                    mirrorListElem.appendChild(mirrorLastUpdateTime)
                    document.getElementById("mirrorList").appendChild(mirrorListElem)
                }
            }
        }
    }
}
