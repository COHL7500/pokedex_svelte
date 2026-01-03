<script lang="ts">
	import { goto } from '$app/navigation';
	import { buildUrl } from '$lib/utils';
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import { page } from '$app/state';
	import type { PaginationMeta } from '$lib/api/types';

	interface PaginationProps {
		meta: PaginationMeta;
	}

	const { meta }: PaginationProps = $props();

	const sp = new SvelteURLSearchParams(page.url.searchParams);

	const onPageSelect = (e: Event) => {
		const select = e.target as HTMLSelectElement;
		const selectedPage = Number(select.value);
		navigate(selectedPage);
	};

	const pages = $derived(
		Array.from({ length: meta.totalPages }, (_, i) => i + 1)
	);

	const navigate = (nextPage: number | null) => {
		if (nextPage == null) return;

		sp.set('p', String(nextPage));

		goto(buildUrl(sp));
	};
</script>

<nav class="pagination">
	<button
		disabled={meta.prevPage == null}
		onclick={() => navigate(meta.prevPage)}
	>
		Previous
	</button>

	<select onchange={onPageSelect}>
		{#each pages as page (page)}
			<option value={page} selected={meta.page === page}>
				Page {page}
			</option>
		{/each}
	</select>

	<button
		disabled={meta.nextPage == null}
		onclick={() => navigate(meta.nextPage)}
	>
		Next
	</button>
	<span>Page {meta.page} of {meta.totalPages}</span>
</nav>

<style>
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

		select {
			padding: 0.5rem 1rem;
			font-size: 1rem;
			border: 1px solid lightgray;
			border-radius: 5px;
			cursor: pointer;
			color: white;
			background-color: #02346f;
			text-align: center;

			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
		}

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
</style>
