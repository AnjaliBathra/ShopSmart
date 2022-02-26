var enabled = true; //enabled by default
var switchbtn = document.getElementById('toggle');

console.log('popup js triggered');
 
chrome.storage.local.get('enabled', data => {
    console.log(data.enabled)
    switchbtn.checked = data.enabled
    enabled = !!data.enabled;
});

switchbtn.onclick = () => {
    enabled = !enabled;
    chrome.storage.local.set({enabled:enabled});
    if(enabled) var showcode = "location.reload();"
    else var showcode = "document.querySelector('#tc-container').style.bottom = '-400px'"
    chrome.tabs.executeScript(null,{code: showcode})
};


    
    
    
    
    
    