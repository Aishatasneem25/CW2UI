$(document).ready(function () {
    $('#registerForm').submit(function (e) {
        e.preventDefault();

        const fullName = $('#fullName').val().trim();
        const email = $('#email').val().trim();
        const dob = $('#dob').val();
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();
        const agreed = $('#agreeTerms').is(':checked');

        // Clear old error messages
        $('#dobError, #passwordError, #emailError').text('');

        // Basic validations
        if (!fullName || !email || !dob || !password || !confirmPassword) {
            alert('Please fill in all required fields.');
            return;
        }

        // Email format check
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            $('#emailError').text('Please enter a valid email address.');
            return;
        }

        // Age validation (18+)
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        const d = today.getDate() - birthDate.getDate();
        if (m < 0 || (m === 0 && d < 0)) age--;
        if (age < 18) {
            $('#dobError').text('You must be at least 18 years old to register.');
            return;
        }

        // Password match check
        if (password !== confirmPassword) {
            $('#passwordError').text('Passwords do not match.');
            return;
        }

        // Terms agreement
        if (!agreed) {
            alert('You must agree to the Terms & Conditions.');
            return;
        }

        // Load existing users or init empty array
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // Prevent duplicate registration
        if (users.some(u => u.email === email)) {
            alert('This email is already registered. Please log in.');
            window.location.href = 'index.html';
            return;
        }

        // Save new user
        users.push({ fullName, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        alert('Registration successful! You can now log in.');
        window.location.href = 'index.html';
    });
});
