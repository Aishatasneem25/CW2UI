document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    document.getElementById('togglePassword').addEventListener('click', function() {
        const passwordField = document.getElementById('password');
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        this.textContent = type === 'password' ? 'Show' : 'Hide';
    });

    // Handle form submission
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const termsAgreed = document.getElementById('terms').checked;

        // Error elements
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');

        // Clear previous errors
        emailError.textContent = '';
        passwordError.textContent = '';

        // Validate fields
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            alert('Please fill in all required fields.');
            return;
        }

        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            emailError.textContent = 'Please enter a valid email address.';
            return;
        }

        // Validate password length
        if (password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters long.';
            return;
        }

        // Validate password match
        if (password !== confirmPassword) {
            passwordError.textContent = 'Passwords do not match.';
            return;
        }

        // Validate terms
        if (!termsAgreed) {
            alert('You must agree to the Terms & Conditions.');
            return;
        }

        // Get existing users - FIXED THIS LINE
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // Check if email exists
        if (users.some(user => user.email === email)) {
            emailError.textContent = 'This email is already registered.';
            return;
        }

        // Create new user
        const newUser = {
            firstName,
            lastName,
            email,
            password // Note: In production, hash this password!
        };

        // Save user
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Success message and redirect
        alert('Registration successful! You will now be redirected to login.');
        window.location.href = 'index.html';
    });
});