<script lang="ts">
	import PokemonCard from '$lib/ui/PokemonCard.svelte';
	import Grid from '$lib/ui/Grid.svelte';
	import SearchInput from '$lib/ui/SearchInput.svelte';
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

		// eslint-disable-next-line svelte/no-navigation-without-resolve
		goto(buildUrl(sp), {
			replaceState: true,
			keepFocus: true,
			noScroll: true
		});
	};

	$effect(() => {
		syncQueryURL();
	});

	const navigate = (nextPage: number | null) => {
		if (nextPage == null) return;

		sp.set('p', String(nextPage));

		// eslint-disable-next-line svelte/no-navigation-without-resolve
		goto(buildUrl(sp));
	};
</script>

<main class="container">
	<h1>Pokémons</h1>

	<div class="search-container">
		<SearchInput bind:query></SearchInput>
	</div>

	<Grid>
		{#each data.pokemons as pokemon (pokemon.name)}
			<li>
				<PokemonCard {pokemon} />
			</li>
		{/each}
	</Grid>

	<nav class="pagination">
		<button
			disabled={meta.prevPage == null}
			onclick={() => navigate(meta.prevPage)}
		>
			Previous
		</button>
		<button
			disabled={meta.nextPage == null}
			onclick={() => navigate(meta.nextPage)}
		>
			Next
		</button>
		<span>Page {meta.page} of {meta.totalPages}</span>
	</nav>
</main>

<style>
	.search-container {
		margin-bottom: 1rem;
		max-width: 300px;
	}

	.pagination {
		position: fixed;
		left: 50%;
		bottom: 1rem;
		transform: translateX(-50%);
		z-index: 1000;

		display: flex;
		align-items: center;
		gap: 1rem;

		padding: 0.75rem 1rem;
		border-radius: 10% / 70%;
		background: rgba(255, 255, 255);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);

		button {
			padding: 0.5rem 1rem;
			font-size: 1rem;
			border: none;
			border-radius: 5px;
			background-color: #02346f;
			color: white;
			cursor: pointer;
			transition: background-color 0.3s ease;
		}
	}

	.container {
		padding: 2rem;
	}
</style>
