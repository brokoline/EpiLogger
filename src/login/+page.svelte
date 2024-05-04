<script>
    import {Input, Button} from "@sveltestrap/sveltestrap"

    let username = ''
    let password = ''

    const login = async () => {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const result = await response.text();
        if (response.status === 200) {
            window.location = '/admin';
        } else {
            alert('Forkert brugernavn eller password');
        }
    };

</script>

<Input bind:value={username} type="text" placeholder="Indtast Email" />
<Input bind:value={password} type="password" placeholder="Indtast Password" />
<Button color="primary" on:click={login}>Login</Button>