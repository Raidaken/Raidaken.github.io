console.log('Archivo JavaScript cargado correctamente.');

const estudiantes = [];
const nombresEstudiantes = new Set();

function agregarEstudiante() {
    const entradaNombre = document.getElementById('name');
    const nombre = entradaNombre.value.trim();
    const materia = document.getElementById('subject').value;
    const nota = parseInt(document.getElementById('grade').value, 10);

    if (nombre && materia && !isNaN(nota)) {
        const estudianteExistente = estudiantes.find(estudiante => estudiante.nombre === nombre);
        if (estudianteExistente) {
            estudianteExistente.notas.push({ materia, nota });
        } else {
            estudiantes.push({ nombre, notas: [{ materia, nota }] });
            nombresEstudiantes.add(nombre);
            actualizarListaNombres();
        }
        
        entradaNombre.value = '';
        document.getElementById('subject').value = '';
        document.getElementById('grade').value = '';

        mostrarEstudiantes();
    } else {
        alert('Por favor, complete todos los campos correctamente.');
    }
}

function mostrarEstudiantes() {
    const tablaEstudiantes = document.getElementById('students');
    tablaEstudiantes.innerHTML = '';

    estudiantes.forEach(estudiante => {
        estudiante.notas.forEach(entradaNota => {
            const fila = document.createElement('tr');

            const celdaNombre = document.createElement('td');
            celdaNombre.textContent = estudiante.nombre;
            fila.appendChild(celdaNombre);

            const celdaMateria = document.createElement('td');
            celdaMateria.textContent = entradaNota.materia;
            fila.appendChild(celdaMateria);

            const celdaNota = document.createElement('td');
            celdaNota.textContent = entradaNota.nota;
            fila.appendChild(celdaNota);

            tablaEstudiantes.appendChild(fila);
        });
    });
}

function actualizarListaNombres() {
    const listaNombres = document.getElementById('names');
    listaNombres.innerHTML = '';

    nombresEstudiantes.forEach(nombre => {
        const opcion = document.createElement('option');
        opcion.value = nombre;
        listaNombres.appendChild(opcion);
    });
}

function calcularPromediosNotas() {
    return estudiantes.map(estudiante => {
        const total = estudiante.notas.reduce((suma, entrada) => suma + entrada.nota, 0);
        const promedio = total / estudiante.notas.length;
        return { nombre: estudiante.nombre, promedio };
    });
}

function mostrarMejorEstudiante() {
    if (estudiantes.length === 0) {
        alert('No hay estudiantes en la lista.');
        return;
    }

    const promediosNotas = calcularPromediosNotas();
    const mejorEstudiante = promediosNotas.reduce((prev, curr) => (curr.promedio > prev.promedio ? curr : prev));
    alert(`El mejor alumno es ${mejorEstudiante.nombre} con un promedio de ${mejorEstudiante.promedio.toFixed(2)}.`);
}

function mostrarPromedioNotas() {
    if (estudiantes.length === 0) {
        alert('No hay estudiantes en la lista.');
        return;
    }

    const promediosNotas = calcularPromediosNotas();
    let mensaje = 'Promedio de notas por alumno:\n';
    promediosNotas.forEach(estudiante => {
        mensaje += `${estudiante.nombre}: ${estudiante.promedio.toFixed(2)}\n`;
    });
    alert(mensaje);
}

function mostrarEstudiantesAprobados() {
    const materia = prompt('Ingrese la materia para verificar los aprobados:');
    if (!materia) return;

    const estudiantesAprobados = estudiantes.filter(estudiante => estudiante.notas.some(nota => nota.materia === materia && nota.nota >= 60));
    if (estudiantesAprobados.length === 0) {
        alert(`No hay estudiantes aprobados en ${materia}.`);
    } else {
        const nombresAprobados = estudiantesAprobados.map(estudiante => estudiante.nombre).join(', ');
        alert(`Estudiantes aprobados en ${materia}: ${nombresAprobados}.`);
    }
}
