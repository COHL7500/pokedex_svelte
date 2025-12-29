<script lang="ts">
    let { data } = $props();
    const pokemons = $derived(data.pokemons);

    // $inspect(pokemons);
</script>

<h1>Pokémons</h1>
<ul>
    {#each pokemons as pokemon}
        <li>{pokemon.name}</li>
    {/each}
</ul>