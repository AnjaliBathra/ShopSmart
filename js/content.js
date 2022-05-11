window.onload = async () => {
    fetch(chrome.runtime.getURL('../html/content.html'), {
        cache: "no-cache"
    })
        .then(async (response) => response.text())
        .then(async (data) => {
            console.log("CONTENT LOADED")
            modal = document.createElement('div')
            modal.setAttribute('id', 'smart-container')
            modal.innerHTML = data
            document.body.appendChild(modal)
            await setstorage()
            await loadUserDetails()

            // open modal - add to cart or buy now
            buttonIds = ['#addToCart_feature_div', '#buyNow_feature_div', "#submit.add-to-cart", "#submit.buy-now"]
            for (val of buttonIds){
                if (document.querySelector(val)) {
                    console.log(val)
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
            }

            // ignore - close the modal
            document.querySelector('#ignore-smart').addEventListener('click', (e) => {
                modalClose()
            })

            // save for later
            document.querySelector('#save-smart').addEventListener('click', (e) => {
                // add to wishlist - storage
                // possible confetti
                fetch(chrome.runtime.getURL('../html/check.html'), {
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

        msg = 'You are in danger of <strong>going over your budget!</strong>' + 
        // This will be your 7th purchase \
        // <a href="https://www.amazon.com/gp/css/order-history" target="_blank">this month</a>. \
        ' You have spent <strong>$' + result.user.spending + '</strong> this month, which is $' + (result.user.budget - result.user.spending) + ' below your budget. \
        Proceed to checkout only if you think you absolutely need this product at this time.'

        document.querySelector('#smart-container').querySelector('.subtitle').innerHTML = msg

      });
}

function openDashboard () {
    window.open("http://localhost:3000/admin/dashboard", "_blank");
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // communication tree - extecuted on receiving a message from popup.js
    if (request === 'openDashboard') { // if the message from popup.js is 'dance_on'
         // your functionality here - insert mushroom dance!
         console.log("RECEIVED")
        openDashboard();  
    }

    // EXTRA CODE NOT COVERED IN WORKSHOP
    // send a response back to popup.js that the message has been successfully received
    sendResponse('success');
    
});