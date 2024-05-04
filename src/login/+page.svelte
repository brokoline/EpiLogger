<Input bind:value={username} type="text" placeholder="Indtast E-mail" />
<Input bind:value={password} type="password" placeholder="Indtast kodeord" />
<Button color="primary" on:click={login}>Login</Button>