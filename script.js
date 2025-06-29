document.addEventListener('DOMContentLoaded', () => {
  // --- Variables Globales ---
  const navbar = document.getElementById('navbar');
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('.nav-link');
  const welcomeBanner = document.getElementById('welcome-banner');
  const closeWelcomeBannerBtn = document.getElementById('close-welcome-banner');
  const welcomeMessageSpan = document.getElementById('welcome-message');
  const headerHeight = navbar.offsetHeight;

  // --- Mensaje de Bienvenida ---
  function showWelcomeMessage() {
      let userName = localStorage.getItem('cssManualUserName');
      if (!userName) {
          userName = prompt("¡Bienvenido/a al Manual Interactivo de CSS!\nPor favor, ingresa tu nombre:", "Explorador CSS");
          if (userName) {
              localStorage.setItem('cssManualUserName', userName);
          } else {
              userName = "Amigo/a"; // Default si cancela o no ingresa nada
          }
      }

      if (userName) {
          welcomeMessageSpan.textContent = `👋 ¡Hola, ${userName}! Listo/a para sumergirte en CSS?`;
          welcomeBanner.classList.add('show');
          navbar.classList.add('banner-visible');

          const autoHideTimeout = setTimeout(hideWelcomeBanner, 7000);
          closeWelcomeBannerBtn.addEventListener('click', () => {
              clearTimeout(autoHideTimeout);
              hideWelcomeBanner();
          });
      }
  }

  function hideWelcomeBanner() {
      welcomeBanner.classList.remove('show');
      navbar.classList.remove('banner-visible');
  }

  showWelcomeMessage();

  // --- Navegación Responsive (Menú Hamburguesa) ---
  if (navToggle) {
      navToggle.addEventListener('click', () => {
          navMenu.classList.toggle('active');
          const icon = navToggle.querySelector('i');
          const isActive = navMenu.classList.contains('active');
          icon.classList.toggle('fa-bars', !isActive);
          icon.classList.toggle('fa-times', isActive);
          navToggle.setAttribute('aria-label', isActive ? 'Cerrar menú' : 'Abrir menú');
      });
  }

  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          if (navMenu.classList.contains('active')) {
              navToggle.click(); // Simula un clic para cerrar y cambiar el ícono
          }
      });
  });

  // --- Smooth Scroll Ajustado ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
              let bannerOffset = welcomeBanner.classList.contains('show') ? welcomeBanner.offsetHeight : 0;
              const elementPosition = targetElement.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerHeight - bannerOffset - 15;

              window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });

  // --- Funcionalidad de Copiar Código ---
  document.querySelectorAll('.copy-btn').forEach(button => {
      button.addEventListener('click', (event) => {
          const preElement = event.target.closest('.code-example').querySelector('pre');
          const codeToCopy = preElement.querySelector('code').innerText;

          navigator.clipboard.writeText(codeToCopy).then(() => {
              const originalIconHTML = button.innerHTML;
              const originalTitle = button.title;
              button.innerHTML = '<i class="fas fa-check"></i> Copiado';
              button.title = '¡Copiado!';
              setTimeout(() => {
                  button.innerHTML = originalIconHTML;
                  button.title = originalTitle;
              }, 2000);
          }).catch(err => {
              console.error('Error al copiar: ', err);
          });
      });
  });

  // --- HTML Base para Ambas Tarjetas de Perfil ---
  const profileCardHTML = `
<div class="profile-card" id="live-profile-card">
<img src="https://i.pravatar.cc/150?u=cssmanual" alt="Foto de Perfil" class="profile-pic">
<h3 class="profile-name">Alex Developer</h3>
<p class="profile-title">Frontend Enthusiast</p>
<p class="profile-bio">Creando interfaces web interactivas y accesibles. Amante del café y el código limpio.</p>
<div class="profile-social-links">
  <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
  <a href="#" aria-label="GitHub"><i class="fab fa-github"></i></a>
  <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
</div>
<button class="profile-contact-btn">Contactar</button>
</div>`;

  // --- Editor Interactivo ("¡A Practicar!") ---
  const htmlStructurePreview = document.getElementById('html-structure-preview');
  const cssEditorLive = document.getElementById('css-editor-live');
  const applyCssLiveBtn = document.getElementById('apply-css-live-btn');
  const resetCssLiveBtn = document.getElementById('reset-css-live-btn');
  const dynamicStylesLive = document.getElementById('dynamic-styles-live');

  // **CORRECCIÓN DE ESPECIFICIDAD:** El CSS de práctica ahora apunta al ID del contenedor
  const initialLiveEditorCSS = `/* Estilos iniciales para la tarjeta de perfil en el editor */
#practica #live-profile-card {
font-family: 'Arial', sans-serif;
background-color: #ffffff;
border: 1px solid #ddd;
border-radius: 10px;
box-shadow: 0 5px 15px rgba(0,0,0,0.1);
padding: 25px;
width: 320px;
max-width: 100%;
text-align: center;
margin: 20px auto;
box-sizing: border-box;
transition: all 0.3s ease;
}
#practica #live-profile-card:hover {
transform: translateY(-5px);
box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}
#practica #live-profile-card .profile-pic {
width: 120px;
height: 120px;
border-radius: 50%;
border: 4px solid #fff;
box-shadow: 0 3px 6px rgba(0,0,0,0.15);
margin-bottom: 15px;
}
#practica #live-profile-card .profile-name {
font-size: 1.8em;
color: #333;
margin: 0 0 5px 0;
font-weight: 600;
}
#practica #live-profile-card .profile-title {
font-size: 1em;
color: #666;
margin-bottom: 15px;
font-style: italic;
}`;

  let isCssApplied = true;

  if (htmlStructurePreview) {
      htmlStructurePreview.innerHTML = profileCardHTML;
  }
  if (cssEditorLive) {
      cssEditorLive.value = initialLiveEditorCSS;
  }
  if (dynamicStylesLive) {
      dynamicStylesLive.innerHTML = initialLiveEditorCSS;
  }

  if (applyCssLiveBtn) {
      applyCssLiveBtn.addEventListener('click', () => {
          if (dynamicStylesLive) {
              dynamicStylesLive.innerHTML = cssEditorLive.value;
              if (!isCssApplied && cssEditorLive.value.trim() !== '') {
                  isCssApplied = true;
                  resetCssLiveBtn.innerHTML = '<i class="fas fa-undo"></i> Resetear CSS';
              }
          }
          const originalBtnText = applyCssLiveBtn.innerHTML;
          applyCssLiveBtn.innerHTML = '<i class="fas fa-check-circle"></i> Aplicado';
          setTimeout(() => { applyCssLiveBtn.innerHTML = originalBtnText; }, 1500);
      });
  }

  if (resetCssLiveBtn) {
      resetCssLiveBtn.addEventListener('click', () => {
          if (isCssApplied) {
              if (dynamicStylesLive) dynamicStylesLive.innerHTML = '';
              if (cssEditorLive) {
                  cssEditorLive.value = `/* ¡Ahora te toca a ti! Escribe tu CSS aquí. */
/* No olvides apuntar a: #practica #live-profile-card */

#practica #live-profile-card {

}`;
              }
              resetCssLiveBtn.innerHTML = '<i class="fas fa-magic"></i> Integrar CSS de Fábrica';
              isCssApplied = false;
          } else {
              if (cssEditorLive) cssEditorLive.value = initialLiveEditorCSS;
              if (dynamicStylesLive) dynamicStylesLive.innerHTML = initialLiveEditorCSS;
              resetCssLiveBtn.innerHTML = '<i class="fas fa-undo"></i> Resetear CSS';
              isCssApplied = true;
          }
      });
  }

  // --- Proyecto Final: Mostrar HTML y CSS ---
  const finalHtmlCodeElement = document.getElementById('final-html-code');
  const finalCssCodeElement = document.getElementById('final-css-code');
  const profileCardFinalContainer = document.querySelector('.profile-card-final-container');

  // **CORRECCIÓN DE ESPECIFICIDAD:** El CSS final ahora apunta a la clase del contenedor
  const finalProfileCardCSS = `/* CSS completo para la tarjeta de perfil final */
.profile-card-final-container .profile-card {
font-family: 'Helvetica Neue', Arial, sans-serif;
background-color: white;
border: 1px solid #ddd;
width: 300px;
margin: 20px auto;
padding: 20px;
border-radius: 8px;
box-shadow: 0 4px 8px rgba(0,0,0,0.1);
box-sizing: border-box;
text-align: center;
transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.profile-card-final-container .profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
.profile-card-final-container .profile-card .profile-pic {
width: 100px;
height: 100px;
border-radius: 50%;
border: 3px solid #fff;
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
margin-bottom: 15px;
}
.profile-card-final-container .profile-card .profile-name {
color: #333;
margin: 10px 0 5px 0;
font-size: 1.5em;
font-weight: bold;
}
.profile-card-final-container .profile-card .profile-title {
color: #777;
font-size: 0.9em;
margin-bottom: 15px;
}
.profile-card-final-container .profile-card .profile-bio {
font-size: 0.9em;
color: #555;
line-height: 1.4;
margin-bottom: 20px;
}
.profile-card-final-container .profile-card .profile-social-links {
display: flex;
justify-content: center;
margin-bottom: 20px;
gap: 10px;
}
.profile-card-final-container .profile-card .profile-social-links a {
margin: 0 8px;
color: #3498db;
font-size: 1.3em;
transition: color 0.3s ease, transform 0.3s ease;
}
.profile-card-final-container .profile-card .profile-social-links a:hover {
color: #2c3e50;
transform: scale(1.1) translateY(-2px);
}
.profile-card-final-container .profile-card .profile-contact-btn {
background-color: #3498db;
color: white;
border: none;
padding: 10px 15px;
border-radius: 5px;
cursor: pointer;
font-size: 0.95em;
transition: background-color 0.3s ease;
}
.profile-card-final-container .profile-card .profile-contact-btn:hover {
background-color: #2980b9;
}`;

  if (profileCardFinalContainer) {
      const finalCardDiv = document.createElement('div');
      finalCardDiv.innerHTML = profileCardHTML;
      const cardElement = finalCardDiv.firstElementChild;
      cardElement.removeAttribute('id'); // El ID solo es para la sección de práctica
      profileCardFinalContainer.innerHTML = '';
      profileCardFinalContainer.appendChild(cardElement);

      const finalStyleTag = document.createElement('style');
      finalStyleTag.id = 'final-project-styles';
      finalStyleTag.innerHTML = finalProfileCardCSS;
      document.head.appendChild(finalStyleTag);
  }

  if (finalHtmlCodeElement) {
      finalHtmlCodeElement.textContent = profileCardHTML.trim().replace(' id="live-profile-card"', ''); // Mostramos el HTML limpio
  }
  if (finalCssCodeElement) {
      finalCssCodeElement.textContent = finalProfileCardCSS.trim();
  }

  // --- Funcionalidad de Pestañas (Tabs) ---
  window.showTab = function (event, tabName) {
      const tabContents = document.querySelectorAll('.tab-content');
      tabContents.forEach(tc => tc.style.display = 'none');
      const tabButtons = document.querySelectorAll('.tab-button');
      tabButtons.forEach(btn => btn.classList.remove('active'));
      document.getElementById(tabName).style.display = 'block';
      event.currentTarget.classList.add('active');
  }

  const firstTabButton = document.querySelector('.code-tabs .tab-button');
  if (firstTabButton) {
      firstTabButton.click();
  }
});