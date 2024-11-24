<script lang="ts">
    import Vertice from "./Vertice.svelte";
    import {get_vertex_positions} from "$lib/first";
    import Edge from "./Edge.svelte";
    let vertices:{id:string, x:number, y:number}[] = $state([{id: '0', x: 0, y: 0}]);
    let edges:{x1:number, y1:number, x2:number, y2:number}[] = $state([{x1: 1, y1: 1, x2: 1, y2: 1}]);
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
        let localEdges:{x1:number, y1:number, x2:number, y2:number}[] = [];
        for (let i = 0; i < inputEdges.length; i++)
        {
            let firstVertice = vertices.find(v => v.id === inputEdges[i][0]);
            let secondVertice = vertices.find(v => v.id === inputEdges[i][1]);
            if (firstVertice === undefined || secondVertice === undefined)
            {
                throw new TypeError('The value was promised to always be there!');
            }
            localEdges.push({x1: firstVertice.x, y1: firstVertice.y, x2: secondVertice.x, y2: secondVertice.y});
        }
        edges = localEdges;
        console.log(edges);
    }
    $inspect(vertices);

    let scale = 0.52;
    let origin = {x: 0, y: 0};

</script>

<div class=" overflow-clip bg-transparent h-full w-full text-white top-0 left-0 text-center content-center z-10 absolute m-0" style="transform: scale({scale}); transform-origin: {origin.x}px {origin.y}px;">
    {#each vertices as el, i (i)}
        <Vertice bind:vertice = {vertices[i]} />
    {/each}

    {#each edges as el, i (i)}  
        <Edge bind:edge = {edges[i]} />
    {/each}

    <button on:click={generateGraph}>create graph</button>
    *This component is supposed to be graph view*
</div>