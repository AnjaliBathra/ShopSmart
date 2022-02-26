chrome.runtime.onMessage.addListener((request, sender, sendResponse)=> {
    console.log('Msg from content.js', request, sender, sendResponse);
 
    if (request.msg == "fetchUrl") {
        fetch(request.urldata).then((resp)=>{
            if(request.urldata.search("") == -1 && request.urldata.search("") == -1){
            return resp.text();
            }
            else return resp.json();
        }).then((out)=>{
            console.log(out);
            sendResponse({"res" : out});
        })
        //var data = await res.text();
        
        return true;
    }
    
});