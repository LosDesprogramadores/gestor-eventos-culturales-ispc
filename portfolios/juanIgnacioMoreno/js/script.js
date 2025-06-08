document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");

  toggle.addEventListener("click", () => {
    navbar.classList.toggle("open");
  });

  const secciones = document.querySelectorAll("main section");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  secciones.forEach(section => observer.observe(section));

  // formulario
  const form = document.getElementById('form');
  const btn = document.getElementById('button');
  const msgBox = document.getElementById('form-message');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const userName = document.getElementById('user_name').value.trim();
    const contactNumber = document.getElementById('contact_number').value.trim();
    const userEmail = document.getElementById('user_email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!userName || !contactNumber || !userEmail || !message) {
      msgBox.textContent = '⚠️ Por favor, completá todos los campos.';
      msgBox.className = 'error';
      msgBox.classList.add('error');
      msgBox.style.display = 'block';
      return;
    }

    btn.value = 'Enviando...';

    emailjs.sendForm('default_service', 'template_w11feqf', this)
      .then(() => {
        btn.value = 'Enviar mensaje';
        msgBox.textContent = 'Tu mensaje fue enviado con éxito.';
        msgBox.className = 'success';
        msgBox.classList.add('success');
        msgBox.style.display = 'block';
        setTimeout(() => {
  msgBox.style.display = 'none';
}, 3000);
        form.reset();
      }, (err) => {
        btn.value = 'Enviar mensaje';
        msgBox.textContent = 'Error al enviar el mensaje. Intentá de nuevo.';
        msgBox.className = 'error';
        msgBox.classList.add('error');
        msgBox.style.display = 'block';
        setTimeout(() => {
  msgBox.style.display = 'none';
}, 7000);
        console.error('EmailJS error:', err);
      });
  });

});
