const catrs = document.querySelectorAll('.add-basket');
let products = [

    {
        name: "Xiaomi Redmi Note 12 Pro Plus 5G 8/256 GB Midnight Black",
        tag: 'Xiaomi',
        price: 929,
        inCart: 0
    },
    {
        name: "Samsung Galaxy S23 (S911) 256 GB Green",
        tag: 'Samsung',
        price: 2099,
        inCart: 0
    },
    {
        name: "Dyson Airwrap multi-styler Complete Long Copper/Nickel",
        tag: 'Dyson Airwrap',
        price: 1490,
        inCart: 0
    },
    {
        name: "Dyson Supersonic hair dryer Nickel/Copper",
        tag: 'Dyson Supersonic',
        price: 1099,
        inCart: 0
    },
    {
        name: "Lenovo IdeaPad Gaming 3 16IAH7 (82SA00FARK)",
        tag: 'Lenovo',
        price: 1979,
        inCart: 0
    },
    {
        name: "Citycoco C03A Green",
        tag: 'Citycoco',
        price: 3499,
        inCart: 0
    }
];

for (let i=0; i < catrs.length; i++) {
     catrs[i].addEventListener('click', () => {
        cartNums(products[i]);
        totalCost(products[i]);
     })
}

function loadCartNums () {
    let productNums = localStorage.getItem('cartNums');
    if (productNums){
        document.querySelector('.cart span').textContent = productNums; 
    }
}

function cartNums (product) {
    let productNums = localStorage.getItem('cartNums');
    productNums = parseInt(productNums);
    if (productNums) {
        localStorage.setItem('cartNums', productNums +1);
        document.querySelector('.cart span').textContent = productNums +1;
    }else {
        localStorage.setItem('cartNums', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems !=null) {
        if(cartItems[product.tag] ==undefined) {
          cartItems = {
            ...cartItems,
            [product.tag]:product
          }  
        }
       cartItems[product.tag].inCart += 1;
    }else {
        product.inCart = 1;
        cartItems = {
           [product.tag]:product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
   let cartCost = localStorage.getItem('totalCost');
   console.log("the cartCost", cartCost);

   if(cartCost != null) {
     cartCost = parseInt(cartCost);
     localStorage.setItem("totalCost", cartCost + product.price);
   }else {
     localStorage.setItem("totalCost", product.price)
   }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem('totalCost');

 if(cartItems && productContainer) {
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
      <div class = "product">
        <img src = "./images/images/${item.tag}.jpg">   
        <span>${item.name}</span>
        </div>
        <div class ="price">${item.price},00₼</div>
        <div class ="quantity">
             <i class="fa-solid fa-caret-left"></i>
             <span>${item.inCart}</span>
               <i class="fa-solid fa-caret-right"></i>
               <i class="fa-solid fa-trash"></i>
        </div>
        <div class ="total"
        ${item.inCart * item.price},00₼
        </div>
      `;
    });

    productContainer.innerHTML += `
    <div class ="basketTotalContainer">
        <h4 class ="basketTotal">
           ${cartCost},00₼
        </h4>
        </div>
    `;
 }
}


loadCartNums();
displayCart();