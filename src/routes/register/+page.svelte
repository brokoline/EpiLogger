<svelte:head>
    <title>New user page | Velzon - Svelte Admin & Dashboard Template</title>
</svelte:head>
 
<link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"/>

<script>
    import { navigate } from 'svelte-routing';
    let user = '';
    let email = '';
    let pass = '';
    let confirmPass = '';

    const addUser = async () => {
    // Validering for at sikre, at brugernavnet ikke er tomt
    if (!user.trim()) {
        alert('Indtast venligst et brugernavn.');
        return;
    }

    // Validering for at sikre, at kodeordene matcher
    if (pass !== confirmPass) {
        alert('Kodeordene matcher ikke. Prøv igen.');
        return;
    }

    try {
        const response = await fetch('api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: user,
                email: email,
                pass: pass
            })
        });

        if (response.ok) {
            window.location.href = '/';
        } else {
            alert('Der opstod en fejl ved oprettelse af brugeren.');
        }
    } catch (error) {
        console.error('Fejl ved oprettelse af bruger:', error);
        alert('Der opstod en fejl ved oprettelse af brugeren.');
    }
};
</script>

<div id="epiExplorerHeader">EpiLogger</div>
<div class="login-container">
    <h3>Opret en ny bruger</h3>
    <div class="form-group">
        <label for="user">Navn:</label>
        <input type="text" id="user" bind:value={user} />
    </div>
    <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" bind:value={email} />
    </div>
    <div class="form-group">
        <label for="pass">Adgangskode:</label>
        <input type="password" id="pass" bind:value={pass} />
    </div>
    <div class="form-group">
        <label for="confirmPass">Bekræft adgangskode:</label>
        <input type="password" id="confirmPass" bind:value={confirmPass} />
    </div>
    <button on:click={addUser}>Opret bruger</button>
    <p><a href="/">Tilbage til login</a></p>
</div>


<style>
    #epiExplorerHeader {
        font-family: 'Alfa Slab One', cursive;
        color: #1e3e7e; 
        font-size: 7rem; 
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
        position: absolute; 
        top: calc(40% - 200px); 
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center; 
    }

    .login-container {
        width: 350px;
        max-width: 100%;
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 1rem;
        background-color: #f8f8f8;
        border-radius: 0.9rem;
        border: 1px solid #1e2e7e;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .form-group {
        width: calc(100% - 2rem);
        margin-bottom: 1rem;
    }

    input[type="email"], input[type="password"], input[type="text"] {
        width: 100%;
        padding: 0.5rem;
        margin-top: 0.2rem;
        border: 1px solid #2b4a84cc;
        border-radius: 0.25rem;
    }

    button {
        color: #ffffff;
        background-color: #2b4a84;
        padding: 0.6rem 1.2rem;
        border: none;
        border-radius: 0.25rem;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.05rem;
        transition: background-color 0.2s;
    }

    button:hover {
        background-color: #233e70;
    }

    p a {
        color: #2b4a84;
        text-decoration: none;
        text-align: center; 
    }

    p a:hover {
        color: #233e70;
        font-weight: bold;
        text-decoration: underline;
    }
</style>
