/**
 * ============================================================================
 *  utilería.js
 *  Librería funcional de validación y formateo para formularios.
 *  Sin frameworks. Sin componentes visuales. Solo funciones puras que
 *  regresan un resultado (boolean, número, string) para que TÚ decidas
 *  qué hacer con el DOM.
 *
 *  Autor: Curso de Desarrollo Web
 *  Uso:   <script src="js/utileria.js"></script>
 *         Todas las funciones quedan disponibles en el objeto global `Util`.
 * ============================================================================
 */

const Util = (() => {

  /**
   * validarCorreo
   * Valida que un texto tenga formato de correo electrónico válido
   * (usuario@dominio.extension).
   *
   * @param {string} correo - Correo electrónico a validar.
   * @returns {boolean} true si el formato es válido, false en caso contrario.
   *
   * @example
   * Util.validarCorreo("ana@mail.com");   // true
   * Util.validarCorreo("ana@mail");       // false
   */
  function validarCorreo(correo) {
    if (typeof correo !== "string") return false;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(correo.trim());
  }

  /**
   * soloLetras
   * Valida que un texto contenga únicamente letras (mayúsculas y
   * minúsculas), incluyendo vocales acentuadas (á, é, í, ó, ú, Á, É, Í, Ó, Ú),
   * la letra ñ/Ñ y espacios simples entre palabras (para nombres compuestos).
   *
   * @param {string} texto - Texto a validar.
   * @returns {boolean} true si solo contiene letras válidas, false si no.
   *
   * @example
   * Util.soloLetras("María José");  // true
   * Util.soloLetras("Peña3");       // false
   */
  function soloLetras(texto) {
    if (typeof texto !== "string" || texto.trim() === "") return false;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/;
    return regex.test(texto.trim());
  }

  /**
   * validarLongitud
   * Valida que la cantidad de dígitos de un número no supere una
   * longitud máxima permitida (útil para teléfonos, tarjetas, códigos, etc.).
   *
   * @param {number|string} numero - Número (o texto numérico) a validar.
   * @param {number} maxLongitud - Cantidad máxima de dígitos permitidos.
   * @returns {boolean} true si la longitud es válida, false si no.
   *
   * @example
   * Util.validarLongitud(9511234567, 10); // true
   * Util.validarLongitud(95112345678, 10); // false
   */
  function validarLongitud(numero, maxLongitud) {
    if (numero === null || numero === undefined) return false;
    const soloDigitos = String(numero).replace(/[^0-9]/g, "");
    if (soloDigitos.length === 0) return false;
    return soloDigitos.length <= maxLongitud;
  }

  /**
   * calcularEdad
   * Calcula la edad en años cumplidos a partir de una fecha de nacimiento.
   *
   * @param {string|Date} fechaNacimiento - Fecha en formato "YYYY-MM-DD" o un objeto Date.
   * @returns {number} Edad en años cumplidos (entero). NaN si la fecha no es válida.
   *
   * @example
   * Util.calcularEdad("2000-05-14"); // 26 (dependiendo de la fecha actual)
   */
  function calcularEdad(fechaNacimiento) {
    const nacimiento = new Date(fechaNacimiento);
    if (isNaN(nacimiento.getTime())) return NaN;

    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mesActual = hoy.getMonth() - nacimiento.getMonth();
    const diaActual = hoy.getDate() - nacimiento.getDate();

    if (mesActual < 0 || (mesActual === 0 && diaActual < 0)) {
      edad--;
    }
    return edad;
  }

  /**
   * esMayorDeEdad
   * Determina si, a partir de una fecha de nacimiento, la persona ya
   * cumplió 18 años.
   *
   * @param {string|Date} fechaNacimiento - Fecha en formato "YYYY-MM-DD" o un objeto Date.
   * @returns {boolean} true si es mayor de edad, false si no o si la fecha es inválida.
   *
   * @example
   * Util.esMayorDeEdad("2010-01-01"); // false
   */
  function esMayorDeEdad(fechaNacimiento) {
    const edad = calcularEdad(fechaNacimiento);
    if (isNaN(edad)) return false;
    return edad >= 18;
  }

  /**
   * validarPassword
   * Valida que una contraseña cumpla con reglas mínimas de seguridad:
   * al menos una mayúscula, una minúscula, un número, un carácter especial
   * y una longitud mínima de 8 caracteres.
   *
   * @param {string} password - Contraseña a validar.
   * @returns {boolean} true si cumple todas las reglas, false si no.
   *
   * @example
   * Util.validarPassword("Segura#123"); // true
   * Util.validarPassword("segura123");  // false (sin mayúscula ni especial)
   */
  function validarPassword(password) {
    if (typeof password !== "string") return false;
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneMinuscula = /[a-z]/.test(password);
    const tieneNumero = /[0-9]/.test(password);
    const tieneEspecial = /[^A-Za-z0-9]/.test(password);
    const longitudValida = password.length >= 8;
    return tieneMayuscula && tieneMinuscula && tieneNumero && tieneEspecial && longitudValida;
  }

  /* ==========================================================================
   *  SECCIÓN LIBRE — 2 funciones adicionales de invención propia
   * ========================================================================== */

  /**
   * formatearTelefono
   * Problema que resuelve: los usuarios escriben su teléfono de formas muy
   * distintas ("9511234567", "951 123 4567", "951-123-4567"...) y eso
   * ensucia las bases de datos. Esta función toma solo los dígitos y
   * regresa un formato legible y consistente: (XXX) XXX-XXXX.
   *
   * @param {number|string} numero - Número telefónico (con o sin formato previo).
   * @returns {string} Teléfono formateado, o el texto original si no tiene
   *                    exactamente 10 dígitos.
   *
   * @example
   * Util.formatearTelefono("9511234567"); // "(951) 123-4567"
   */
  function formatearTelefono(numero) {
    const digitos = String(numero).replace(/[^0-9]/g, "");
    if (digitos.length !== 10) return String(numero);
    return `(${digitos.slice(0, 3)}) ${digitos.slice(3, 6)}-${digitos.slice(6)}`;
  }

  /**
   * medirFortalezaPassword
   * Problema que resuelve: validarPassword() solo dice sí/no, pero un
   * usuario agradece saber QUÉ tan fuerte es su contraseña mientras la
   * escribe, no hasta que la rechacen. Esta función regresa una
   * calificación (0 a 4) y una etiqueta legible para dar retroalimentación
   * visual en tiempo real (por ejemplo, una barra de progreso).
   *
   * @param {string} password - Contraseña a evaluar.
   * @returns {{puntaje: number, etiqueta: string}} Objeto con el puntaje (0-4)
   *          y una etiqueta: "Muy débil", "Débil", "Media", "Fuerte", "Muy fuerte".
   *
   * @example
   * Util.medirFortalezaPassword("abc");        // { puntaje: 1, etiqueta: "Muy débil" }
   * Util.medirFortalezaPassword("Segura#123"); // { puntaje: 4, etiqueta: "Muy fuerte" }
   */
  function medirFortalezaPassword(password) {
    if (typeof password !== "string" || password.length === 0) {
      return { puntaje: 0, etiqueta: "Muy débil" };
    }
    let puntaje = 0;
    if (password.length >= 8) puntaje++;
    if (/[A-Z]/.test(password)) puntaje++;
    if (/[0-9]/.test(password)) puntaje++;
    if (/[^A-Za-z0-9]/.test(password)) puntaje++;

    const etiquetas = ["Muy débil", "Débil", "Media", "Fuerte", "Muy fuerte"];
    return { puntaje, etiqueta: etiquetas[puntaje] };
  }

  // API pública de la librería
  return {
    validarCorreo,
    soloLetras,
    validarLongitud,
    calcularEdad,
    esMayorDeEdad,
    validarPassword,
    formatearTelefono,
    medirFortalezaPassword
  };

})();

