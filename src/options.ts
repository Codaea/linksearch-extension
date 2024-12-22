// saves options to chrome storage
const saveOptions = () => {
    const instanceUrl = document.getElementById("instance-url") as HTMLInputElement;

    chrome.storage.sync.set({
        instanceUrl: instanceUrl.value
    },
    () => {
        const status = document.getElementById("status");
        status!.textContent = "Options saved.";
        setTimeout(() => {
            status!.textContent = "";
        }, 750);
    })
}

// gets what already saved in the storage
const restoreOptions = () => {
    chrome.storage.sync.get({
        instanceUrl: ""
    },
    (items) => {
        const instanceUrl = document.getElementById("instance-url") as HTMLInputElement;
        instanceUrl.value = items.instanceUrl;
    })
}

document.addEventListener("DOMContentLoaded", restoreOptions); // restore options on load
document.getElementById("save")!.addEventListener("click", saveOptions); // save button