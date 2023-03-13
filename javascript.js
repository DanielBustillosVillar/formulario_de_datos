var datos = [
];
var datos = JSON.parse(localStorage.getItem("mis_datos")) || [];
document.addEventListener("DOMContentLoaded", function() {
    // Recuperar los datos de la memoria caché del navegador si existen
    var datos_cacheados = localStorage.getItem('datos');
    if (datos_cacheados !== null) {
        datos = JSON.parse(datos_cacheados);
        actualizarTabla(datos);
    }
    document.getElementById("boton_exportar").addEventListener("click", function() {
        agregarDatos();
    });

    document.getElementById("boton_descargar").addEventListener("click", function() {
        /* agregarDatos(); */
        var archivo_xlsx = crearArchivoXLSX(datos);

        // Crea un enlace de descarga y lo simula en un clic
        var enlace_descarga = document.createElement("a");
        enlace_descarga.download = "datos.xlsx";
        enlace_descarga.href = archivo_xlsx;
        enlace_descarga.click();

        // Elimina el enlace de descarga
        enlace_descarga.remove();
    });
});
function agregarDatos() {
    var fila = [
        document.getElementById("nombre").value,
        document.getElementById("direccion").value,
        document.getElementById("telefono").value,
        document.getElementById("pariente").value,
        document.getElementById("parentesco").value,
        document.getElementById("telefono_pariente").value
    ];

    datos.push(fila);

    // Almacenar los datos en la memoria caché del navegador
    localStorage.setItem('datos', JSON.stringify(datos));

    document.getElementById("nombre").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("pariente").value = "";
    document.getElementById("parentesco").value = "";
    document.getElementById("telefono_pariente").value = "";

    // Ordenar el array alfabéticamente
    datos.sort(function(a, b) {
        return a[0].localeCompare(b[0]);
    });

    actualizarTabla(datos);
}

function actualizarTabla(datos) {
    // Ordenar el array alfabéticamente
    datos.sort(function(a, b) {
        return a[0].localeCompare(b[0]);
    });

    // Obtiene la tabla y elimina todas las filas existentes
    var tabla = document.getElementById("datos_tabla");
    tabla.innerHTML = "";

    // Agrega las filas de datos
    // Agrega las filas de datos
// Agrega las filas de datos
for (var i = 0; i < datos.length; i++) {
    var fila_datos = tabla.insertRow();
    for (var j = 0; j < datos[i].length; j++) {
        var celda = fila_datos.insertCell(j);
        celda.textContent = datos[i][j];
    }
    var celda_editar = fila_datos.insertCell(-1);
    var boton_editar = document.createElement("button");
    boton_editar.textContent = "Modificar";
    boton_editar.addEventListener("click", (function(index) {
        return function() {
            editarFila(index);
        }
    })(i));
    celda_editar.appendChild(boton_editar);

    var celda_eliminar = fila_datos.insertCell(-1);
    var boton_eliminar = document.createElement("button");
    boton_eliminar.textContent = "Eliminar";
    boton_eliminar.classList.add('eliminar')
    boton_eliminar.addEventListener("click", (function(index) {
        return function() {
            eliminarFila(index);
        }
    })(i));
    celda_eliminar.appendChild(boton_eliminar);
}

}
function editarFila(indice) {
    var fila = datos[indice];
    document.getElementById("nombre").value = fila[0];
    document.getElementById("direccion").value = fila[1];
    document.getElementById("telefono").value = fila[2];
    document.getElementById("pariente").value = fila[3];
    document.getElementById("parentesco").value = fila[4];
    document.getElementById("telefono_pariente").value = fila[5];

    // Eliminar la fila actual del array
    datos.splice(indice, 1);

    // Actualizar la tabla sin la fila eliminada
    actualizarTabla(datos);
}

function eliminarFila(index) {
    // Muestra una ventana de confirmación antes de eliminar la fila
    if (confirm("¿Seguro que deseas eliminar esta fila?")) {
      // Elimina la fila del array
      datos.splice(index, 1);
  
      // Almacena los datos en la memoria caché del navegador
      localStorage.setItem('datos', JSON.stringify(datos));
  
      // Actualiza la tabla con los datos actualizados
      actualizarTabla(datos);
    }
  }
  
function crearArchivoXLSX(datos) {
    // agregar encabezados a la matriz de datos
    datos.unshift(['Nombre', 'Dirección', 'Teléfono', 'Pariente', 'Parentesco', 'Teléfono del pariente']);
    
    var workbook = XLSX.utils.book_new();
    var worksheet = XLSX.utils.aoa_to_sheet(datos);
  
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
  
    var archivo_binario = XLSX.write(workbook, {bookType: "xlsx", type: "binary"});
    var archivo_base64 = btoa(archivo_binario);
    var archivo_xlsx = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," + archivo_base64;
  
    return archivo_xlsx;
  }