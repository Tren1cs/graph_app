<script lang="ts">
    import Vertice from "./Vertice.svelte";
    import {get_vertex_positions} from "$lib/first";
    import Edge from "./Edge.svelte";
    import { onMount, untrack } from 'svelte';
    import { ZoomIn, ZoomOut } from "lucide-svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import { type GraphEventTree } from "$lib/customTypes";

    let innerHeight = $state(0);
    let innerWidth = $state(0);

    
    let { oninvalidformat, oninvalidcode, algo = $bindable(undefined) } = $props();
    // TODO: Вызывать oninvalidcode() при ошибке парсинга кода
    let vertices:{id:string, x:number, y:number}[] = $state([]);
    let oldIds:string[] = $state([]);
    let edges:{x1:number, y1:number, x2:number, y2:number}[] = $state([]);
    let selected:string[] = $state([]);
    let inputEdges:string[][] = $state([]);
    let edgesMatrix:string = $state("");
    const maxVertices = 1e5;
    let uniqueVertices = $derived.by(() => 
    {
        let st = new Set();
        for (let i = 0; i < vertices.length; i++)
        {
            st.add(vertices[i].id);
        }
        return st;
    });
    

    let scale = $state(1.0);
    let origin = $state({x: 0, y: 0});
    let neworigin = $state({x: 0, y: 0});
    let position = $state({x: 0, y: 0});
    let isSelectedMoving = $state(false);
    let radius = 30;
    let deletionQuery = $state([]);

    

    //$inspect(origin);
    $inspect(position);


    $inspect(oldIds);
    function unselect()
    {
        if (!isSelectedMoving)
        {
            selected = [];
        }
    }

    function SpawnVertice()
    {
        if (!isSelectedMoving)
        {
            let newVerticeId = "";
            for (let i = 0; i < maxVertices; i++)
            {
                newVerticeId = i.toString();
                if (!uniqueVertices.has(newVerticeId)) break;
            }
            //console.log(position);
            //console.log(origin);
            selected.push(newVerticeId);
            vertices.push({id: newVerticeId, x: -position.x + origin.x - radius,
                                             y: -position.y + origin.y - radius});
        }
    }

    export function importGraph(graphTextInput, graphTextInputType)
    {
        let lines = graphTextInput.split("\n");
        let localInputEdges:string[][] = [];
        let incorrectInputEdges:boolean = false;
        switch (graphTextInputType)
        {
            case "list":
                for (let i = 0; i < lines.length; i++)
                {
                    let line = lines[i];
                    if (line.length > 0)
                    {
                        let edge = line.split(" ");
                        if (edge.length == 2) {
                            localInputEdges.push(edge);
                        }

                        else {
                            incorrectInputEdges = true;
                            break;
                        }
                    }
                }

                if (incorrectInputEdges === false) {
                    inputEdges = localInputEdges;
                    generateGraph();
                    break;
                }

                else { 
                    oninvalidformat();
                    break;
                }

            case "code":
                break;

            case "matrix":
                let splittedMatrix = [];
                for (let i = 0; i < lines.length; i++)
                {
                    for (let i = 0; i < lines.length; i++)
                    {
                        splittedMatrix.push(lines[i].split(" "));
                    }
                }
                for (let i = 1; i < lines.length; i++)
                {
                    if (splittedMatrix[i].length > 0)
                    {
                        if (splittedMatrix[i].length === lines.length) {
                            for (let j = 1; j < splittedMatrix[i].length; j++)
                            {
                                let edge:string = splittedMatrix[i][j];
                                if ((i === j && edge !== "0") || edge !== splittedMatrix[j][i] || (edge !== "0" && edge !== "1") 
                                      || splittedMatrix[0][j] !== splittedMatrix[j][0]) {
                                    incorrectInputEdges = true;
                                    break;
                                }   

                                else {
                                    if (edge === "1")
                                    {
                                        localInputEdges.push([splittedMatrix[i][0], splittedMatrix[0][j]]);
                                    }
                                }
                            }
                        }
                    
                        else {
                            incorrectInputEdges = true;
                        }

                        if (incorrectInputEdges)
                        {
                            break;
                        }
                    }
                }

                if (!incorrectInputEdges) {
                    inputEdges = localInputEdges;
                    generateGraph();
                    break;
                }

                else { 
                    oninvalidformat();
                    break;
                }
                break;

            default:
                break;
        }
    }

    export function exportAdjList()
    {
        return inputEdges;
    }

    export function generateGraph()
    {
        vertices = get_vertex_positions(inputEdges, -position.x, -position.y);
        let localOldIds:string[] = [];
        for (let i = 0; i < vertices.length; i++)
        {
            localOldIds.push(vertices[i].id);
        }
        oldIds = localOldIds;

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
        let localEdges:{x1:number, y1:number, x2:number, y2:number}[] = [];
        let oldId:string = "B1tzzzzz";
        let newIdIdx:number = -1;
        let areIdsSame:boolean = false;
        
        if (vertices.length === oldIds.length)
        {
            for (let i = 0; i < vertices.length; i++)
            {
                if (vertices[i].id !== oldIds[i])
                {
                    oldId = oldIds[i];
                    if (vertices.filter((x) => x.id === vertices[i].id).length > 1)
                    {
                        console.log("ABA");
                        newIdIdx = i;   
                        areIdsSame = true;
                        break;
                    }

                    oldIds[i] = vertices[i].id;
                    newIdIdx = i;
                }
            }
        }
        else
        {
            oldId = "";
        } 

        if (areIdsSame) 
        {
            vertices[newIdIdx].id = oldId;
            oldIds[newIdIdx] = oldId;
        }
        
        else if (oldId !== "B1tzzzzz")
        {
            oldIds = [];
            for (let i = 0; i < vertices.length; i++)
            {
                oldIds.push(vertices[i].id);
            }

            for (let i = 0; i < inputEdges.length; i++)
            { 
                for (let j = 0; j < 2; j++)
                {
                    if (inputEdges[i][j] === oldId) inputEdges[i][j] = vertices[newIdIdx].id;
                }
            }
        }

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

    $effect(() => {
        if (deletionQuery.length > 0) {
            for (let i = 0; i < deletionQuery.length; i++)
            {
                for (let j = 0; j < inputEdges.length; j++)
                {
                    if (inputEdges[j][0] == deletionQuery[i] || inputEdges[j][1] == deletionQuery[i])
                    {
                        inputEdges.splice(j, 1);
                        j--;
                    }
                }
                let idx = vertices.findIndex(v => v.id === deletionQuery[i]);
                vertices.splice(idx, 1);
            }
            deletionQuery = [];
        }
        
    })

    let lmb = false;
    let mmb = false;

    let mouseover = false;
    let mouseinview = false;
    let isShiftDown = $state(false);
    onMount(() => {document.addEventListener('contextmenu', event => event.preventDefault());})
    function hotkeyDownHandler(e)
    {
        switch (e.key)
        {
            case "Shift":
                isShiftDown = true;
        }
    }

    function hotkeyUpHandler(e)
    {
        switch (e.key)
        {
            case "Shift":
                isShiftDown = false;
        }
    } 

    $effect(() => {
        if (selected.length > 1 && isShiftDown)
        {
            $inspect(inputEdges);
            let firstEdge = inputEdges.find(v => v === selected.reverse());
            let secondEdge = inputEdges.find(v => v === selected.reverse());
            if (firstEdge === undefined && secondEdge == undefined && selected[0] != selected[1])
            {
                inputEdges.push(selected);
                selected = [selected[1]];
            }
            else
            {
                $inspect(inputEdges);
                //console.log("YE");
                selected = [selected[0]];
            }   
        }
    })

    function onmousedown(e: {which:number}) {
        if(e.which == 1) {
            lmb = true;
            unselect();
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
        origin.x = (e.clientX - innerWidth/2) * (1/scale);
        origin.y = (e.clientY - innerHeight/2) * (1/scale);
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
        origin.x = (e.clientX - innerWidth/2) * (1/scale);
        origin.y = (e.clientY - innerHeight/2) * (1/scale);
    }

    function Zoom(x:number) {
        scale += x * 0.06;
        scale = Math.min(Math.max(0.16, scale), 1.9);
    }

</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<div ondblclick = {SpawnVertice} id="graphView" class="overflow-hidden bg-transparent h-full w-full text-white top-0 left-0 text-center content-center z-10 absolute m-0 " 
    {onmousedown} {onmouseup} {onpointermove} {onmouseover} {onmouseout} {onwheel} {onmouseenter} {onmouseleave}>

    <div class="relative w-full h-0" style="transform: scale({scale}); left: {((position.x + innerWidth/2) * scale)}px; top: {((position.y) * scale)}px; transform-origin: center; ">
        {#each vertices as el, i (i)}
            <Vertice bind:deletionQuery = {deletionQuery} bind:vertice = {vertices[i]}
             bind:movingVertice = {isSelectedMoving} bind:selectedObjects = {selected}
              bind:isShiftDown = {isShiftDown} {scale}/>
        {/each}

        {#each edges as el, i (i)}  
            <Edge bind:edge = {edges[i]} />
        {/each}

    </div>

    <div class="bottom-0 absolute flex w-full h-fit justify-center items-center pointer-events-none">
        <div class=" select-none flex align-baseline items-center pointer-events-auto rounded-md border-secondary border relative m-4 h-fit w-fit min-w-10 p-2">
            <ZoomOut class="mr-2 h-4 w-4 text-sm" onclick={() => Zoom(-1)} />{(Math.round(scale * 100)/100).toLocaleString('en-US', { minimumFractionDigits: 2, useGrouping: false })}x<ZoomIn class="ml-2 h-4 w-4" onclick={() => Zoom(1)} />
        </div>
    </div>
</div>

<svelte:window onkeydown = {hotkeyDownHandler} onkeyup = {hotkeyUpHandler} bind:innerHeight bind:innerWidth/>