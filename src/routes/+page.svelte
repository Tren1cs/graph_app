<script lang="ts">
    import AlgoMenu from './AlgoMenu.svelte';

    import ImportMenu from './ImportMenu.svelte';
    import ExportMenu from './ExportMenu.svelte';
    import GraphView from "./graphView.svelte";
    import Guide from './Guide.svelte';
    import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import { ArrowUpFromLine } from "lucide-svelte";
    import * as Resizable from "$lib/components/ui/resizable";
    import { toast } from 'svelte-sonner';
    import { Toaster } from '$lib/components/ui/sonner';
    import { Description } from '$lib/components/ui/alert-dialog';
    import { List } from '$lib/components/ui/command';
    import { type GraphEventTree } from '$lib/customTypes';

    let settings = $state({
        GraphName: "Graph 1",
        View: {
            physics: false
        },
        Edit: {
            directed: false
        }
    });

    let graphView: any = $state();

    let algo: GraphEventTree = $state();

    let graphTextInput = $state("");
    let graphTextInputType = $state("");
    let graphTextLang = $state("");

    function InvalidFormatToast() {
        toast.error("Invalid format!", {
            description: "Please, use the correct import format",
            action: {
                label: "Ok",
                onClick: () => {}
            }
        })
    }
    function InvalidCodeToast() {
        toast.error("Invalid code!", {
            description: "You've chosen incorrect language or the code contains errors",
            action: {
                label: "Ok",
                onClick: () => {}
            }
        })
    }
</script>

<div class=" bg-background h-screen w-screen m-0 text-white">
    <Toaster/>
    <div class=" h-full w-screen m-0 p-0 flex justify-normal flex-col">
        <div class=" h-fit border-b border-secondary bg-background flex flex-row justify-between w-full p-4 z-50">
            <div class="h-10 content-center">
                <p class="text-2xl text-center">Graph Editor</p>
            </div>

            <div class="align-middle flex justify-end">
                <ImportMenu on:click={() => graphView.importGraph(graphTextInput, graphTextInputType)} bind:input={graphTextInput} bind:input_type={graphTextInputType} bind:lang={graphTextLang}></ImportMenu>
                <ExportMenu bind:graphView = {graphView}/>
                <Guide/>
            </div>
        </div>

        <div class="h-full w-screen m-0 p-0 focus-visible:ring-ring">
            <Resizable.PaneGroup direction="horizontal">
                <Resizable.Pane defaultSize={20} minSize={12} maxSize={40} class="bg-background z-50 p-4">
                    <!--<input class="mb-4 border-none text-xl bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-fit w-full rounded-md border p-0 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" bind:value={settings.GraphName} placeholder="Graph name"/>-->
                    <!--<AlgoMenu {algo}></AlgoMenu>-->
                    <h1 class="text-2xl">Добро пожаловать!</h1>
                </Resizable.Pane>
                <Resizable.Handle class="z-50" />
                <Resizable.Pane class="z-0">
                    <GraphView bind:this={graphView} oninvalidformat={InvalidFormatToast} oninvalidcode={InvalidCodeToast}/>
                </Resizable.Pane>
            </Resizable.PaneGroup>
        </div>
    </div>
</div>


