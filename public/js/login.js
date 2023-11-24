
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');


    if (loginForm) {
        console.log("teste")
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const usernameInput = document.getElementById('username').value;
            const passwordInput = document.getElementById('password').value;
            console.log(usernameInput, passwordInput)

            try {
                const response = await fetch('/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        login: usernameInput,
                        senha: passwordInput,
                    }),
                });

                if (response.ok) {
                    window.location.href = '/analise';
                } else {
                    const errorMessage = await response.text() || 'Erro desconhecido';
                    alert(errorMessage);
                }
            } catch (error) {
                console.error('Erro durante o login:', error);
                alert('Erro durante o login. Por favor, tente novamente.');
            }
        });
    }
});
