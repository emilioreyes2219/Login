
document.addEventListener("DOMContentLoaded", () => {
    const nombreUsuarioNav = document.getElementById("nombre-usuario-nav");
    const usuarioActivo = localStorage.getItem("usuario");
    
    if (usuarioActivo && nombreUsuarioNav) {
        nombreUsuarioNav.textContent = usuarioActivo;
    }

    const btnSalir = document.getElementById("btn-salir");
    if (btnSalir) {
        btnSalir.addEventListener("click", () => {
            localStorage.removeItem("usuario");
            localStorage.removeItem("correo");
            window.location.href = "login.html";
        });
    }

    const menuToggle = document.getElementById("menu-toggle");
    const wrapper = document.getElementById("wrapper");
    
    if (menuToggle && wrapper) {
        menuToggle.addEventListener("click", (e) => {
            e.preventDefault();
            // Alterna la clase 'toggled' para esconder o mostrar el menú lateral
            wrapper.classList.toggle("toggled");
        });
    }
    const formCaptura = document.getElementById("form-captura");
    const mensajeSistema = document.getElementById("mensaje-sistema");

    const modalElemento = document.getElementById('modalEdad');
    const modalBootstrap = new bootstrap.Modal(modalElemento);

    if (formCaptura) {
        formCaptura.addEventListener("submit", (e) => {
            e.preventDefault(); 

            mensajeSistema.textContent = "";
            mensajeSistema.className = "mt-3 text-center fw-medium small";

            const nombre = document.getElementById("nombre-alumno").value.trim();
            const correo = document.getElementById("correo-alumno").value.trim();
            const password = document.getElementById("password-alumno").value.trim();
            const ncontrol = document.getElementById("ncontrol-alumno").value.trim();
            const fechaNacimiento = document.getElementById("fecha-alumno").value;
               
            //Validaciones:

            if (!Util.soloLetras(nombre)) {
                mensajeSistema.textContent = "El nombre solo debe contener letras y espacios.";
                mensajeSistema.classList.add("text-danger");
                document.getElementById("nombre-alumno").focus();
                return;
            }

            if (!Util.validarCorreo(correo)) {
                mensajeSistema.textContent = "Por favor, ingresa un correo electrónico válido.";
                mensajeSistema.classList.add("text-danger");
                document.getElementById("correo-alumno").focus();
                return;
            }

            if (!Util.validarPassword(password)) {
                mensajeSistema.textContent = "La contraseña no cumple con los requisitos mínimos de seguridad.";
                mensajeSistema.classList.add("text-danger");
                document.getElementById("password-alumno").focus();
                return;
            }

            const soloNumeros = ncontrol.replace(/[^0-9]/g, "");
            if (ncontrol.length !== 8 || soloNumeros.length !== 8 || !Util.validarLongitud(ncontrol, 8)) {
                mensajeSistema.textContent = "El número de control debe tener exactamente 8 dígitos numéricos.";
                mensajeSistema.classList.add("text-danger");
                document.getElementById("ncontrol-alumno").focus();
                return;
            }

            const tituloModal = document.getElementById("titulo-modal");
            const textoModal = document.getElementById("texto-modal");
            const iconoModal = document.getElementById("icono-modal");

            if (Util.esMayorDeEdad(fechaNacimiento)) {
                iconoModal.innerHTML = '<i class="bi bi-person-check-fill text-success" style="font-size: 3rem;"></i>';
                tituloModal.textContent = "Acceso Autorizado";
                tituloModal.className = "fw-bold text-success";
                textoModal.textContent = `El alumno ${nombre} es MAYOR DE EDAD. Registro completado en el sistema con el No. de Control ${ncontrol}.`;
            } else {
                iconoModal.innerHTML = '<i class="bi bi-person-x-fill text-danger" style="font-size: 3rem;"></i>';
                tituloModal.textContent = "Restricción de Edad";
                tituloModal.className = "fw-bold text-danger";
                textoModal.textContent = `El alumno ${nombre} es MENOR DE EDAD. El sistema requiere supervisión para estudiantes menores de 18 años.`;
            }

            modalBootstrap.show();

            mensajeSistema.textContent = "Información procesada correctamente.";
            mensajeSistema.classList.add("text-success");

            formCaptura.reset();
        });
    }
});