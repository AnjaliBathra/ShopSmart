window.onload = async () => {
    fetch(chrome.extension.getURL('../html/content.html'), {
        cache: "no-cache"
    })
        .then(async (response) => response.text())
        .then(async (data) => {

            modal = document.createElement('div')
            modal.setAttribute('id', 'smart-container')
            modal.innerHTML = data
            document.body.appendChild(modal)
            await setstorage()
            await loadUserDetails()

            // open modal - add to cart or buy now
            buttonIds = ['#addToCart_feature_div', '#buyNow_feature_div']
            for (val of buttonIds){
                overlay = document.createElement('div')
                overlay.innerText = " "
                overlay.classList.add('invisible_div')
                document.querySelector(val).style.position = 'relative'
                document.querySelector(val).appendChild(overlay)
                overlay.addEventListener('click', (e) => {
                    document.querySelector('#smart-container').querySelector('.modal').classList.add('is-active')
                    document.querySelector('#smart-container').querySelector('.modal-content').style.top = '0px'
                    
                    inv_divs = Array.prototype.slice.call(document.getElementsByClassName("invisible_div"));
                    for (i_div of inv_divs){
                        i_div.style.display = 'none'
                    }
                })
            }

            // ignore - close the modal
            document.querySelector('#ignore-smart').addEventListener('click', (e) => {
                modalClose()
            })

            // save for later
            document.querySelector('#save-smart').addEventListener('click', (e) => {
                // add to wishlist - storage
                // possible confetti
                fetch(chrome.extension.getURL('../html/check.html'), {
                    cache: "no-cache"
                })
                    .then(response => response.text())
                    .then(data => {
                        document.querySelector(".card").innerHTML = data
                        toggleCheck()
                        document.querySelector(".card").style.display = 'grid'
                        document.querySelector(".card").style.justifyContent = 'center'
                        document.querySelector(".card").style.alignItems = 'center'

                        setTimeout(() => {
                            document.querySelector('#smart-container').querySelector('.modal-content').style.top = '-1500px'
                            setTimeout(() => {
                                document.querySelector('#smart-container').querySelector('.modal').classList.remove('is-active')
                            
                            }, 300)
                        }, 3000)
            })

        })
    })
}

function modalClose(){
    document.querySelector('#smart-container').querySelector('.modal').classList.remove('is-active')
}

function toggleCheck(){
    document.querySelector(".circle-loader").addEventListener('click', (e) => {
        document.querySelector(".circle-loader").classList.add("load-complete");
        document.querySelector(".checkmark").style.display = 'unset';
    })
}

async function loadUserDetails(){
    await chrome.storage.sync.get(['user'], function(result) {
        console.log('Value currently is ' + result.user);

        msg = 'Just a gentle reminder that this is your 7th clothing purchase \
        <a href="https://www.amazon.com/gp/css/order-history" target="_blank">this month</a>. \
        You have spent <strong>$' + result.user.spending + '</strong> this month, which is $' + (result.user.budget - result.user.spending) + ' below your budget. \
        Proceed to checkout only if you think you absolutely need this product at this time.'

        document.querySelector('#smart-container').querySelector('.subtitle').innerHTML = msg

      });
}

/*
// access chrome local storage
chrome.storage.local.get(user, data => {
    if (data[user]) user_data = data[user];
})

// listen for changes in chrome local storage
chrome.storage.onChanged.addListener(function(changes, namespace) {
    for(key in changes) {
        console.log(changes, key, namespace)
      if(key === today) {
         console.log('Storage Changed', changes[today].newValue.read, changes[today].newValue.unread)
        var nread = changes[today].newValue.read,
        nunread = changes[today].newValue.unread,
        oread = changes[today].oldValue.read,
        ounread = changes[today].oldValue.unread,
        saledata = changes[today].newValue.saledata;
        console.log(saledata)
        setcount(nunread)
        if(nunread>0) {
            //document.querySelector("#notifcontainer").style.left = "-500px";
        } 
        if(saledata && saledata.length>0){
            parsesales(saledata)
        } else{
            fetch('https://thuttu.com/storeapi/recentsales.json', {
                cache: "no-cache"
            }).then((response) => {
                return response.json()
            })
            .then((res) => {
                saledata = res;
                console.log("FET", saledata)
                if(saledata && saledata.length>0) parsesales(saledata)
            })
        }
       
       
      }
    }
  });

// receive message from background.js
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log('Msg from background', request, sender, sendResponse)
        if (request.msg == "newsales") {
         var data = request.data;
             parsesales(data); 
        }
    });

    */