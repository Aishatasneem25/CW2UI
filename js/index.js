document.addEventListener('DOMContentLoaded', function () {
    // Toggle password visibility (with icon change)
    document.getElementById('togglePassword').addEventListener('click', function () {
        const passwordInput = document.getElementById('password');
        const icon = this.querySelector('i');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });

    // Handle form submission
    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // Find user
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Store user session
            if (rememberMe) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            } else {
                sessionStorage.setItem('currentUser', JSON.stringify(user));
            }

            // Redirect to home page
            window.location.href = 'home.html';
        } else {
            alert('Invalid email or password. Please try again.');
        }
    });
});
