$(document).ready(function () {
    // Toggle password visibility
    $('#togglePassword').on('click', function () {
        const passwordInput = $('#password');
        const type = passwordInput.attr('type') === 'password' ? 'text' : 'password';
        passwordInput.attr('type', type);
        $(this).find('i').toggleClass('fa-eye fa-eye-slash');
        $(this).attr('aria-label', type === 'password' ? 'Show password' : 'Hide password');
    });

    // Login form submission
    $('#loginForm').on('submit', function (e) {
        e.preventDefault();

        const email = $('#email').val().trim();
        const password = $('#password').val().trim();
        let hasError = false;

        // Reset error messages
        $('#emailError, #passwordError').text('');

        // Email validation
        if (!email) {
            $('#emailError').text('Please enter your email.');
            hasError = true;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            $('#emailError').text('Please enter a valid email address.');
            hasError = true;
        }

        // Password validation
        if (!password) {
            $('#passwordError').text('Please enter your password.');
            hasError = true;
        }

        if (hasError) return;

        // Retrieve registered users
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const matchedUser = users.find(u => u.email === email && u.password === password);

        if (!matchedUser) {
            alert('Invalid email or password.');
            return;
        }

        // On success, store session flag and redirect
        sessionStorage.setItem('loggedInUser', JSON.stringify({ email }));
        window.location.href = 'home.html';
    });
});
