document.addEventListener('DOMContentLoaded', () => {

    // ===== Dark Mode Toggle =====
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        const isDark = body.classList.contains('dark-mode');

        // Animate icon swap
        themeIcon.style.transform = 'rotate(360deg) scale(0)';
        setTimeout(() => {
            themeIcon.classList.toggle('fa-moon', !isDark);
            themeIcon.classList.toggle('fa-sun', isDark);
            themeIcon.style.transform = 'rotate(0deg) scale(1)';
        }, 200);

        // Save preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Add transition style to icon
    themeIcon.style.transition = 'transform 0.3s ease';

    // ===== Mobile Menu Toggle =====
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // ===== Form Submission (WhatsApp) =====
    const appointmentForm = document.getElementById('appointment-form');

    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;

        // Create WhatsApp message
        const whatsappMessage = `Olá, gostaria de agendar uma consulta na Clínica Eliane Brait.%0A%0A*Nome:* ${name}%0A*Telefone:* ${phone}%0A*E-mail:* ${email}%0A*Serviço de Interesse:* ${service}%0A*Mensagem:* ${message}`;

        // Open WhatsApp with pre-filled message
        window.open(`https://wa.me/5511974807090?text=${whatsappMessage}`, '_blank');

        // Reset form
        appointmentForm.reset();

        // Show success message
        alert('Obrigado pelo seu agendamento! Você será redirecionado para o WhatsApp para confirmar seu horário.');
    });

    // ===== Smooth Scrolling for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

});
