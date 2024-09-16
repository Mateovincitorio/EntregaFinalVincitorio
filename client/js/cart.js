const modalContainer = document.getElementById("modal-container")
const modalOverlay = document.getElementById("modal-overlay")
const cartBtn = document.getElementById("cart-btn")

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
        const {productName:nombreProducto, price:precioProducto, img:imagenProduct, quanty:quantyProd, id:idProduct} = product;
        const productoAgregado = document.createElement("div")
        productoAgregado.className="productoAgregado"
        productoAgregado.innerHTML=`
        <div class="productoAgregado">
            <h2 class="productoH2">${nombreProducto}<img class = "imgProdAgre" src="${imagenProduct}" alt=""></h2>
            <div class = "divSpan"><span class="decrease">➖</span>
            <p class="quantity">${quantyProd}</p>
            <span class="increase">➕</span>
            </div>
            <p class="productoP">Precio: ${precioProducto * product.quanty}$ <span class="trash" >🗑️</span></p>
        </div>
        `
        modalContainer.append(productoAgregado)


        

        const decrease = productoAgregado.querySelector(".decrease");
        const increase = productoAgregado.querySelector(".increase");

        decrease.addEventListener("click", () => {
            if (product.quanty !== 1) {
                product.quanty--;
                mostrarCarrito();
                guardarLocal();
            }
        });

        increase.addEventListener("click", () => {
            product.quanty++;
            mostrarCarrito();
            guardarLocal();
        });

        const trash = productoAgregado.querySelector(".trash")
        trash.addEventListener("click",()=>{
            eliminarProd(idProduct)
        })
        
    })
    const total = cart.reduce((acc,el)=>acc + el.price * el.quanty, 0)
        const sumatoriaTotal = document.createElement("div")
        sumatoriaTotal.className = "sumatoriaTotal"
        sumatoriaTotal.innerHTML = `
        <div class="totalSuma">
            <h2 class = "h2suma">Total de su compra: ${total}$</h2>
        </div>
        `
        modalContainer.append(sumatoriaTotal)

        
}

const eliminarProd = (id) => {
    const elementoAEliminar =  cart.findIndex((el)=> el.id === id)
    cart.splice(elementoAEliminar,1)
    mostrarCarrito();
    guardarLocal();
}
cartBtn.addEventListener("click", mostrarCarrito)