async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    try {
        const response = await fetch('http://localhost:3003/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const result = await response.json();

        if (response.ok) {
            window.location.href = 'adminhomepage.html';
        } else {
            errorMessage.textContent = result.message;
        }
    } catch (error) {
        errorMessage.textContent = 'An error occurred. Please try again later.';
    }
}