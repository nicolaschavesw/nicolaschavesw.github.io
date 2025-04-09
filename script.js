document.addEventListener("DOMContentLoaded", () => {
    // Toggle de tema
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        themeToggle.textContent = "☀️ Modo Claro";
    } else {
        body.classList.add("light-mode");
        themeToggle.textContent = "🌙 Modo Oscuro";
    }

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        body.classList.toggle("light-mode");
        const isDark = body.classList.contains("dark-mode");
        themeToggle.textContent = isDark ? "☀️ Modo Claro" : "🌙 Modo Oscuro";
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });

    // Scroll suave al hacer clic en un link
    document.querySelectorAll('.sidebar li').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const sectionClass = this.dataset.section;
            const target = document.querySelector(`.${sectionClass}`);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Activar sección en el sidebar según el scroll
    const sections = document.querySelectorAll(".content section");
    const navLinks = document.querySelectorAll(".sidebar nav ul li");

    function highlightCurrentSection() {
        let indexActive = -1;
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom > 0) {
                indexActive = index;
            }
        });

        navLinks.forEach((li, index) => {
            li.classList.toggle("active", index === indexActive);
        });
    }

    window.addEventListener("scroll", highlightCurrentSection);
    highlightCurrentSection(); // Llamar una vez al cargar
});

const colors = [
    getComputedStyle(document.documentElement).getPropertyValue('--hover-color-about'),
    getComputedStyle(document.documentElement).getPropertyValue('--hover-color-experience'),
    getComputedStyle(document.documentElement).getPropertyValue('--hover-color-projects'),
    getComputedStyle(document.documentElement).getPropertyValue('--hover-color-skills'),
    getComputedStyle(document.documentElement).getPropertyValue('--hover-color-contact')
];

const image = document.getElementById('profile-image');
const container = document.getElementById('profile-container');

image.addEventListener('click', () => {
    // Apagar glow actual
    image.style.boxShadow = '0 0 0px transparent';
    image.style.borderColor = 'transparent';
    container.style.setProperty('--dynamic-glow', 'transparent');

    setTimeout(() => {
        // Elegir color aleatorio
        const newColor = colors[Math.floor(Math.random() * colors.length)].trim();

        // Encender nuevo glow en imagen
        image.style.boxShadow = `0 0 30px ${newColor}`;
        image.style.borderColor = newColor;

        // Cambiar el ::before usando una variable dinámica
        container.style.setProperty('--dynamic-glow', newColor);
    }, 300);
});

document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector('.tech-track');
    const slider = document.querySelector('.tech-slider');

    if (track && slider) {
        // Duplicar íconos para efecto infinito
        const icons = Array.from(track.children);
        icons.forEach(icon => {
            const clone = icon.cloneNode(true);
            track.appendChild(clone);
        });

        // Pausar animación al pasar el mouse
        slider.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });

        slider.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });
    }
});



/*
document.querySelectorAll(".sidebar nav ul li").forEach(li => {
    const button = li.querySelector("button");

    let positionX, positionY;
    let interval;
    let animatingToCenter = false;

    function resetToCenter() {
        positionX = (li.clientWidth - button.clientWidth) / 2;
        positionY = (li.clientHeight - button.clientHeight) / 2;
        button.style.left = `${positionX}px`;
        button.style.top = `${positionY}px`;
    }

    function getRandomDirection() {
        return Math.random() < 0.5 ? -1 : 1;
    }

    function moveButton() {
        clearInterval(interval);
        animatingToCenter = false;

        // Asegurar que la animación comience desde el centro después del hover
        resetToCenter();

        let directionX = getRandomDirection();
        let directionY = getRandomDirection();

        interval = setInterval(() => {
            positionX += 1 * directionX; 
            positionY += 1 * directionY; 

            if (positionX >= li.clientWidth - button.clientWidth || positionX <= 0) {
                directionX *= -1;
            }

            if (positionY >= li.clientHeight - button.clientHeight || positionY <= 0) {
                directionY *= -1;
            }

            button.style.left = `${positionX}px`;
            button.style.top = `${positionY}px`;
        }, 20);
    }

    function animateToCenter() {
        clearInterval(interval);
        animatingToCenter = true;

        let startX = positionX;
        let startY = positionY;
        let endX = (li.clientWidth - button.clientWidth) / 2;
        let endY = (li.clientHeight - button.clientHeight) / 2;
        let startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            let progress = (timestamp - startTime) / 300;
            if (progress > 1) progress = 1;

            let newX = startX + (endX - startX) * progress;
            let newY = startY + (endY - startY) * progress;
            button.style.left = `${newX}px`;
            button.style.top = `${newY}px`;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                animatingToCenter = false;
                resetToCenter(); // Asegurar que el botón queda en el centro antes de salir
            }
        }

        requestAnimationFrame(step);
    }

    li.addEventListener("mouseenter", animateToCenter);
    li.addEventListener("mouseleave", moveButton);
});
*/