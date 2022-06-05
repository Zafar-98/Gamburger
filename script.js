const product = {
    plainBurger: {
        name: "GAMBURGER",
        price: 10000,
        kcall: 500,
        amount: 0,
        get calsSum() {
            return this.price * this.amount
        },
        get calcKcall() {
            return this.kcall * this.amount
        },
    },
    freshBurger: {
        name: "GAMBURGER FRESH",
        price: 20500,
        kcall: 600,
        amount: 0,
        get calsSum() {
            return this.price * this.amount
        },
        get calcKcall() {
            return this.kcall * this.amount
        },
    },
    freshCombo: {
        name: "FRESH COMBO",
        price: 31900,
        kcall: 700,
        amount: 0,
        get calsSum() {
            return this.price * this.amount
        },
        get calcKcall() {
            return this.kcall * this.amount
        },
    },
}

let btn = document.querySelectorAll(".main__product-btn")

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function () {
        // console.log(this); btn
        // console.log(this.closest(".main__product").getAttribute("id"));
        prepare(this)
    })
}

function prepare(el) {
    // console.log(el); btn
    let parent = el.closest(".main__product") /* main__product */
    let parentID = parent.getAttribute("id") /* main__product ID */
    // console.log(parentID);
    let num = parent.querySelector(".main__product-num")
    // console.log(num);
    let price = parent.querySelector(".main__product-price span")
    let kcall = parent.querySelector(".main__product-kcall span")
    let sym = el.getAttribute("data-symbol")
    let count = product[parentID].amount
    
    if (sym == "+") {
        count++
    } else if (sym == "-" && count > 0) {
        count--
    }
    
    product[parentID].amount = count
    
    num.innerHTML = count
    price.innerHTML = product[parentID].calsSum
    kcall.innerHTML = product[parentID].calcKcall
}

// timer start

let headerTimerExtra = document.querySelector(".header__timer-extra")
let speed = 20

function lvl() {
    headerTimerExtra.innerHTML++
    
    if (headerTimerExtra.innerHTML > 50 && headerTimerExtra.innerHTML < 75) {
        speed = 80
    } else if (headerTimerExtra.innerHTML > 75 && headerTimerExtra.innerHTML < 90) {
        speed = 150
    }
    
    if (headerTimerExtra.innerHTML < 100) {
        setTimeout(() => {
            lvl()
        }, speed);
    }
}

lvl()

// timer end

// getImages start

let mainProductInfo = document.querySelectorAll(".main__product-info")
let view = document.querySelector(".view")
let viewClose = document.querySelector(".view__close")
let viewImage = document.querySelector(".view img")

for (let i = 0; i < mainProductInfo.length; i++) {
    mainProductInfo[i].addEventListener('dblclick', function () {
        getImages(this)
    })
}

function getImages(el) {
    let img = el.querySelector(".main__product-img").getAttribute("src")
    console.log(img);
    viewImage.setAttribute("src", img) 
    view.classList.add("active")
}

viewClose.addEventListener("click", function () {
    view.classList.remove("active")
})

view.addEventListener("click", function (e) {
    console.log(e.target);
    console.log(e.currentTarget);
    if (e.target === e.currentTarget) {
        view.classList.remove("active")
    }
})

// getImages end

// Board start

let receipt = document.querySelector(".receipt")
let receiptWindow = receipt.querySelector(".receipt__window")
let receiptWindowOut = receipt.querySelector(".receipt__window-out")
let receiptWindowBtn = receipt.querySelector(".receipt__window-btn")
let addCart = document.querySelector(".addCart")

addCart.addEventListener("click", function () {
    receipt.style.display = 'flex'
    
    setTimeout(() => {
        receipt.style.opacity = '1'
        receiptWindow.style.top = '25%'
    }, 300);
    
    let menu = "Your cart: \n\n"
    let totalPrice = 0
    let totalKcall = 0
    
    for (const key in product) {
        if (product[key].amount) {
            console.log(product[key].name);
            menu += `${product[key].name} ${product[key].amount}x ${product[key].calsSum} \n`
            totalPrice += product[key].calsSum
            totalKcall += product[key].calcKcall
        }
    }
    
    receiptWindowOut.innerHTML = `${menu}\nTotal price: ${totalPrice} so'm\nTotal calories: ${totalKcall} calories`
})

receiptWindowBtn.addEventListener("click", function () {
    // location = "https://yandex.uz/"
    location.reload()
})

// Board end