const listProducts = document.getElementById('registerProducts');
const addProduct = document.querySelector('.add-product-form');
let formProduct =  document.getElementById('registerProduct');
const url = 'http://144.22.38.142:8080/api/chocolate';
let alerts = document.querySelector('.alert');
let output = ' ';


fetch(`${url}/all`)
    .then(response => response.json())
    .then(data => renderProducts (data));

///Get
//Mostrar todos los productos
const  renderProducts  = (products) => {
    products.forEach(product => {
        output += `
        <tr>
        <td>${product.reference}</td>
        <td>${product.category}</td>
        <td>${product.description}</td>
        <td>${product.availability}</td>
        <td>${product.price}</td>
        <td>${product.quantity}</td>
        <td><img src="${product.photography}" all="Chocolates Willy Wonka"  width="100px"/></td>
        <td>
        <button type="button" class="btn btn-success btn-editar-abrir" data-bs-toggle="modal" data-bs-target="#editModalProduct" > Editar</button>
        <button type="button" id="btnDeleteProduct" class="btn btn-danger" > Eliminar</button>
        </td>
        </tr> `
    });
    listProducts.innerHTML = output;
}


//Post
//Crear un nuevo producto

// Create - Imsert new user
// Method Post

addProduct.addEventListener('submit', (e) =>{
    e.preventDefault();
    let referencia = document.getElementById('referencia').value.trim();
    let categoria = document.getElementById('categoria').value.trim();
    let descripcion = document.getElementById('descripcion').value.trim();
    let disponibilidad = document.getElementById('disponibilidad').value.trim();
    let precio = document.getElementById('precio').value.trim();
    let cantidad = document.getElementById('cantidad').value.trim();
    let imagen = document.getElementById('imagen').value;

    if ( referencia == "" && categoria == "" && descripcion == "" && disponibilidad == "" && precio == "" && cantidad == "" && imagen == "") {
        alerts.innerHTML = '<span>*todos los campos deben estar llenos</span>'
        alerts.classList.add('bad');
        setTimeout(() => {
            alerts.innerHTML = " ";
            alerts.classList.remove('bad');
        }, 3000);
    }else{
        let newProduct = {
            "reference": referencia, 
            "category": categoria, 
            "description": descripcion, 
            "availability": disponibilidad,
            "price": precio, 
            "quantity": cantidad, 
            "photography": imagen
        }
        fetch(`${url}/new`,{
            method: 'POST',
            headers:{
                'content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(data => {
                alerts.innerHTML = '<span>Producto agregado correctamente</span>'
                alerts.classList.add('ok');
                setTimeout(() => {
                    alerts.innerHTML = " ";
                    alerts.classList.remove('ok');
                    const dataArr = [];
                    dataArr.push(data);
                    renderProducts(dataArr);
                    formProduct.reset();
                }, 3000);
                
            })
    }
    
    
    
});

const catchProducts = (reference) => {
    $.ajax({
        url: `${url}/` + reference,
        type: "GET",
        datatype: "JSON",
        success: function(respuesta) {
            /* console.log("ID USUARIO =" + respuesta.id); */
            miIndice = respuesta.reference;
            //fila = $(this).closest("tr");
            var reference = respuesta.reference;
            var category = respuesta.category;
            var description = respuesta.description;
            var availability = respuesta.availability;
            var price = respuesta.price;
            var quantity = respuesta.quantity;
            var photography = respuesta.photography;

            $("#referenciaEdit").val(reference);
            $("#categoriaEdit").val(category);
            $("#descripcionEdit").val(description);
            $("#disponibilidadEdit").val(availability);
            $("#precioEdit").val(price);
            $("#cantidadEdit").val(quantity);
            $("#imagenEdit").val(photography);

            var modal = new bootstrap.Modal(document.getElementById("editModalProduct"), {});
            modal.show();
        }
    });
}


const editDates = () => {
    var reference = miIndice;
    var reference = $.trim($("#referenciaEdit").val());
    var category = $.trim($("#categoriaEdit").val());
    var description = $.trim($("#descripcionEdit").val());
    var availability = $.trim($("#disponibilidadEdit").val());
    var price = $.trim($("#precioEdit").val());
    var quantity = $.trim($("#cantidadEdit").val());
    var photography = $.trim($("#imagenEdit").val());


    let myData = {
        reference: reference,
        category: category,
        description: description,
        availability: availability,
        price: price,
        quantity: quantity,
        photography: photography,
    }
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: `${url}/update`,
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function(respuesta) {
           /*  location.reload(); */

        }
    });
}


//Elimina un producto
const deleteUser = (reference) => {
    let myData = {
        "reference": reference
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: `${url}/` + reference, 
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function(respuesta) {
            alerts.innerHTML = '<span>Producto eliminado</span>'
            alerts.classList.add('bad');
            setTimeout(() => {
                alerts.innerHTML = " ";
                alerts.classList.remove('bad');
                location.reload()
            }, 3000);
        }
    });
}


$(document).on("click", "#btnDeleteProduct", function() {
    fila = $(this).closest("tr");
    var reference = fila.find('td:eq(0)').text();
    $.ajax({
        url:  `${url}/`+ reference,
        type: "GET",
        datatype: "JSON",
        success: function(respuesta) {
            miRef = respuesta.reference;
            deleteUser(miRef);
        }
    });
});


//Traer la infromacion al Modal
//llenar campos modal
$(document).on("click", ".btn-editar-abrir", function() {
    fila = $(this).closest("tr");
    var reference = fila.find('td:eq(0)').text();
    /* var password = fila.find('td:eq(5)').text(); */
    catchProducts(reference);

});



$(document).on("click", "#btnEditProduct", function(e) {
    e.preventDefault();
    editDates();
});