/* ============================================================================
 *  SUITE DE PRUEBAS EN CONSOLA
 *  Se ejecuta automáticamente al cargar el script para que, en cualquier
 *  página que incluya utileria.js, se pueda abrir la consola (F12) y ver
 *  el resultado de cada función documentada. Útil para capturas de pantalla.
 * ============================================================================ */
(function suiteDePruebas() {
  console.log(
    "%c utilería.js %c cargada correctamente ✔",
    "background:#c6432b;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold;",
    "color:#2e8b78;font-weight:bold;"
  );

  console.group("📋 Sello de pruebas — funciones obligatorias");
  console.table([
    { funcion: "validarCorreo('ana@mail.com')", resultado: Util.validarCorreo("ana@mail.com") },
    { funcion: "validarCorreo('ana@mail')", resultado: Util.validarCorreo("ana@mail") },
    { funcion: "soloLetras('María José')", resultado: Util.soloLetras("María José") },
    { funcion: "soloLetras('Peña3')", resultado: Util.soloLetras("Peña3") },
    { funcion: "validarLongitud(9511234567, 10)", resultado: Util.validarLongitud(9511234567, 10) },
    { funcion: "validarLongitud(95112345678, 10)", resultado: Util.validarLongitud(95112345678, 10) },
    { funcion: "calcularEdad('2000-05-14')", resultado: Util.calcularEdad("2000-05-14") },
    { funcion: "esMayorDeEdad('2010-01-01')", resultado: Util.esMayorDeEdad("2010-01-01") },
    { funcion: "validarPassword('Segura#123')", resultado: Util.validarPassword("Segura#123") },
    { funcion: "validarPassword('segura123')", resultado: Util.validarPassword("segura123") }
  ]);
  console.groupEnd();

  console.group("🆓 Sello de pruebas — funciones libres");
  console.table([
    { funcion: "formatearTelefono('9511234567')", resultado: Util.formatearTelefono("9511234567") },
    { funcion: "medirFortalezaPassword('Segura#123').etiqueta", resultado: Util.medirFortalezaPassword("Segura#123").etiqueta }
  ]);
  console.groupEnd();
})();
