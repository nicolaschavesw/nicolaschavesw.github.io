document.addEventListener("DOMContentLoaded", () => {

    // ===== 1. SCROLL SUAVE AL HACER CLIC EN EL SIDEBAR =====
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

    // ===== 2. ACTIVAR SECCIÓN EN SIDEBAR SEGÚN EL SCROLL =====
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
    highlightCurrentSection();

    // ===== 3. DETECTAR ENLACES EXTERNOS Y ABRIRLOS EN NUEVA PESTAÑA =====
    const links = document.querySelectorAll("a[href^='http']");
    links.forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
        }
    });

    // ===== 4. CARRUSEL DE TECNOLOGÍAS (TECH SLIDER) =====
    const techTrack = document.querySelector('.tech-track');
    const techSlider = document.querySelector('.tech-slider');

    if (techTrack && techSlider) {
        const icons = Array.from(techTrack.children);
        icons.forEach(icon => {
            const clone = icon.cloneNode(true);
            techTrack.appendChild(clone);
        });

        techSlider.addEventListener('mouseenter', () => {
            techTrack.style.animationPlayState = 'paused';
        });

        techSlider.addEventListener('mouseleave', () => {
            techTrack.style.animationPlayState = 'running';
        });
    }

    // ===== 5. PAUSAR CARRUSEL DE SKILLS (opcional si hay otro track para skills) =====
    const skillsTrack = document.querySelector('.skills-carousel-track');
    if (skillsTrack) {
        skillsTrack.addEventListener('mouseenter', () => {
            skillsTrack.style.animationPlayState = 'paused';
        });
        skillsTrack.addEventListener('mouseleave', () => {
            skillsTrack.style.animationPlayState = 'running';
        });
    }

    // ===== 6. EFECTO DE GLOW AL CLICK EN IMAGEN =====
    const colors = [
        getComputedStyle(document.documentElement).getPropertyValue('--hover-color-about'),
        getComputedStyle(document.documentElement).getPropertyValue('--hover-color-experience'),
        getComputedStyle(document.documentElement).getPropertyValue('--hover-color-projects'),
        getComputedStyle(document.documentElement).getPropertyValue('--hover-color-skills'),
        getComputedStyle(document.documentElement).getPropertyValue('--hover-color-contact')
    ];

    const image = document.getElementById('profile-image');
    const container = document.getElementById('profile-container');

    if (image && container) {
        image.addEventListener('click', () => {
            image.style.boxShadow = '0 0 0px transparent';
            image.style.borderColor = 'transparent';
            container.style.setProperty('--dynamic-glow', 'transparent');

            setTimeout(() => {
                const currentColor = getComputedStyle(container).getPropertyValue('--dynamic-glow').trim();
                const otherColors = colors.filter(c => c.trim() !== currentColor);
                const newColor = otherColors[Math.floor(Math.random() * otherColors.length)].trim();

                image.style.boxShadow = `0 0 30px ${newColor}`;
                image.style.borderColor = newColor;
                container.style.setProperty('--dynamic-glow', newColor);
            }, 300);
        });
    }

    // ===== 7. EFECTO DE CARGA DE HABILIDAD =====
    let skillsObserver;

    function initSkillsObserver() {

        if (skillsObserver) {
            skillsObserver.disconnect();
        }

        skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill = entry.target.querySelector('.fill');
                    const skillValue = entry.target.dataset.skill;
                    // Resetear la animación
                    fill.style.width = '0';
                    fill.classList.remove('filled');

                    void fill.offsetWidth;

                    setTimeout(() => {
                        fill.style.width = skillValue;
                        fill.classList.add('filled');
                    }, 50);
                }
            });
        }, {
            threshold: 0.5
        });

        // Observar todas las tarjetas de habilidades
        document.querySelectorAll('.skill-card').forEach(card => {
            skillsObserver.observe(card);
        });
    }

    // ===== 8. TRADUCCIONES =====
    const translations = {
        es: {
            "title.page": "Portafolio - Gabriel Nicolás Chaves Torres",

            "sidebar.about": "Sobre mí",
            "sidebar.experience": "Experiencia",
            "sidebar.projects": "Proyectos",
            "sidebar.skills": "Habilidades",
            "sidebar.contact": "Contacto",

            "title.hi": "Hola, soy ",
            "about.description.1": "Ingeniero en Multimedia y desarrollador de Unity especializado en experiencias de realidad virtual (VR) y optimización de entornos 3D interactivos.",
            "about.description.2": "Con experiencia en C#, Unity, modelado 3D y desarrollo web, combino habilidades técnicas y creatividad para crear experiencias inmersivas e intuitivas. Me apasiona el diseño de videojuegos y la innovación tecnológica aplicada a la educación y simulación.",

            "title.experience": "Experiencia",
            "title.experience.technologies": "Tecnologías: ",

            "title.experience.1": "Project Manager",
            "title.experience.1.date": "Ene 2022 - Jul 2022",
            "title.experience.1.company": "Proyecto Aplicación 3D e integración Multimedia",
            "title.experience.1.description.1": "Desarrollo de un entorno 3D del campus de la <strong>Universidad Militar Nueva Granada</strong> enfocado principalmente en el desarrollo de maneras de movilización de un usuario dentro de un entorno 3D.",
            "title.experience.1.description.2": "En colaboración con <strong>Picolab</strong> como cliente, el proyecto se desarrollo en <strong>Unreal Engine 4</strong> y tuvo como base los planos de la infraestructura del campus de la Universidad.",
            "title.experience.1.task.1": "Planificación general de las etapas del proyecto y entregables.",
            "title.experience.1.task.2": "Gestion y supervisión de las actividades de los compañeros de trabajo.",
            "title.experience.1.task.3": "Montaje y Diseño del entorno 3D.",
            "title.experience.1.task.4": "Creación de mecanicas de movilidad en el entorno 3D.",
            "title.experience.1.task.5": "Optimización y pruebas para la presentación del proyecto.",

            "title.experience.2": "Asistente en el area de Tecnologia",
            "title.experience.2.date": "Jun 2023 - Nov 2023",
            "title.experience.2.company": "Brinsa S.A.",
            "title.experience.2.description.1": "Durante mi práctica profesional, participé activamente en la creación de experiencias de <strong>realidad virtual</strong> centradas en los productos de las marcas <strong>Blancox y Refisal</strong>. Me desempeñé en un entorno colaborativo, aplicando habilidades técnicas y de planeación para el desarrollo de proyectos inmersivos.",
            "title.experience.2.task.1": "Participación en el proceso de ideación y análisis de oportunidades, con más de 40 propuestas seleccionadas para ejecución futura.",
            "title.experience.2.task.2": "Soporte en proyectos de ciberseguridad, desarrollando interfaces web para el seguimiento interno de pruebas.",
            "title.experience.2.task.3": "Modelado 3D de productos para su implementación en entornos VR.",
            "title.experience.2.task.4": "Integración y optimización de escenas interactivas dentro de Unity.",
            "title.experience.2.task.5": "Asistencia en los procesos internos del area de tecnologia.",

            "title.experience.3": "Desarrollador Jr Unity",
            "title.experience.3.date": "Jul 2024 - Nov 2024",
            "title.experience.3.company": "Brinsa S.A.",
            "title.experience.3.description.1": "Desarrolle experiencias de realidad virtual con ayuda de Unity, Autodesk Maya y 3D Max para las capacitaciones de la seguridad en las alturas y la seguridad vial.",
            "title.experience.3.task.1": "Realización de modelos 3D para los escenarios de capacitación.",
            "title.experience.3.task.2": "Creación de codigo para el funcionamiento y comportamiento de la experiencia junto con mecanicas VR.",
            "title.experience.3.task.3": "Creación de los espacios como ciudades o autopistas para el desarrollo de las experiencias.",
            "title.experience.3.task.4": "Planeación de eventos y situaciones de la experiencia VR.",
            "title.experience.3.task.5": "Optimización de modelos y Assets 3D.",

            "title.projects": "Proyectos",

            "title.project.1": "Don't Sleep",
            "title.project.1.description.1": "Juego realizado para la Game Jam de <strong>1</strong> dia de Generation Colombia con la cohorte 5, fue realizado en <strong>Unity</strong>",
            "title.project.1.description.2": "El tema de la Game Jam fue 'Sin Violencia'",
            "title.project.1.gamejam": "Mira la Game Jam aqui",

            "title.project.2": "Hangover Journey",
            "title.project.2.description.1": "Juego realizado para la Game Jam de <strong>2</strong> dias de Generation Colombia con la cohorte 5, fue realizado en <strong>Unity</strong>",
            "title.project.2.description.2": "El tema de la Game Jam fue 'Caminos'",
            "title.project.2.gamejam": "Mira la Game Jam aqui",

            "title.project.3": "Metamorphosis",
            "title.project.3.description.1": "Juego realizado para la Game Jam de <strong>3</strong> dias de Generation Colombia con la cohorte 5, fue realizado en <strong>Unity</strong>",
            "title.project.3.description.2": "El tema de la Game Jam fue 'Evolución'",
            "title.project.3.gamejam": "Mira la Game Jam aqui",

            "title.project.4": "The-Dwelling-Of-The-Damned",
            "title.project.4.description.1": "Juego realizado como proyecto final para Generation Colombia con la cohorte 5, fue realizado en <strong>Unity</strong>",
            "title.project.4.description.2": "No tiene un tema especifico, duro alrededor de 2 semanas la realización de este proyecto",

            "title.project.5": "Campus UMNG Virtual",
            "title.project.5.video": "Tu navegador no soporta el elemento de video.",
            "title.project.5.description.1": "Proyecto realizado para las materias 'Aplicaciones 3D' y 'Integración Multimedia' de la Universidad Militar Nueva Granada, fue realizado en <strong>Unreal Engine 4.0</strong>",
            "title.project.5.description.2": "El proyecto busca aplicar diferentes formas de solucionar la movilidad de un usuario dentro de un espacio virtual gigante",

            "title.project.6": "Pong Game",
            "title.project.6.description.1": "Es un juego realizado como proyecto personal en <strong>Unity 5.0</strong>",
            "title.project.6.description.2": "El proyecto esta actualmente en desarrollo :)",

            "title.skills": "Habilidades",

            "title.skill.unity": "Unity: Desarrollo avanzado en VR, experiencias y videojuegos 3D",
            "title.skill.unrealengine": "Unreal Engine: Desarrollo de experiencias, renderizado y cinematicas",
            "title.skill.maya": "Autodesk Maya: Modelado 3D, texturización y animación",
            "title.skill.github": "GitHub: Control de versiones y colaboración en proyectos",
            "title.skill.git": "Git: Control de versiones y colaboración en proyectos",
            "title.skill.figma": "Figma: Prototipado y diseño de interfaces",
            "title.skill.html": "HTML: Estructuración de contenido web",
            "title.skill.css": "CSS: Estilización de contenido web",
            "title.skill.js": "JavaScript: Programación web y desarrollo de interactividad",
            "title.skill.ps": "Photoshop: Edición de imágenes y diseño gráfico",
            "title.skill.illustrator": "Illustrator: Diseño gráfico y creación de vectores",
            "title.skill.pr": "Premiere: Edición de video y postproducción",
            "title.skill.aftereffects": "After Effects: Animación y efectos visuales",

            "title.contact": "Contacto",
            "title.contact.question": "¿Quieres trabajar conmigo o tienes una idea?",
            "title.footer.rights": "Gabriel Nicolás Chaves Torres. Todos los derechos reservados."
        },
        en: {
            "title.page": "Portfolio - Gabriel Nicolás Chaves Torres",

            "sidebar.about": "About Me",
            "sidebar.experience": "Experience",
            "sidebar.projects": "Projects",
            "sidebar.skills": "Skills",
            "sidebar.contact": "Contact",

            "title.hi": "Hi, I'm ",
            "about.description.1": "Multimedia Engineer and Unity developer specialized in virtual reality (VR) experiences and optimization of interactive 3D environments.",
            "about.description.2": "With experience in C#, Unity, 3D modeling, and web development, I combine technical skills and creativity to create immersive and intuitive experiences. I'm passionate about game design and technological innovation applied to education and simulation.",

            "title.experience": "Experience",
            "title.experience.technologies": "Technologies:",

            "title.experience.1": "Project Manager",
            "title.experience.1.date": "Jan 2022 - Jul 2022",
            "title.experience.1.company": "3D Application and Multimedia Integration Project",
            "title.experience.1.description.1": "Development of a 3D environment of the <strong>Universidad Militar Nueva Granada</strong> campus, mainly focused on user navigation within a 3D space.",
            "title.experience.1.description.2": "In collaboration with <strong>Picolab</strong> as the client, the project was developed using <strong>Unreal Engine 4</strong> and was based on architectural blueprints of the university campus.",
            "title.experience.1.task.1": "General planning of project stages and deliverables.",
            "title.experience.1.task.2": "Management and supervision of team member activities.",
            "title.experience.1.task.3": "Assembly and design of the 3D environment.",
            "title.experience.1.task.4": "Creation of movement mechanics within the 3D environment.",
            "title.experience.1.task.5": "Optimization and testing for project presentation.",

            "title.experience.2": "Technology Assistant",
            "title.experience.2.date": "Jun 2023 - Nov 2023",
            "title.experience.2.company": "Brinsa S.A.",
            "title.experience.2.description.1": "During my professional internship, I actively participated in creating <strong>virtual reality</strong> experiences centered on products from the <strong>Blancox and Refisal</strong> brands. I worked in a collaborative environment, applying technical and planning skills for immersive project development.",
            "title.experience.2.task.1": "Participation in the ideation and opportunity analysis process, with over 40 proposals selected for future implementation.",
            "title.experience.2.task.2": "Support in cybersecurity projects, developing web interfaces for internal testing monitoring.",
            "title.experience.2.task.3": "3D modeling of products for implementation in VR environments.",
            "title.experience.2.task.4": "Integration and optimization of interactive scenes in Unity.",
            "title.experience.2.task.5": "Assistance in internal processes of the technology department.",

            "title.experience.3": "Jr. Unity Developer",
            "title.experience.3.date": "Jul 2024 - Nov 2024",
            "title.experience.3.company": "Brinsa S.A.",
            "title.experience.3.description.1": "I developed virtual reality experiences using Unity, Autodesk Maya, and 3D Max for training in height safety and road safety.",
            "title.experience.3.task.1": "Creation of 3D models for training scenarios.",
            "title.experience.3.task.2": "Scripting logic and behavior of the experience along with VR mechanics.",
            "title.experience.3.task.3": "Design of spaces such as cities or highways for experience development.",
            "title.experience.3.task.4": "Planning of events and situations for the VR experience.",
            "title.experience.3.task.5": "Optimization of 3D models and assets.",

            "title.projects": "Projects",

            "title.project.1": "Don't Sleep",
            "title.project.1.description.1": "Game developed for Generation Colombia's <strong>1</strong>-day Game Jam with cohort 5, created using <strong>Unity</strong>.",
            "title.project.1.description.2": "The Game Jam theme was 'No Violence'.",
            "title.project.1.gamejam": "View the Game Jam here",

            "title.project.2": "Hangover Journey",
            "title.project.2.description.1": "Game developed for Generation Colombia's <strong>2</strong>-day Game Jam with cohort 5, created using <strong>Unity</strong>.",
            "title.project.2.description.2": "The Game Jam theme was 'Paths'.",
            "title.project.2.gamejam": "View the Game Jam here",

            "title.project.3": "Metamorphosis",
            "title.project.3.description.1": "Game developed for Generation Colombia's <strong>3</strong>-day Game Jam with cohort 5, created using <strong>Unity</strong>.",
            "title.project.3.description.2": "The Game Jam theme was 'Evolution'.",
            "title.project.3.gamejam": "View the Game Jam here",

            "title.project.4": "The-Dwelling-Of-The-Damned",
            "title.project.4.description.1": "Game developed as the final project for Generation Colombia with cohort 5, created using <strong>Unity</strong>.",
            "title.project.4.description.2": "It does not have a specific theme. The project took approximately two weeks to complete.",

            "title.project.5": "Campus UMNG Virtual",
            "title.project.5.video": "Your browser does not support the video element.",
            "title.project.5.description.1": "Project created for the subjects '3D Applications' and 'Multimedia Integration' at Universidad Militar Nueva Granada, developed using <strong>Unreal Engine 4.0</strong>.",
            "title.project.5.description.2": "The project aims to explore different ways to solve user mobility within a large virtual space.",

            "title.project.6": "Pong Game",
            "title.project.6.description.1": "A personal project developed in <strong>Unity 5.0</strong>.",
            "title.project.6.description.2": "The project is currently under development :)",

            "title.skills": "Skills",

            "title.skill.unity": "Unity: Advanced development in VR, experiences, and 3D games",
            "title.skill.unrealengine": "Unreal Engine: Experience development, rendering, and cinematics",
            "title.skill.maya": "Autodesk Maya: 3D modeling, texturing, and animation",
            "title.skill.github": "GitHub: Version control and project collaboration",
            "title.skill.git": "Git: Version control and project collaboration",
            "title.skill.figma": "Figma: Interface design and prototyping",
            "title.skill.html": "HTML: Structuring web content",
            "title.skill.css": "CSS: Styling web content",
            "title.skill.js": "JavaScript: Web programming and interactivity development",
            "title.skill.ps": "Photoshop: Image editing and graphic design",
            "title.skill.illustrator": "Illustrator: Graphic design and vector creation",
            "title.skill.pr": "Premiere: Video editing and post-production",
            "title.skill.aftereffects": "After Effects: Animation and visual effects",

            "title.contact": "Contact",
            "title.contact.question": "Do you want to work with me or have an idea?",
            "title.footer.rights": "Gabriel Nicolás Chaves Torres. All rights reserved."
        }
    };

    function changeLanguage(lang) {
        // Actualizar textos
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            el.innerHTML = translations[lang]?.[key] || key;
        });

        initSkillsObserver();

        // Actualizar botones
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.id === `lang-${lang}`);
        });

        // Guardar preferencia
        localStorage.setItem("lang", lang);
    }

    // Event listeners (debe ejecutarse después de que existan los botones)
    window.onload = function () {
        initSkillsObserver();
        document.getElementById("lang-es").onclick = () => changeLanguage("es");
        document.getElementById("lang-en").onclick = () => changeLanguage("en");

        // Idioma inicial
        const savedLang = localStorage.getItem("lang");
        const browserLang = navigator.language.slice(0, 2);
        changeLanguage(savedLang || (browserLang === "es" ? "es" : "en"));
    };

    document.getElementById('year').textContent = new Date().getFullYear();
});