<script lang="ts">
	import PokemonCard from '$lib/ui/PokemonCard.svelte';
	import Grid from '$lib/ui/Grid.svelte';

	const { data } = $props();
	const pokemons = $derived(data.pokemons);
</script>

<div class="container">
	<h1>Pokémons</h1>
	<Grid>
		{#each pokemons as pokemon (pokemon.name)}
			<PokemonCard {pokemon} />
		{/each}
	</Grid>
</div>

<style>
	.container {
		padding: 2rem;
	}
</style>
