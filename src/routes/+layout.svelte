<script lang="ts">
	import { type EasingFunction, type TransitionConfig, fly, slide } from 'svelte/transition';
	import { type LayoutProps } from './$types';
	import '../app.css';
	import { cubicIn, expoOut, linear } from 'svelte/easing';
	let { data }: LayoutProps = $props();
	import { horizontalSlide } from '$lib/transitions';
</script>

{#key data.url}
	<main class="grid h-screen w-screen items-center overflow-hidden bg-[#fff2ff] p-0">
		<div class="h-full w-full">
			<slot></slot>
		</div>
	</main>
{/key}
