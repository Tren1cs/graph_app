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
        for (let i = 0; i < inputEdges.length; i++)
        {
            let firstVertice = vertices.find(v => v.id === inputEdges[i][0]);
            let secondVertice = vertices.find(v => v.id === inputEdges[i][1]);
            if (firstVertice === undefined || secondVertice === undefined)
            {
                throw new TypeError('The value was promised to always be there!');
            }
            edges.push({x1: firstVertice.x, y1: firstVertice.y, x2: secondVertice.x, y2: secondVertice.y});
        }
    }
    
</script>

<div class=" bg-transparent h-full w-full text-white top-0 left-0 text-center content-center z-10 absolute m-0">
    {#each vertices as el}
        <Vertice bind:vertice = {el} />
    {/each}

    <!----{#each edges as el}
        <Edge bind:edge = {el} />
    {/each}</!---->
    <button on:click={generateGraph}>create graph</button>
    *This component is supposed to be graph view*
</div>