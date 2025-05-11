document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('forgotPasswordForm');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get email value
        const email = document.getElementById('email').value;

        // Simple validation
        if (!email) {
            alert('Please enter your email address');
            return;
        }

        // Here you would typically send a request to your server
        // For demo purposes, we'll just show the success message
        simulatePasswordReset(email);
    });

    function simulatePasswordReset(email) {
        console.log('Password reset requested for:', email);

        // Hide form and show success message
        form.classList.add('d-none');
        successMessage.classList.remove('d-none');

        // In a real application, you would:
        // 1. Send the email to your backend
        // 2. Handle any errors
        // 3. Show appropriate messages to the user
    }

    // Toggle password visibility (if you add password fields later)
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });
});