const fones = [
    {
        nome: "AirDots 2",
        preco: "R$ 242.15",
        img: "./assets/produtos/airdots01.jpg",
        estoque: 20
    },
    {
        nome: "JBL Endurance",
        preco: "R$ 217.99",
        img: "./assets/produtos/jbl_endurance.png",
        estoque: 20
    },
    {
        nome: "Jbl Tune",
        preco: "R$ 89.95",
        img: "./assets/produtos/jbl_tune.png",
        estoque: 20
    },
    {
        nome: "AirDots 2",
        preco: "R$ 242.15",
        img: "./assets/produtos/airdots01.jpg",
        estoque: 20
    },

]

const tenis = [
    {
        nome: "Nike Waffle",
        preco: "R$ 349.15",
        img: "./assets/produtos/tenis04.png",
        estoque: 20
    },
    {
        nome: "Nike Court Legacy",
        preco: "R$ 499.99",
        img: "./assets/produtos/tenis03.png",
        estoque: 20
    },
    {
        nome: "Coreracer",
        preco: "R$ 68.95",
        img: "./assets/produtos/tenis01.png",
        estoque: 20
    },
    {
        nome: "Nike Court",
        preco: "R$ 479.15",
        img: "./assets/produtos/tenis02.png",
        estoque: 20
    },

]

const roupas = [
    {
        nome: "Kappa Básica",
        preco: "R$ 39.15",
        img: "./assets/produtos/camisa01.png",
        estoque: 20
    },
    {
        nome: "ADIDAS 3 STRIPES",
        preco: "R$ 178.99",
        img: "./assets/produtos/camisa02.png",
        estoque: 20
    },
    {
        nome: "AEROREADY",
        preco: "R$ 129.95",
        img: "./assets/produtos/camisa03.png",
        estoque: 20
    },
    {
        nome: "AEROREADY ROSA",
        preco: "R$ 129.95",
        img: "./assets/produtos/camisa04.png",
        estoque: 20
    },
]

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
    displayProducts()

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

    console.log(addCart);
    for (let i = 0; i < addCart.length; i++) {
        let buttonAdd = addCart[i]
        console.log(buttonAdd);
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

function buyClicked() {
    alert("Compra Efetuada!")
    let conteudoCart = document.getElementsByClassName("carrinho__content")[0]
    while (conteudoCart.hasChildNodes()) {
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


function displayProducts() {
    // pegando todos os produtos
    let allProducts = getProdutos()

    let gridLoja = document.getElementsByClassName('loja__content')[0]
    //criando o novo elemento


    allProducts.forEach(item => {
        let divProduto = document.createElement('div')
        divProduto.classList.add('content__item') // onde vai entrar o cartContentBoxHTML

        let itemsDisplay = ``

        itemsDisplay += `
        <img src=${item.img} alt="" class="item__img" />
        <h3 class="item__title">${item.nome}</h3>
        <span class="item__price">${item.preco}</span>
        <svg
        class="add-cart"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style="fill: rgb(255, 255, 255)"
        >
        <path
            d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921zM17.307 15h-6.64l-2.5-6h11.39l-2.25 6z"
        ></path>
        <circle cx="10.5" cy="19.5" r="1.5"></circle>
        <circle cx="17.5" cy="19.5" r="1.5"></circle>
        </svg>
        `
        divProduto.innerHTML = itemsDisplay
        gridLoja.append(divProduto)
    })
}

function getProdutos() {
    let produtos = [...fones, ...tenis, ...roupas]
    return produtos
}




