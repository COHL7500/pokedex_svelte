<script lang="ts">
import favicon from "$lib/assets/favicon.png";

let { children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
	:global(html, body) {
		font-family: Exo, Inter, sans-serif;
	}
</style>
