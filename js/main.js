const btnCart = document.querySelector(".container-cart-icon")
const containerCartProducts = document.querySelector(".container-cart-products")

btnCart.addEventListener("click", () => {
    containerCartProducts.classList.toggle("hidden-cart")
});


/*--------------------------------------------*/
const cartInfo = document.querySelector(".cartProduct");
const rowProduct= document.querySelector(".row-product");

/*          Lista de productos           */
const productsList = document.querySelector(".container-items");

/*          Variables productos            */
let allProducts = []
let valorTotal = document.querySelector(".total-pagar");
const countProducts = document.querySelector("#contador-productos");

let finalizarCompra = document.querySelector(".btn-finalizar-compra");


function carritoLS() {
    localStorage.setItem('carrito', JSON.stringify(allProducts));
} 


function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        allProducts = JSON.parse(carritoGuardado);

        mostrarProducto();
    }console.log(carritoGuardado)
}

productsList.addEventListener("click" , e => {

    if (e.target.classList.contains("btn-add-carrito")){
        const product = e.target.parentElement
        
        const infoProduct = {
            cantidad:1,
            titulo: product.querySelector("h2").textContent,
            precio: product.querySelector("p").textContent
        };

        const existente = allProducts.some(
            product => product.titulo === infoProduct.titulo) 
        
        if (existente){
            const products = allProducts.map (product => {
                if (product.titulo === infoProduct.titulo){
                    product.cantidad++;
                    return product
                } else {
                    return product
                }
            })

            allProducts = [...products];
        } else {
            allProducts = [...allProducts, infoProduct]
        }
        

        mostrarProducto();
        carritoLS();
    }
})

rowProduct.addEventListener("click", e => {
    if (e.target.classList.contains("icon-close")){
        const product = e.target.parentElement;
        const titulo = product.querySelector("p").textContent;

        allProducts = allProducts.filter(
            product => product.titulo !== titulo );
    };

    mostrarProducto();
    carritoLS();
})



const mostrarProducto = () => {


    rowProduct.innerHTML = "";

        let total = 0;
        let totalProductos = 0;


    allProducts.forEach(product => {
        const containerProduct = document.createElement("div")
        containerProduct.classList.add("cart-product")

        containerProduct.innerHTML = `
        <div class="info-cart-product">
            <span class="cantidad-producto-carrito">${product.cantidad}</span>
            <p class="titulo-producto-carrito">${product.titulo}</p>
            <span class="precio-producto-carrito">${product.precio}</span>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24  24" stroke-width="1.5" stroke="currentColor" 
            class="icon-close">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        `

    rowProduct.append(containerProduct);
    
    total = 
    total + parseInt(product.cantidad * product.precio.slice(1));
    totalProductos = totalProductos + product.cantidad;

    });



    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalProductos

};

cargarCarritoDesdeLocalStorage();
mostrarProducto();
