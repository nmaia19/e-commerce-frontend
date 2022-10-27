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

if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}


function ready(){

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

    for (let i = 0; i < qntdInput.length; i++){
        let input = qntdInput[i]
        input.addEventListener('change', updateItemQntd)
    }

    // ----- ADICIONAR AO CARRINHO -----

    let addCart = document.getElementsByClassName('add-cart')

    for (let i = 0; i < addCart.length; i++) {
        let buttonAdd = addCart[i]
        buttonAdd.addEventListener('click', getProductData)
    }

}

// FUNÇÕES PRINCIPAIS CHAMADAS PELOS EVENTOS DA PÁGINA

function getProductData(event){
    let buttonClicked = event.target
    let relatedProduct = buttonClicked.parentElement
    let title = relatedProduct.getElementsByClassName('item__title')[0].innerText
    let price = relatedProduct.getElementsByClassName('item__price')[0].innerText
    let img = relatedProduct.getElementsByClassName('item__img')[0].src
    addToCart(title, price, img)
    updateTotal()
}

function addToCart(title, price, img){
    // carrinho em si, onde já pode existir outros produtos
    let carrinho = document.getElementsByClassName('carrinho__content')

    //criando o novo elemento
    let newCartItem = document.createElement('div')
    newCartItem.classList.add('cart__content-box')

    // nomes dos produtos que já estão no carrinho, para controle de quantidades
    let cartItemsNames = carrinho.getElementsByClassName('cart-product-title')
}

function removeItemCart(event){
    var buttonClicked = event.target
    console.log(buttonClicked.parentElement);
    buttonClicked.parentElement.remove();
    updateTotal()
}

function updateItemQntd(event){
    var input = event.target
    if(isNaN(input.value) || input.value <=0){
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
        total = Math.round(total * 100) / 100

        document.getElementsByClassName("cart-total-price")[0].innerText = "R$ " + total

    }


}