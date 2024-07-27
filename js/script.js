
//funcion para mostrar productos segun la categoria
$(document).ready(function() {
    $('.category_list .category_item[category="all"]').addClass('ct_item-active');


    $('.category_item').click(function() {
        var catProduct = $(this).attr('category');
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

//variable que mantiene visible el estado del carrito

var carritoVisible = false;
//Esperamos a que la pagina este cargada para continuar con el script
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded',ready);
}else {
    ready();
}


function ready() {
    //funcionalidad a los botones eliminar del carrito
  var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
  for (var i = 0; i < botonesEliminarItem.length; i++) {
    var button = botonesEliminarItem[i];
    button.addEventListener('click', eliminarItemCarrito);
}

var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
for(var i = 0; i < botonesSumarCantidad.length; i++) {
    var button = botonesSumarCantidad[i];
    button.addEventListener('click', sumarCantidad);
    }

    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
for(var i = 0; i < botonesRestarCantidad.length; i++) {
    var button = botonesRestarCantidad[i];
    button.addEventListener('click', restarCantidad);
    }

    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i = 0; i < botonesAgregarAlCarrito.length; i++) {
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);

    
}
//Elimino item del carrito
function eliminarItemCarrito(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();

    
    actualizarTotalCarrito();

    
    ocultarCarrito();

}
//Actualiza el total del carrito al hacer click en el boton
function actualizarTotalCarrito() {
    //Selecciono el contenedor del carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var caritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;

    //Recorro los items del carrito
    for (var i=0; i < caritoItems.length; i++ ) {
        var item = caritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        console.log(precioElemento);

        //quito el simbolo de pesos y la coma
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        console.log(precio);
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = cantidadItem.value;
        console.log(cantidad);
        total = total + (precio * cantidad);

    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ',00';
}


function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount == 0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;


        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';


    }
}


function sumarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;

    actualizarTotalCarrito();
 
}

function restarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual--;

    if(cantidadActual >= 1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;

        actualizarTotalCarrito();
    }
}

    function agregarAlCarritoClicked(event) {
        var button = event.target;
        var item = button.parentElement;
        var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
        console.log(titulo);
        var precio = item.getElementsByClassName('precio-item')[0].innerText;
        var imagenSrc = item.getElementsByClassName('img-item')[0].src;
        console.log(imagenSrc);

        agregarItemAlCarrito(titulo,precio,imagenSrc);

        hacerVisibleCarrito();

}

function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    var item = document.createElement('div');
    item.classList.add('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //comprueba si el item ya se encuentra en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0; i < nombresItemsCarrito.length; i++ ) {
        if(nombresItemsCarrito[i].innerText.toLowerCase === titulo.toLowerCase){
            alert("el item ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
    <div class="carrito-item">
        <img src="${imagenSrc}" alt="" width="80px">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                    <div class="selector-cantidad">
                         <i class="fa-solid fa-minus restar-cantidad"></i>
                         <input type="text" value="1" class="carrito-item-cantidad" disabled>
                        <i class="fa-solid fa-plus sumar-cantidad"></i>
                    </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
                <span class="btn-eliminar">
                    <i class="fa-solid fa-trash "></i>
            </span>
    </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click', sumarCantidad);    

    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click', restarCantidad);    


}

//funcion para pagar el carrito
function pagarClicked(event){
    alert("Impresion realizada con éxito!");

    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while(carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();

    ocultarCarrito();

}

//funcion para hacer visible el carrito en la vista del usuario
function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor-items')[0];
    // items.style.width = '72%';
}