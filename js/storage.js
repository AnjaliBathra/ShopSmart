var username = "Sasha Moore",
    max_spend = 150,
    linked_accounts = ["Amazon", "Walmart", "SHEIN"],
    wish_list = [
        {
            prod_name: "Caudalie Beauty Elixir Face Mist Toner, Travel Size",
            mrp: 20,
            price: 18,
            url: "https://www.amazon.com/dp/B0006BDMIU/",
            img_url: "https://m.media-amazon.com/images/I/51rOF0OzStL._AC_SL1500_.jpg"
        },
        {
            prod_name: "Swarovski Women's Infinity Heart Jewelry Collection",
            mrp: 119,
            price: 97.62,
            url: "https://www.amazon.com/SWAROVSKI-Womens-Infinity-Necklace-Crystal/dp/B0814ZGT9J/",
            img_url: "https://m.media-amazon.com/images/I/71Ppuph2B3L._AC_UY695_.jpg"
        },
        {
            prod_name: "Mitilly Women's Summer Button Down Dress",
            mrp: 40,
            price: 31.99,
            url: "https://www.amazon.com/MITILLY-Womens-Summer-Sleeveless-Button/dp/B07VYXGBX2/",
            img_url: "https://m.media-amazon.com/images/I/61j6Sivm43L._AC_UY879_.jpg"
        }
    ],
    spent = 118,
    saved = 93,
    postponed = 13
  
// chrome.storage.sync.get(['user'], function(result) {
//     console.log('Value currently is ' + result.user);
//   });

// set value in chrome local storage
async function setstorage() {
    chrome.storage.sync.set({user: {
        name: username,
        linked: linked_accounts,
        wishlist: wish_list, 
        budget: max_spend,
        spending: spent,
        savings: saved,
        deferrals: postponed
    }}, async function() {
        console.log('Value is set to ' + value);
      });
}