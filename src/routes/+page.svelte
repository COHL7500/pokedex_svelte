<script lang="ts">
	import PokemonCard from '$lib/ui/PokemonCard.svelte';
	import Grid from '$lib/ui/Grid.svelte';
	import SearchInput from '$lib/ui/SearchInput.svelte';
	import Pagination from '$lib/ui/Pagination.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import { buildUrl } from '$lib/utils';

	const { data } = $props();
	const sp = new SvelteURLSearchParams(page.url.searchParams);

	let query = $state(sp.get('q') ?? '');
	const meta = $derived(data.meta);

	const syncQueryURL = () => {
		if (query) {
			sp.set('q', query);
			sp.set('p', '1');
		} else {
			sp.delete('q');
		}

		goto(buildUrl(sp), {
			replaceState: true,
			keepFocus: true,
			noScroll: true
		});
	};

	$effect(() => {
		syncQueryURL();
	});
</script>

<main class="container">
	<h1>Pokémons</h1>

	<div class="toolbar">
		<div class="search-container">
			<SearchInput bind:query />
		</div>
		<p>Total count: {data.meta.totalCount}</p>
	</div>

	<Pagination {meta} />
	<Grid>
		{#each data.pokemons as pokemon (pokemon.name)}
			<li>
				<PokemonCard {pokemon} />
			</li>
		{/each}
	</Grid>
</main>

<style>
	.toolbar {
		display: flex;
		flex-flow: row wrap;
		justify-content: flex-start;
		gap: 1rem;

		@media (max-width: 16em) {
			justify-content: center;
			gap: 0;
		}

		.search-container {
			margin-bottom: 1rem;
			width: 300px;
		}
	}

	.container {
		max-width: var(--page-max-width);
		margin: 0 auto;
		padding: 2rem;
	}
</style>
