<script lang="ts">
  import type p5 from "p5";
  import { onMount } from "svelte"; 
  import { browser } from "$app/environment";
  
  let canvasParent: HTMLDivElement;

  const { cos, sin, PI } = Math
  onMount(async(s: p5)=>{
    if(!browser) return;
    const { default: p5 } = await import('p5');
    new p5(()=>{
      const WIDTH: number = window.innerWidth * 2 / 3;
      const HEIGHT: number = window.innerHeight;
      const TAU: number = 2 * PI;
      let circles = 2;
      s.setup = () => { 
        s.createCanvas(WIDTH, HEIGHT);

      }
      let time = 0;
      let path: {x:number, y: number}[] = [];

      s.draw = () =>{
        
      }
    
    }, canvasParent)
  })
</script>
<div class="flex items-center w-full h-full">
  <div class="flex w-1/3 flex-col p-8">
    <h1 class="text-6xl zain pink">What are the epicycles?</h1>
    <p class="zain text-xl dark-pink">Epicycles are circles moving on circles, a concept dating back to Ptolemy’s planetary models.</p>
    <p class="zain text-xl dark-pink">With enough of them, we can approximate any closed shape.</p>
  </div>
  <div class="h-full w-2/3" bind:this={canvasParent}></div>
</div>
