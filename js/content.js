window.onload = () => {
    fetch(chrome.extension.getURL('../html/content.html'), {
        cache: "no-cache"
    })
        .then(response => response.text())
        .then(data => {

            modal = document.createElement('div')
            modal.setAttribute('id', 'smart-container')
            // modal.classList.add('trans', 's-shade', 'r-border', 'centered')
            modal.innerHTML = data
            // <div id="smart-container" class="trans s-shade r-border centered">
            document.body.appendChild(modal)

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