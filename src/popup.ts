const indexButton = document.getElementById("button");
const success= document.getElementById("success")

indexButton?.addEventListener("click", async () => {
  console.log("Sending request...");

  // Get the active tab's URL using the Chrome API
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const tabUrl = tabs[0].url; // Get the active tab's URL
      console.log("Active Tab URL:", tabUrl);

      // Send the URL to the server via fetch 
      fetch("http://localhost:3001/api/link", {
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
    } else {
      console.log("No active tab found.");
    }
  });
});
