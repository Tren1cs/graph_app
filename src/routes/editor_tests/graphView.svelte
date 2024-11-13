<script lang="ts">
    import Draggable from "./Vertice.svelte";
    import {get_vertex_positions} from "$lib/first";
    import { stringify } from "postcss";
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
        for (let i = 0; i < n; i++)
        {
            vertices.push({id:(i + 1).toString(), x: i * 3, y: i * 3});
        }
    }
</script>

<div class=" bg-transparent h-full w-full text-white top-0 left-0 text-center content-center z-10 absolute m-0">
    {#each vertices as vertice, i}
        <Draggable {vertice}/>
    {/each}
    <button on:click={generateVertices}>create graph</button>
    *This component is supposed to be graph view*
</div>