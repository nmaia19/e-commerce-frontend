// CARRINHO

let openCart = document.getElementById('open-cart')
let cart = document.querySelector('.carrinho')
let closeCart = document.querySelector('#close-cart')


openCart.onclick = () => {
    cart.classList.add('active')
}

closeCart.onclick = () => {
    cart.classList.remove('active')
}


// CARRINHO - FUNCIONAMENTO

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}


function ready() {

    // ----- EXCLUIR ITENS -----
    // identifica todos os botoes de remover que estiverem presentes no carrinho
    let deleteButtons = document.getElementsByClassName('remove-item')

    // executa a funcao de excluir de acordo com o botão clicado
    for (let i = 0; i < deleteButtons.length; i++) {
        let button = deleteButtons[i]
        button.addEventListener('click', removeItemCart)
    }

    // ----- ALTERAR QUANTIDADES -----

    let qntdInput = document.getElementsByClassName('cart-qntd')

    for (let i = 0; i < qntdInput.length; i++) {
        let input = qntdInput[i]
        input.addEventListener('change', updateItemQntd)
    }

    // ----- ADICIONAR AO CARRINHO -----

    let addCart = document.getElementsByClassName('add-cart')

    for (let i = 0; i < addCart.length; i++) {
        let buttonAdd = addCart[i]
        buttonAdd.addEventListener('click', getProductData)
    }

    // COMPRAR

    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyClicked)

}

// FUNÇÕES PRINCIPAIS CHAMADAS PELOS EVENTOS DA PÁGINA

function getProductData(event) {
    let buttonClicked = event.target
    let relatedProduct = buttonClicked.parentElement
    let title = relatedProduct.getElementsByClassName('item__title')[0].innerText
    let price = relatedProduct.getElementsByClassName('item__price')[0].innerText
    let img = relatedProduct.getElementsByClassName('item__img')[0].src
    addToCart(title, price, img)
    updateTotal()
}

function addToCart(title, price, img) { 
    //criando o novo elemento
    let newCartItem = document.createElement('div')
    newCartItem.classList.add('cart__content-box') // onde vai entrar o cartContentBoxHTML
    
    // carrinho em si, onde já pode existir outros produtos
    let carrinho = document.getElementsByClassName('carrinho__content')[0]
    // lista com os nomes dos produtos que já estão no carrinho, para controle de quantidades
    let cartItemsNames = carrinho.getElementsByClassName('cart-product-title')
    for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("Item já adicionado, controle a quantidade no carrinho")
            return
        }
    }

    let cartContentBoxHTML = `
                        <img src="${img}" alt="" class="img-cart">
                        <div class="detalhes-cart">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-qntd">
                        </div>
                        <svg class="remove-item" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgb(197, 63, 53);"><path d="M15 2H9c-1.103 0-2 .897-2 2v2H3v2h2v12c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V8h2V6h-4V4c0-1.103-.897-2-2-2zM9 4h6v2H9V4zm8 16H7V8h10v12z"></path></svg>
                        `
    newCartItem.innerHTML = cartContentBoxHTML
    carrinho.append(newCartItem)

    newCartItem.getElementsByClassName('remove-item')[0].addEventListener('click', removeItemCart)
    newCartItem.getElementsByClassName('cart-qntd')[0].addEventListener('change', updateItemQntd)
}


function removeItemCart(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.remove();
    updateTotal()
}

function buyClicked(){
    alert("Compra Efetuada!")
    let conteudoCart = document.getElementsByClassName("carrinho__content")[0]
    while (conteudoCart.hasChildNodes()){
        conteudoCart.removeChild(conteudoCart.firstChild)
    }
    updateTotal()
}


function updateItemQntd(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotal()
}

function updateTotal() {
    let cartContent = document.getElementsByClassName('carrinho__content')[0]
    let cartItems = document.getElementsByClassName('cart__content-box')
    let total = 0

    for (let i = 0; i < cartItems.length; i++) {
        let item = cartItems[i]
        let priceElement = item.getElementsByClassName('cart-price')[0]
        let quantity = item.getElementsByClassName('cart-qntd')[0].value

        let price = parseFloat(priceElement.innerText.replace("R$ ", ""))

        total += price * quantity
        console.log(total);
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName("cart-total-price")[0].innerText = "R$ " + total


}