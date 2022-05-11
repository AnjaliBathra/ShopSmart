document.querySelector("#smart-wishlist").addEventListener('click', async (e) => {
    // chrome.runtime.openOptionsPage()
    // get the ID of the current tab
    tabId = await getTabId()

    // send a message to the content script running in the tab with tabId
    chrome.tabs.sendMessage(tabId, "openDashboard", (response) => {
        // for testing purposes
        // alert('successfully sent message to content script');
        
        // EXTRA CODE NOT COVERED IN WORKSHOP
        // get a response from the content script
        if (response === 'success') {
        // do something after you find receive a response/reply
        // from content.js that the message has been received successfully 
    }
  });
})

document.querySelector("#smart-settings").addEventListener('click', (e) => {
   // send a message to the content script running in the tab with tabId
   chrome.tabs.sendMessage(tabId, "openDashboard", (response) => {
    // for testing purposes
    // alert('successfully sent message to content script');
    
    // EXTRA CODE NOT COVERED IN WORKSHOP
    // get a response from the content script
    if (response === 'success') {
    // do something after you find receive a response/reply
    // from content.js that the message has been received successfully 
}
});
})

    
async function getTabId() {
    let queryOptions = { active: true, currentWindow: true };
    let tabs = await chrome.tabs.query(queryOptions);
    return tabs[0].id;
  }
    
    
    
    