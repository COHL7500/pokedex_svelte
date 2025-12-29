<script lang="ts">
    type Pokemon = {
      name: string;
    };

    const pokemons = $state<Pokemon[]>([]);

    fetch("https://pokeapi.co/api/v2/pokemon/ditto")
      .then((res) => res.json() as Promise<Pokemon>)
      .then((pokemon) => {
        pokemons.push({ name: pokemon.name });
      });
</script>

<h1>Pokémons</h1>
<ul>
    {#each pokemons as pokemon}
        <li>{pokemon.name}</li>
    {/each}
</ul>