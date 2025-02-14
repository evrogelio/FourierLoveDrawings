<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let canvasParent: HTMLDivElement;
	onMount(async () => {
		if (!browser) return;
		const [{ default: p5 }, { default: startSketch }] = await Promise.all([
			import('p5'),
			import('$lib/landing-animation')
		]);
		new p5(startSketch, canvasParent);
	});
</script>

<div class="flex lg:flex-row flex-col h-full lg:h-1/2 lg:h-full w-full lg:items-center">
	<div class="align-center flex h-content lg:h-full lg:w-2/5 flex-col justify-center lg:p-8 p-4">
		<h1 class="borel pink text-6xl/20 lg:text-8xl/32">Happy <br /> Valentines!</h1>
		<h2 class="dark-pink pl-4 text-xl lg:text-3xl">
			Geek love is just a perfect Fourier series—harmonics aligning in every heartbeat.
		</h2>
		<div class="zain w-full justify-end hidden lg:flex p-4">
			<a href="/epicycles"
				><button
					class="aspect-square w-16 items-center rounded-full bg-white text-center align-middle hover:bg-gray-100"
					>Next</button
				></a
			>
		</div>
	</div>
	<div class="h-1/2 lg:h-full lg:w-1/2 w-full" id="canvasParent" bind:this={canvasParent}></div>
	<div class="zain flex w-full justify-center p-4 lg:hidden">
		<a href="/epicycles"
			><button
				class="aspect-square w-16 items-center rounded-full bg-white text-center align-middle hover:bg-gray-100"
				>Next</button
			></a
		>
	</div>
</div>
