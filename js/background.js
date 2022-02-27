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

var username = "Sasha Moore",
    max_spend = 150,
    linked_accounts = ["Amazon", "Walmart", "SHEIN"],
    wish_list = [
        {
            prod_name: "name",
            mrp: 100,
            price: 99,
            url: "#",
            img_url: "#"
        }
    ],
    spent = 0,
    saved = 0,
    postponed = 0


// set value in chrome local storage
function setstorage() {
    chrome.storage.local.set({
        user: {
            name: username,
            linked: linked_accounts,
            wishlist: wish_list, 
            budget: max_spend,
            spending: spent,
            savings: saved,
            deferrals: postponed
        }
    });
}

// chrome.storage.local.get(today, data => {
//     if (data[user]) {
//         saledata = data[today].saledata ? data[today].saledata : [];
//         readitems = data[today].readitems ? data[today].readitems : 0;
//         unreaditems = data[today].unreaditems ? data[today].unreaditems : 0;
//     } else {
//         setstorage();
//     }
// })

// receiving message from content.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('Msg from content.js', request, sender, sendResponse)
    if (request.msg == "read") {
        unreaditems = 0;
        setstorage();
    }
});