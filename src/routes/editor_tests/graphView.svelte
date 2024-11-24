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
    
    let scale = $state(0.52);
    let origin = $state({x: 0, y: 0});
    let neworigin = $state({x: 0, y: 0})
    let position = $state({x:0, y: 0})

    let lmb = false;
    let mmb = false;

    let mouseover = false;

    function onmousedown(e: {which:number}) {
        if(e.which == 1) {
            lmb = true;
        }
        if(e.which == 2) {
            mmb = true;
        }
    }
    function onmouseup(e: {which:number}) {
        if(e.which == 1) {
            lmb = false;
        }
        if(e.which == 2) {
            mmb = false;
        }
    }

    function onpointermove(e:{ movementX: number; movementY: number; clientX:number; clientY:number; }) {
        origin.x = e.clientX * (1/scale);
        origin.y = e.clientY * (1/scale);
        if((lmb == true || mmb == true) && mouseover) {
            position.x += e.movementX * (1/scale);
            position.y += e.movementY * (1/scale);
        }
        console.log(origin);
        console.log(position);
    }

    function onmouseover(e) {
        if(e.target.id == "graphView" && !(lmb == true || mmb == true)) {
            mouseover = true;
        }
    }
    function onmouseout(e) {
        if(e.target.id == "graphView" && !(lmb == true || mmb == true)) {
            mouseover = false;
        }
    }

    function onwheel(e) {
        if(mouseover) {
            scale -= e.deltaY/3000;
            console.log(e.deltaY)
        }
    }

</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<div id="graphView" class=" overflow-hidden bg-transparent h-full w-full text-white top-0 left-0 text-center content-center z-10 absolute m-0"
    {onmousedown} {onmouseup} {onpointermove} {onmouseover} {onmouseout} {onwheel}>

    <div class="relative" style="transform: scale({scale}); left: {(position.x * scale)}px; top: {(position.y * scale)}px; transform-origin: center;">
        {#each vertices as el, i (i)}
            <Vertice bind:vertice = {vertices[i]} {scale}/>
        {/each}

        {#each edges as el, i (i)}  
            <Edge bind:edge = {edges[i]} />
        {/each}

        <button onclick={generateGraph}>create graph</button>
    </div>    
</div>