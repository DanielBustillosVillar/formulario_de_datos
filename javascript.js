var datos = [
];

document.addEventListener("DOMContentLoaded", function() {
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
    for (var i = 0; i < datos.length; i++) {
        var fila_datos = tabla.insertRow();
        for (var j = 0; j < datos[i].length; j++) {
            var celda = fila_datos.insertCell(j);
            celda.textContent = datos[i][j];
        }
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