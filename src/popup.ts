const indexButton = document.getElementById("button");
const success= document.getElementById("success")

indexButton?.addEventListener("click", async () => {
  console.log("Sending request...");

  // Get the active tab's URL using the Chrome API
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const tabUrl = tabs[0].url; // Get the active tab's URL
      console.log("Active Tab URL:", tabUrl);

      // Get the instance URL from Chrome storage
      chrome.storage.sync.get("instanceUrl", (items) => {
        const instanceUrl = items.instanceUrl || "http://localhost:3001";

        // Send the URL to the server via fetch 
        fetch(`${instanceUrl}/api/link`, {
          method: "POST",
          body: JSON.stringify({
            url: tabUrl, 
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json()) 
          .then(() => {
            // if good
            success!.classList.remove("hidden");
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
    } else {
      console.log("No active tab found.");
    }
  });
});

document.querySelector('#go-to-options')?.addEventListener('click', function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});
