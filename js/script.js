
$(document).ready(function() {
    $('.category_list .category_item[category="all"]').addClass('ct_item-active');


    $('.category_item').click(function() {
        let catProduct = $(this).attr('category');
        console.log(catProduct);


        $('.category_item').removeClass('ct_item-active');
        $(this).addClass('ct_item-active');

        $('.product-item').css('transform', 'scale(0)');

        function hideProduct(){
            $('.product-item').hide();
        } setTimeout(hideProduct,400);

        
            function showProduct(){
        $('.product-item[category="'+catProduct+'"]').css('transform', 'scale(1)');

        $('.product-item[category="'+catProduct+'"]').show();

            } setTimeout(showProduct,400);
        
        });
        $('.category_item[category="all"]').click(function(){
            function showAll(){
                $('.product-item').show();     
                $('.product-item').css('transform','scale(1)');
            }setTimeout(showAll,400);
            


    });

});



// let carritoVisible = false;

// if (document.readyState == 'loading') {
//     document.addEventListener('DOMContentLoaded',ready);
// }else {
//     ready();
// }


// function ready() {
    
//   let botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
//   for (let i = 0; i < botonesEliminarItem.length; i++) {
//     let button = botonesEliminarItem[i];
//     button.addEventListener('click', eliminarItemCarrito);
// }

// let botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
// for(let i = 0; i < botonesSumarCantidad.length; i++) {
//     let button = botonesSumarCantidad[i];
//     button.addEventListener('click', sumarCantidad);
//     }

//     let botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
// for(let i = 0; i < botonesRestarCantidad.length; i++) {
//     let button = botonesRestarCantidad[i];
//     button.addEventListener('click', restarCantidad);
//     }

//     let botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
//     for(let i = 0; i < botonesAgregarAlCarrito.length; i++) {
//         let button = botonesAgregarAlCarrito[i];
//         button.addEventListener('click', agregarAlCarritoClicked);
//     }

   

    
// }

// function eliminarItemCarrito(event) {
//     let buttonClicked = event.target;
//     buttonClicked.parentElement.parentElement.remove();

    
//     actualizarTotalCarrito();

    
//     ocultarCarrito();

// }

// function actualizarTotalCarrito() {
    
//     let carritoContenedor = document.getElementsByClassName('carrito')[0];
//     let caritoItems = carritoContenedor.getElementsByClassName('carrito-item');
//     let total = 0;

   
//     for (let i=0; i < caritoItems.length; i++ ) {
//         let item = caritoItems[i];
//         let precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
//         console.log(precioElemento);

//         let precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
//         console.log(precio);
//         let cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
//         let cantidad = cantidadItem.value;
//         console.log(cantidad);
//         total = total + (precio * cantidad);

//     }
//     total = Math.round(total*100)/100;
//     document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ',00';
// }


// function ocultarCarrito(){
//     let carritoItems = document.getElementsByClassName('carrito-items-container')[0];
//     if(carritoItems.childElementCount == 0){
//         let carrito = document.getElementsByClassName('carrito')[0];
//         carrito.style.marginRight = '-100%';
//         carrito.style.opacity = '0';
//         carritoVisible = false;


//         let items = document.getElementsByClassName('carrito-items-container')[0];
//         items.style.width = '100%';


//     }
// }


// function sumarCantidad(event) {
//     let buttonClicked = event.target;
//     let selector = buttonClicked.parentElement;
//     let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
//     console.log(cantidadActual);
//     cantidadActual++;
//     selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;

//     actualizarTotalCarrito();
 
// }

// function restarCantidad(event) {
//     let buttonClicked = event.target;
//     let selector = buttonClicked.parentElement;
//     let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
//     console.log(cantidadActual);
//     cantidadActual--;

//     if(cantidadActual >= 1){
//         selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;

//         actualizarTotalCarrito();
//     }
// }

//     function agregarAlCarritoClicked(event) {
//         let button = event.target;
//         let item = button.parentElement;
//         let titulo = item.getElementsByClassName('titulo-item')[0].innerText;
//         console.log(titulo);
//         let precio = item.getElementsByClassName('precio-item')[0].innerText;
//         let imagenSrc = item.getElementsByClassName('img-item')[0].src;
//         console.log(imagenSrc);

//         agregarItemAlCarrito(titulo,precio,imagenSrc);

//         hacerVisibleCarrito();

// }

// function agregarItemAlCarrito(titulo, precio, imagenSrc) {
//     let item = document.createElement('div');
//     item.classList.add('item');
//     let itemsCarrito = document.getElementsByClassName('carrito-items-container')[0];

//     //comprueba si el item ya se encuentra en el carrito
//     let nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
//     for(let i=0; i < nombresItemsCarrito.length; i++ ) {
//         if(nombresItemsCarrito[i].innerText.toLowerCase() === titulo.toLowerCase()){
//             alert("el item ya se encuentra en el carrito");
//             return;
//         }
//     }

//     let itemCarritoContenido = `
//     <div class="carrito-item container-product-cart">
//         <img src="${imagenSrc}" alt="" width="80px" class="cart-image">
//             <div class="carrito-item-detalles">
//                 <span class="carrito-item-titulo">${titulo}</span>
//                     <div class="selector-cantidad">
//                          <i class="fa-solid fa-minus restar-cantidad"></i>
//                          <input type="text" value="1" class="carrito-item-cantidad" disabled>
//                         <i class="fa-solid fa-plus sumar-cantidad"></i>
//                     </div>
//                 <span class="carrito-item-precio">${precio}</span>
//             </div>
//                 <span class="btn-eliminar">
//                     <i class="fa-solid fa-trash "></i>
//             </span>
//     </div>
//     `
//     item.innerHTML = itemCarritoContenido;
//     itemsCarrito.append(item);

//     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

//     let botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
//     botonSumarCantidad.addEventListener('click', sumarCantidad);    

//     let botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
//     botonRestarCantidad.addEventListener('click', restarCantidad);  

    
//     actualizarTotalCarrito();


// }

// //funcion para pagar el carrito
// function pagarClicked(event){
    

//     let carritoItems = document.getElementsByClassName('carrito-items-container')[0];
//     while(carritoItems.hasChildNodes()){
//         carritoItems.removeChild(carritoItems.firstChild);
//     }
//     actualizarTotalCarrito();

//     ocultarCarrito();

// }

// //funcion para hacer visible el carrito en la vista del usuario
// function hacerVisibleCarrito(){
//     carritoVisible = true;
//     let carrito = document.getElementsByClassName('carrito')[0];
//     carrito.style.marginRight = '0';
//     carrito.style.opacity = '1';

//     let items = document.getElementsByClassName('contenedor-items')[0];
//     // items.style.width = '72%';
// }


