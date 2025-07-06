// Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            });
        });
        
        // Fade-in animation on scroll
        function checkFade() {
            const elements = document.querySelectorAll('.fade-in');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementPosition < windowHeight - 50) {
                    element.classList.add('active');
                }
            });
        }
        
        // Check on load and scroll
        window.addEventListener('load', checkFade);
        window.addEventListener('scroll', checkFade);
        
        // Handle contact form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            const toast = new bootstrap.Toast(document.getElementById('messageToast'));
            document.getElementById('toastMessage').textContent = 'Message sent successfully!';
            toast.show();
            
            // Reset form
            this.reset();
        });
        
        // Handle CV download
        function handleCVDownload() {
            // In a real application, this would download a real CV file
            const toast = new bootstrap.Toast(document.getElementById('messageToast'));
            document.getElementById('toastMessage').textContent = 'CV download started!';
            toast.show();
        }
        
        document.getElementById('downloadCV').addEventListener('click', handleCVDownload);
        document.getElementById('downloadCV2').addEventListener('click', handleCVDownload);
        
        // Project tabs functionality is handled by Bootstrap