<script lang="ts">
    import Vertice from "./Vertice.svelte";
    import {get_vertex_positions} from "$lib/first";
    import Edge from "./Edge.svelte";
    let vertices:{id:string, x:number, y:number}[];
    let edges:{x1:number, y1:number, x2:number, y2:number}[];
    let inputEdges:string[][] = [
        ['1', '2'],
        ['1', '3'],
        ['2', '4'],
        ['2', '5'],
        ['3', '5'],
        ['3', '4'],
        ['4', '6'],
    ];
    export function generateGraph()
    {
        vertices = get_vertex_positions(inputEdges);
        /* for (let i = 0; i < inputEdges.length; i++)
        {
            edges.push({x1: vertices.find((el) => el.id == inputEdges[i][0]).x});
        }*/
    }
    
</script>

<div class=" bg-transparent h-full w-full text-white top-0 left-0 text-center content-center z-10 absolute m-0">
    {#each vertices as verticeProps, i}
        <Vertice {verticeProps}/>
    {/each}
    <button on:click={generateGraph}>create graph</button>
    *This component is supposed to be graph view*
    <Edge/>
</div>