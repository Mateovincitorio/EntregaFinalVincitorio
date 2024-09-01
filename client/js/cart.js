const modalContainer = document.getElementById("modal-container")
const modalOverlay = document.getElementById("modal-overlay")
const cartBtn = document.getElementById("cart-btn")
const increase =document.getElementById("increase")
const lupa = document.getElementById("lupa")
const trash = document.getElementById("trash")
const iva = 0

const mostrarCarrito = () => {
    modalContainer.innerHTML=""
    modalOverlay.style.display = "block"
    modalContainer.style.display = "block"
    const modalHeader = document.createElement("div")
    modalHeader.className = "modal-header"
    const modalClose = document.createElement("div")
    modalClose.innerText = "❌"
    modalClose.className = "modal-close"
    modalHeader.append(modalClose)
    modalClose.addEventListener("click", ()=>{
    modalOverlay.style.display="none"
    modalContainer.style.display="none"
    })


    const modalTitle = document.createElement("div")
    modalTitle.innerText = "Tu carrito"
    modalTitle.className = "modal-title"
    modalHeader.append(modalTitle)
    modalContainer.append(modalHeader)
    //modal body
    if (cart.length === 0) {
        const carritoVacio = document.createElement("div")
        carritoVacio.className="carritoVacio"
        carritoVacio.innerHTML=`
        <h2 class="warning">No se encuentra ningun producto</h2>
        `;
        modalContainer.append(carritoVacio)
        return
    }
    cart.forEach(product => {
        const {productName:nombreProducto, price:precioProducto, img:imagenProduct, quanty:quantyProd} = product;
        const productoAgregado = document.createElement("div")
        productoAgregado.className="productoAgregado"
        productoAgregado.innerHTML=`
        <div class="productoAgregado">
            <h2 class="productoH2">${nombreProducto}<img class = "imgProdAgre" src="${imagenProduct}" alt=""></h2>
            <div class = "divSpan"><span class="decrease">➖</span>
            <p class="quantity">${quantyProd}</p>
            <span class="increase">➕</span>
            </div>
            <p class="productoP">Precio: ${precioProducto}$ <span class="trash" id="trash">🗑️</span></p>
        </div>
        `
        modalContainer.append(productoAgregado)
    
    })
    
    const sumatoriaTotal = document.createElement("div")
    sumatoriaTotal.className = "sumatoriaTotal"
    sumatoriaTotal.innerHTML = `
    <div class="totalSuma">
        <h2 class = "h2suma">El total de la compra es de: ${sumatoria(cart)}$</h2>
    </div>
    `
    modalContainer.append(sumatoriaTotal)
}

lupa.addEventListener("click", function(e){
    e.preventDefault();
    const buscador = document.getElementById("buscadorProduct").value.toLocaleLowerCase();
    
    
    const encontrado = productos.find((el) =>el.productName.toLocaleLowerCase().includes(buscador));
    
    if (!cart.includes(encontrado)) {
        cart.push(encontrado);
    }else{
        console.log("no hay ningun producto");
    }
});

function sumatoria(cart) {
    const total = cart.reduce((acc, el) => {
        return acc + el.price;
    }, iva)
    console.log("El total de la compra es de: " + total)
    return total;
}
cartBtn.addEventListener("click", mostrarCarrito)

