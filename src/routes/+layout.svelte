<script lang="ts">
	import { type LayoutProps } from './$types';
	import '../app.css';
	let { data }: LayoutProps = $props();
</script>

{#key data.url}
	<main class="h-dvh w-screen overflow-hidden bg-[#ffefff] p-0 grid grid-rows-[90%_10%] lg:grid-rows-[90%_10%]">
		<div class="h-full w-full">
			<slot></slot>
		</div>
		<footer class="flex justify-center items-center w-full gap-6 pb-6">
		  <div class="h-full">
			  <img src="https://storage.ucarolina.edu.mx/cdn/Boolean-LogoRosa.png" class="h-full" />
      </div>
      <div class="h-4/5">
        <img src="https://storage.ucarolina.edu.mx/cdn/LogoSmRosa.png" class="h-full" />
      </div>	
		</footer>
	</main>
{/key}
