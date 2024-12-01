<script lang="ts">
    import Vertice from "./Vertice.svelte";
    import {get_vertex_positions} from "$lib/first";
    import Edge from "./Edge.svelte";

    import { ZoomIn, ZoomOut } from "lucide-svelte";

    let { oninvalidformat, oninvalidcode } = $props();
    // TODO: Вызывать oninvalidformat() при неправильном формате списка смежности или матрицы, oninvalidcode() при ошибке парсинга кода

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

    

    let scale = $state(1.0);
    let origin = $state({x: 0, y: 0});
    let neworigin = $state({x: 0, y: 0})
    let position = $state({x:0, y: 0})

    let lmb = false;
    let mmb = false;

    let mouseover = false;
    let mouseinview = false;

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

    function onmouseenter(e) {
        mouseinview = true;
    }
    function onmouseleave(e) {
        mouseinview = false;
    }

    function onwheel(e) {
        if(mouseinview) {
            Zoom(1 + ( -2 * Number(e.deltaY > 0)));
        }
    }

    function Zoom(x:number) {
        scale += x * 0.06;
        scale = Math.min(Math.max(0.16, scale), 1.9);
    }

</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<div id="graphView" class=" overflow-hidden bg-transparent h-full w-full text-white top-0 left-0 text-center content-center z-10 absolute m-0"
    {onmousedown} {onmouseup} {onpointermove} {onmouseover} {onmouseout} {onwheel} {onmouseenter} {onmouseleave}>

    <div class="relative" style="transform: scale({scale}); left: {(position.x * scale)}px; top: {(position.y * scale)}px; transform-origin: center;">
        {#each vertices as el, i (i)}
            <Vertice bind:vertice = {vertices[i]} {scale}/>
        {/each}

        {#each edges as el, i (i)}  
            <Edge bind:edge = {edges[i]} />
        {/each}

        <button onclick={generateGraph}>create graph</button>
    </div>

    <div class="bottom-0 absolute flex w-full h-fit justify-center items-center pointer-events-none">
        <div class=" select-none flex align-baseline items-center pointer-events-auto rounded-md border-secondary border relative m-4 h-fit w-fit min-w-10 p-2">
            <ZoomOut class="mr-2 h-4 w-4 text-sm" onclick={() => Zoom(-1)} />{(Math.round(scale * 100)/100).toLocaleString('en-US', { minimumFractionDigits: 2, useGrouping: false })}x<ZoomIn class="ml-2 h-4 w-4" onclick={() => Zoom(1)} />
        </div>
    </div>
</div>