const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");

const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

const CONVERSION_NUMERO_MAS_GRANDE = 10000;
const FACTOR_PARA_TRUNCAR_A_DOS_DECIMALES = 100;

let cont =0;
let totalEnProductos = 0;
let costoTotal = 0;
let datos = new Array();

function validarCantidad() {
    if (txtNumber.value.length == 0) {
        return false;
    }
    if (isNaN(txtNumber.value)) {
        return false;
    }

    if (Number(txtNumber.value) <= 0) {
        return false;
    }

    return true;
};

function getPrecio() {
    return Math.round(Math.random() * CONVERSION_NUMERO_MAS_GRANDE) / FACTOR_PARA_TRUNCAR_A_DOS_DECIMALES;
}

btnAgregar.addEventListener("click", function (event) {

    let isValid = true;
    event.preventDefault();
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    txtName.style.border = "";
    txtNumber.style.border = "";

    if (txtName.value.length < 3) {
        txtName.style.border = "thin red solid";
        alertValidacionesTexto.innerHTML = "<strong>El nombre del producto no es correcto</strong><br>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }

    if (!validarCantidad()) {
        txtNumber.style.border = "thin red solid";
        alertValidacionesTexto.innerHTML += "<strong>La cantidad no es correcta</strong><br>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }

    if (isValid) {
        cont++;
        let precio = getPrecio();
        let row = `<tr>
                <td>${cont}</td>
                <td>${txtName.value}</td>
                <td>${txtNumber.value}</td>
                <td>$${precio}</td>
        </tr>
        `;

        let elemento = {
            "cont": cont,
            "nombre": txtName.value,
            "cantidad": txtNumber.value,
            "precio": precio
        };

        datos.push(elemento);
        localStorage.setItem("datos",JSON.stringify(datos));

        cuerpoTabla.insertAdjacentHTML("beforeend",row);
       
        contadorProductos.innerText = cont;
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;
        costoTotal += (precio * Number(txtNumber.value));
        precioTotal.innerText = new Intl.NumberFormat("es-MX",{style:"currency", currency:"MXN"}).format(costoTotal);

        let resumen = {
                        "cont":cont,
                        "totalEnProductos": totalEnProductos,
                        "costoTotal": costoTotal.toFixed(2)
        };

        localStorage.setItem("resumen",JSON.stringify(resumen));

        //Limpiar variables
        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();
    }
});

window.addEventListener("load",function(event){
    event.preventDefault();
    if (this.localStorage.getItem("datos") != null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
        datos.forEach((dato) => {
              let row = `<tr>
                <td>${dato.cont}</td>
                <td>${dato.nombre}</td>
                <td>${dato.cantidad}</td>
                <td>$${dato.precio}</td>
                </tr>
                `;
        cuerpoTabla.insertAdjacentHTML("beforeend",row);
        });
    }

    if (this.localStorage.getItem("resumen") != null){
        let resumen = JSON.parse(this.localStorage.getItem("resumen"));
        costoTotal = resumen.costoTotal;
        totalEnProductos = resumen.totalEnProductos;
        cont = resumen.cont;
    }

    contadorProductos.innerText = cont;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = new Intl.NumberFormat("es-MX",{style:"currency", currency:"MXN"}).format(costoTotal);

});

btnClear.addEventListener("click", function(event){

    //Eliminar localStorage
    localStorage.clear();

    //Limpiar tabla
    cuerpoTabla.innerHTML = "";

    //Limpiar campos
    txtName.value = "";
    txtNumber.value = "";

    //Limpiar borde de campos
    txtName.style.border = "";
    txtNumber.style.border = "";

    //Limpiar alerts
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";

    //Limpiar resumen
    cont = 0;
    totalEnProductos = 0;
    costoTotal = 0;

    contadorProductos.innerText = 0;
    productosTotal.innerText = 0;
    precioTotal.innerText = "$0";
    datos = new Array();
});
