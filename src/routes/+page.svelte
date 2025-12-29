<script lang="ts">
    import type {Pokemon} from "$lib/types";


    const { data } = $props();
    const pokemons = $state<Pokemon[]>(data.pokemons);

    // $inspect(pokemons);
</script>

<h1>Pokémons</h1>
<ul>
    {#each pokemons as pokemon}
        <li>{pokemon.name}</li>
    {/each}
</ul>