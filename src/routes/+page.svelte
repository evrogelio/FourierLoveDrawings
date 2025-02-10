<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	onMount(async () => {
		if (!browser) return;
		const [{ default: p5 }, { default: startSketch }] = await Promise.all([
			import('p5'),
			import('$lib/landing-animation')
		]);

		const sketch = new p5(startSketch);
	});
</script>

<main class="h-screen w-screen p-0 bg-black items-center justify-center grid"></main>
