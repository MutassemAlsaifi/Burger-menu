//**********************************VARIABLE************************//
let bar = document.querySelector("header.main_header .bar"),
 links = document.querySelectorAll("header.main_header .links_div .links a"),
  nav = document.querySelector("header.main_header .links_div .links"),
  icon_cart = document.querySelector("header .cart"),
  main_cart = document.querySelector("#cart"),
  cancel_cart = document.querySelector("#cart .cancel")
  close_cart = document.querySelector(" .close_cart")
  let total_price=document.querySelector(".cart-total")
  let cart_count=document.querySelector("header.main_header .links_div .cart span")
  let num;
//**********************************EVENTS************************//
bar.addEventListener("click", (e) => {
    nav.classList.toggle("active_bar");
});
links.forEach(element => {
  element.addEventListener("click",_=>{
    nav.classList.remove("active_bar");
    clear(links , "active")
    element.classList.add("active")
  })
});
let click=false;
icon_cart.addEventListener("click" , _=>{
  if(!click){
    close_cart.classList.add("transform")
    main_cart.classList.add("transform")
    main_cart.classList.remove("transform_reverse")
    close_cart.classList.remove("transform_reverse")
    click=true
  }else {
    main_cart.classList.remove("transform")
    main_cart.classList.add("transform_reverse")
    close_cart.classList.add("transform_reverse")
    click=false
  }
})
// THIS TO CLOSE THE CART  
cancel_cart.addEventListener("click" , _=>{
  main_cart.classList.remove("transform")
  main_cart.classList.add("transform_reverse")
  close_cart.classList.remove("transform")
  close_cart.classList.add("transform_reverse")

}
)
// THIS TO CLOSE THE CART  

addEventListener("click" , e=>{
  if (e.target ==close_cart){
    main_cart.classList.remove("transform")
  main_cart.classList.add("transform_reverse")
  close_cart.classList.remove("transform")
  close_cart.classList.add("transform_reverse")
  }
})

// Array لتخزين المنتجات المضافة إلى السلة
let addToCartBtns=document.querySelectorAll(".menu .child .footer_card button")
let cartItems =JSON.parse(localStorage.getItem("cartItems")) ||[];
addToCartBtns.forEach(btn => {
  btn.addEventListener("click",_=>{
    collectData(btn)
    showDAta()
  })
});

// Function لإضافة المنتج إلى السلة
function addToCart() {
  
    
    updateCartDisplay();
    updateLocalStorage();
}
// THIS TO CLECTE DATA 
function collectData (btn){
  let parent = btn.parentElement.parentElement.parentElement
  let name = parent.querySelector(".header_card h3")
  let img = parent.querySelector("img")
  let price = parent.querySelector(".header_card span span")
  let count = parent.querySelector("input")
  let food = {}
  food.name = name.innerText
  food.img = img.src
  food.count = count.value
  food.price = price.innerText
  
  if(uniqueItem(name.innerText) < 0){
    cartItems.push(food)
    updateLocalStorage()
  }

else{
  num=uniqueItem(name.innerText)
  let UpdateAmount= +cartItems[num].count
  UpdateAmount+= +food.count;
  cartItems[num].count=UpdateAmount

  
  updateLocalStorage()
}
}
let bodyCart=document.querySelector(".bodyCart")
function showDAta(){
  bodyCart.innerHTML=""
  for (const iterator in cartItems) {
   let food = `<div id="cart-items">
            <img src="${cartItems[iterator].img}" alt="">
            <span>${cartItems[iterator].name}</span>
            <span>${cartItems[iterator].count}</span>
            <span>${cartItems[iterator].price}$</span>
            <span>${Math.round(cartItems[iterator].count * cartItems[iterator].price)}$</span>
            <div class="cancel_item" onclick="deleteOneRow(${iterator})">
            <i class="fa-brands fa-mixer"></i>
            </div>
          </div>
          `
          bodyCart.innerHTML+=food
          cart_count.innerText=cartItems.length;

  }
  calculationTotal()
}
showDAta()
// Function لتحديث عرض السلة


// Function لتحديث المعلومات في Local Storage
function updateLocalStorage() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// الحصول على عناصر السلة من Local Storage إذا كانت متوفرة
if (localStorage.getItem("cartItems")) {
    cartItems = JSON.parse(localStorage.getItem("cartItems"));
}

// TO DELETE ON ROW 
function deleteOneRow(id){
  cartItems.splice(id , 1)
  updateLocalStorage()
  showDAta()
  cart_count.innerText=cartItems.length;

}
// DELETE ALL ITEMS 
let deleteAll=document.querySelector(".mainCart .cancel_add")
deleteAll.addEventListener("click" , _=>{
  deleteAllItems()
})
// THIS TO DELETE ALL ITEMS 
function deleteAllItems(){
  cartItems=[]
  updateLocalStorage()
  showDAta()
  cart_count.innerText="0";

}

// THIS TO CALCULATION THE TOTAL 

function calculationTotal(){
  let total = 0
  cartItems.forEach(food => {
  let  total_for_one_food= food.count * food.price
  total+=total_for_one_food;
});

total_price.innerText=Math.round(total)+".0" + "$";
}


// THIS TO ADD A UNIQUE ITEMS
  function uniqueItem(name){
    for (let index = 0; index < cartItems.length; index++) {
        if(cartItems[index].name == name ){
            num = index;
            return num
            
        }
    }
    return -1;
}
// TO DELATE ANY CLASS IN ARRAY 
function clear(arr , class_name){
  for (const iterator of arr) {
    iterator.classList.remove(class_name)
  }
}