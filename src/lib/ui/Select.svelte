<script lang="ts">
	interface SelectProps<V extends string | number> {
		onchange: (e: Event) => void;
		className?: string;
		options: V[];
		value: V;
		label?: string;
	}

	let {
		onchange,
		className,
		options,
		label,
		value = $bindable()
	}: SelectProps<string | number> = $props();
</script>

<select class={className} bind:value {onchange}>
	{#each options as option (option)}
		<option value={option} selected={value === option}>
			{label ? `${label} ${option}` : option}
		</option>
	{/each}
</select>

<style>
	select {
		padding: 0.5rem 1rem;
		font-size: 1rem;
		border: 1px solid lightgray;
		border-radius: var(--border-radius);
		cursor: pointer;
		color: white;
		background-color: #02346f;
		text-align: center;

		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
	}
</style>
