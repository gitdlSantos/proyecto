function getUsersFromLocalStorage() {
    var usersString = localStorage.getItem('users');
    return usersString ? JSON.parse(usersString) : {};
}

function saveUsersToLocalStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

var users = getUsersFromLocalStorage();

function register() {
    var email = document.getElementById("email").value;
    var Pass = document.getElementById("Pass").value;
    var confirmPass = document.getElementById("confirmPass").value;
    var error = document.getElementById("error");

    if (email === '' || Pass === '' || confirmPass === '') {
        error.textContent = "Todos los campos son obligatorios";
        return;
    }

    if (!email.includes('@')) {
        error.textContent = "El correo electrónico debe contener '@'";
        return;
    }

    if (Pass !== confirmPass) {
        error.textContent = "Las contraseñas no coinciden";
        return;
    }

    if (!/[A-Z]/.test(Pass)) {
        error.textContent = "La contraseña debe contener al menos una mayúscula";
        return;
    }

    if (users.hasOwnProperty(email)) {
        error.textContent = "Ya existe un usuario registrado con este correo electrónico";
        return;
    }

    users[email] = Pass;
    saveUsersToLocalStorage(users);
    alert("Registro exitoso");
    error.textContent = "";
}

function generateCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captcha;
  }
  
  // Inicializar el CAPTCHA al cargar la página
  window.onload = function() {
    const captchaBox = document.getElementById('captcha-box');
    const captcha = generateCaptcha();
    captchaBox.innerText = captcha;
    captchaBox.dataset.captcha = captcha; // Guardar el valor del CAPTCHA en un atributo de datos
  };
  
  // Validar el CAPTCHA y realizar inicio de sesión al enviar el formulario
  document.getElementById('captcha-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente
  
    const inputCaptcha = document.getElementById('captcha-input').value;
    const captchaBox = document.getElementById('captcha-box');
    const captcha = captchaBox.dataset.captcha;
  
    if (inputCaptcha !== captcha) {
      alert('El CAPTCHA ingresado es incorrecto.');
      return; // Detener el proceso si el CAPTCHA es incorrecto
    }
  
    // Si el CAPTCHA es correcto, realizar inicio de sesión
    const email = document.getElementById('email').value;
    const password = document.getElementById('Pass').value;
    
    // Aquí puedes agregar el código para realizar el inicio de sesión utilizando el email y password
    // Por ejemplo, podrías enviar estos datos a un servidor para autenticar al usuario
  
    // Simulación de inicio de sesión exitoso
    alert('Inicio de sesión exitoso para: ' + email);
  });