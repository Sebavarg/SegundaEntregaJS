function Alumno(nombre, apellido, nota) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.nota = nota;
}

let nombreUsuario, nombreCurso;

document.getElementById("formulario-datos-docente").addEventListener("submit", manejadorFormulario);

function manejadorFormulario(e) {
    //previene el evento de refresh de el boton summit
    e.preventDefault();
    nombreUsuario = document.getElementById("nombreUsuario").value;
    nombreCurso = document.getElementById("nombreCurso").value;

    const listadoAlumnos = document.getElementById("listadoAlumnos");
    const alumnos = JSON.parse(localStorage.getItem(nombreCurso));

    (alumnos == null) ? listadoAlumnos.innerHTML = "<h1> Aun debes añadir Alumnos</h1>": mostrarAlumnos(alumnos);

    mostrarPanel();
}

function mostrarAlumnos(alumnos) {
    let listadoAlumnos = document.getElementById("listadoAlumnos");
    // vacialo!! para  que el for each no nos produzca el error de duplicarnos el objeto
    listadoAlumnos.innerHTML = "";

    alumnos.forEach(alumno => {
        let li = document.createElement("li");
        li.innerHTML = `
        <hr> Alumno: ${alumno.nombre} - ${alumno.apellido} - Nota:
        ${alumno.nota}     `;
        const botonBorrar = crearBotonEliminar(alumno);
        li.appendChild(botonBorrar);
        listadoAlumnos.appendChild(li);
    });
}

function crearBotonEliminar(alumno) {
    const botonBorrar = document.createElement("button");
    botonBorrar.innerText = "Borrar";
    botonBorrar.addEventListener("click", () => {
        eliminarAlumno(alumno);
    });
    return botonBorrar;
}

function mostrarPanel() {
    const cargaCurso = document.getElementById("cargaCurso");

    cargaCurso.innerHTML = `<h3>Bienvenido ${nombreUsuario} al curso ${nombreCurso}</h3>
    <form id="formulario-datos-alumno">
      <input type="text" id="nombreAlumno" placeholder="Nombre alumno">
      <input type="text" id="apellidoAlumno" placeholder="Apellido alumno">
      <input type="number" id="nota" placeholder="Nota "> 
      <button type="submit">Agregar alumno</button>
    </form>`;

    document.getElementById("formulario-datos-alumno").addEventListener("submit", agregarAlumnos);
}

function agregarAlumnos(e) {
    e.preventDefault();
    const nombreAlumno = document.getElementById("nombreAlumno").value;
    const apellidoAlumno = document.getElementById("apellidoAlumno").value;
    const nota = document.getElementById("nota").value;

    const alumno = new Alumno(nombreAlumno, apellidoAlumno, nota);

    validarCampos(alumno);

    const alumnosEnLocalStorage = JSON.parse(localStorage.getItem(nombreCurso));

    if (alumnosEnLocalStorage == null) {
        localStorage.setItem(nombreCurso, JSON.stringify([alumno]));
        mostrarAlumnos([alumno]);
    } else {
        alumnosEnLocalStorage.push(alumno);
        localStorage.setItem(nombreCurso, JSON.stringify(alumnosEnLocalStorage));
        mostrarAlumnos(alumnosEnLocalStorage);
    }
    e.target.reset();
}

function validarCampos(alumno) {
    console.log(alumno || "Error en alumno para validar")
    if (alumno.nombreAlumno == "" || alumno.apellidoAlumno == "") {
        alert("El nombre no puede estar vacio")
    }
}

function eliminarAlumno(alumno) {
    console.log(alumno || "Error en alumno para eliminar")
    const peliculasEnLocalStorage = JSON.parse(localStorage.getItem(nombreCurso));
    const nuevoArray = peliculasEnLocalStorage.filter(item => item.nombre != alumno.nombre);
    localStorage.setItem(nombreCurso, JSON.stringify(nuevoArray));
    mostrarAlumnos(nuevoArray);
}

document.getElementById("btnObtenerEscala").addEventListener("click", manejadorEscala);

function manejadorEscala(e) {
    e.preventDefault();
    let puntaje = document.getElementById("puntaje").value;
    let notaMin = (puntaje * 0.5) / 10;
    let notaMax = (puntaje * 1.5) / 10;
    let resultado;
    let listaResultado = [];

    for (let i = 1; i < 11; i++) {
        notaMin = (puntaje * (i - 0.5)) / 10;
        if (i == 1) {
            notaMin = 0;
        }
        notaMax = ((puntaje * (i + 0.5)) / 10) - 0.1;
        if (i == 10) {
            notaMax = puntaje;
        }
        resultado = "La nota " + i + " es desde " + notaMin + " puntos hasta " + notaMax + " puntos ";
        listaResultado.push(resultado);
    }
    let containerEscala = document.getElementById("containerEscala");
    containerEscala.innerHTML = `<hr> 
    <p> ${listaResultado.join("--//--")}</p> `;
}