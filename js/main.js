const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");

const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

const CONVERSION_NUMERO_MAS_GRANDE = 10000;
const FACTOR_PARA_TRUNCAR_A_DOS_DECIMALES = 100;

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

    event.preventDefault();
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    txtName.style.border = "";
    txtNumber.style.border = "";

    if (txtName.value.length < 3) {
        txtName.style.border = "thin red solid";
        alertValidacionesTexto.innerHTML = "<strong>El nombre del producto no es correcto</strong><br>";
        alertValidaciones.style.display = "block";
    }

    if (!validarCantidad()) {
        txtNumber.style.border = "thin red solid";
        alertValidacionesTexto.innerHTML += "<strong>La cantidad no es correcta</strong><br>";
        alertValidaciones.style.display = "block";
    }
});