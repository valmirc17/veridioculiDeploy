
document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');


    if (signupForm) {
        signupForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const usernameInput = document.getElementById('username').value;
            const passwordInput = document.getElementById('password').value;
            const nm_usuarioInput = document.getElementById('nm_usuario').value;
            const cpfInput = document.getElementById('cpf').value;
            const emailInput = document.getElementById('email').value;
            const telefoneInput = document.getElementById('telefone').value;
            const dt_nascInput = document.getElementById('dt_nasc').value;

            try {
                const response = await fetch('/api/users/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nm_usuario: nm_usuarioInput,
                        login: usernameInput,
                        senha: passwordInput,
                        cpf: cpfInput,
                        email: emailInput,
                        telefone: telefoneInput,
                        dt_nasc: dt_nascInput
                    }),
                });

                if (response.ok) {
                    window.location.href = '/login';
                } else {
                    const errorMessage = await response.text() || 'Erro desconhecido';
                    alert(errorMessage);
                }
            } catch (error) {
                console.error('Erro durante o cadastro:', error);
                alert('Erro durante o cadastro. Por favor, tente novamente.');
            }
        });
    }
});
