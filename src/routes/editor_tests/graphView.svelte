    <script lang="ts">
        import Vertice from "./Vertice.svelte";
        import {get_vertex_positions} from "$lib/first";
        import Edge from "./Edge.svelte";
        let vertices:{id:string, x:number, y:number}[] = $state([{id: '0', x: 0, y: 0}]);
        let edges:{x1:number, y1:number, x2:number, y2:number}[] = $state([{x1: 1, y1: 1, x2: 1, y2: 1}]);
        let isVerticeMoved = $state(false);
        $inspect(isVerticeMoved);
        let inputEdges:string[][] = [
            ['1', '2'],
            ['1', '3'],
            ['2', '4'],
            ['2', '5'],
            ['3', '5'],
            ['3', '4'],
            ['4', '6'],
        ];

        let mousePosition = $state({ x: 0, y: 0 });
	    function handleMousemove(event) {
	    	mousePosition.x = event.clientX;
	    	mousePosition.y = event.clientY;
	    }

        function SpawnVertice()
        {
            if (!isVerticeMoved)
            {
                console.log("YE")
                let newVerticeId = String(vertices.length + 1);
                vertices.push({id: newVerticeId, x: mousePosition.x - 30, y: mousePosition.y - 30});
            }
        }

        export function generateGraph()
        {
            vertices = get_vertex_positions(inputEdges);
            let localEdges:{x1:number, y1:number, x2:number, y2:number}[] = [];
            for (let i = 0; i < inputEdges.length; i++)
            {
                let firstVertice = vertices.find(v => v.id === inputEdges[i][0]);
                let secondVertice = vertices.find(v => v.id === inputEdges[i][1]);
                if (firstVertice != undefined && secondVertice != undefined)
                {
                    localEdges.push({x1: firstVertice.x, y1: firstVertice.y, x2: secondVertice.x, y2: secondVertice.y});
                }
            }
            edges = localEdges;
        }

        $effect(() => {
            for (let i = 0; i < vertices.length; i++)
            {
                vertices[i].id;
                vertices[i].x;
                vertices[i].y;
            }
            let localEdges:{x1:number, y1:number, x2:number, y2:number}[] = [];
            for (let i = 0; i < inputEdges.length; i++)
            {
                let firstVertice = vertices.find(v => v.id === inputEdges[i][0]);
                let secondVertice = vertices.find(v => v.id === inputEdges[i][1]);
                if (firstVertice != undefined && secondVertice != undefined)
                {
                    localEdges.push({x1: firstVertice.x, y1: firstVertice.y, x2: secondVertice.x, y2: secondVertice.y});
                }
            }   
            edges = localEdges;
        });
    </script>

    <div onmousemove = {handleMousemove} onclick={SpawnVertice} class=" bg-transparent h-full w-full text-white top-0 left-0 text-center content-center z-10 absolute m-0">
        {#each vertices as el, i (i)}
            <Vertice bind:vertice = {vertices[i]} bind:movingVertice = {isVerticeMoved} />
        {/each}

        {#each edges as el, i (i)}  
            <Edge bind:edge = {edges[i]} />
        {/each}

        <button onclick={generateGraph}>create graph</button>
    </div>