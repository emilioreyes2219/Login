document.addEventListener("DOMContentLoaded", () => {

    const usuarios = [
        {
            nombre: "Administrador",
            correo: "admin@correo.com",
            password: "Admin#123"
        },
        {
            nombre: "Juan",
            correo: "juan@correo.com",
            password: "Juan#123"
        },
        {
            nombre: "Invitado",
            correo: "invitado@correo.com",
            password: "Invitado#123"
        }
    ];

    const formulario = document.getElementById("loginForm");
    const mensaje = document.getElementById("mensaje");

    formulario.addEventListener("submit", (e) => {

        e.preventDefault();

        const correo = document.getElementById("correo").value.trim();
        const password = document.getElementById("password").value.trim();

        mensaje.textContent = "";

        if (!Util.validarCorreo(correo)) {
            mensaje.textContent = "Correo electrónico inválido.";
            return;
        }

        if (!Util.validarPassword(password)) {
            mensaje.textContent = "La contraseña no cumple el formato requerido.";
            return;
        }

        const usuario = usuarios.find(u =>
            u.correo === correo &&
            u.password === password
        );

        if (!usuario) {
            mensaje.textContent = "Correo o contraseña incorrectos.";
            return;
        }

        localStorage.setItem("usuario", usuario.nombre);
        localStorage.setItem("correo", usuario.correo);

        window.location.href = "index.html";

    });

});