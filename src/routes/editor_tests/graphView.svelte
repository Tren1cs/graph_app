<script lang="ts">
    import Vertice from "./Vertice.svelte";
    import {get_vertex_positions} from "$lib/first";
    let vertices:{id:string, x:number, y:number}[];
    let n:number = 3;
    let edgesArray:string[][] = [
        ['1', '2'],
        ['1', '3'],
        ['2', '4'],
    ]
    export function generateVertices()
    {
        vertices = get_vertex_positions(edgesArray);
    }
</script>

<div class=" bg-transparent h-full w-full text-white top-0 left-0 text-center content-center z-10 absolute m-0">
    {#each vertices as vertice, i}
        <Vertice {vertice}/>
    {/each}
    <button on:click={generateVertices}>create graph</button>
    *This component is supposed to be graph view*
</div>