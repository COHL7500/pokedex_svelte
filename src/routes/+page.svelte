<script lang="ts">
	import PokemonCard from '$lib/ui/PokemonCard.svelte';

	const { data } = $props();
	const pokemons = $derived(data.pokemons);
</script>

<h1>Pokémons</h1>
{#each pokemons as pokemon (pokemon.name)}
	<PokemonCard {pokemon} />
{/each}
