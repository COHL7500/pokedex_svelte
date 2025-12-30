<script lang="ts">
	import favicon from '$lib/assets/favicon.png';

	const { children } = $props();
</script>

<svelte:head>
	<title>Pokedex</title>
	<meta name="description" content="A Pokedex built with Svelte/Sveltekit." />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link
		rel="preconnect"
		href="https://fonts.gstatic.com"
		crossorigin="anonymous"
	/>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
	:global(html, body) {
		font-family: Exo, Inter, sans-serif;
	}
</style>
