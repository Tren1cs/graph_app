<script lang="ts">
    import GraphView from "./graphView.svelte";
    import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import generateVertices from "./graphView.svelte"

    let settings = $state({
        GraphName: "Graph 1",
        View: {
            physics: false
        },
        Edit: {
            directed: false
        }
    });
    let graphView;
</script>

<div class=" bg-black h-screen w-screen m-0 text-white">
    <GraphView bind:this={graphView} />
    <div class=" h-full w-full z-0` m-0 p-8 absolute">
        <div class=" bg-zinc-900 z-50 rounded-xl w-full h-14 relative"></div>

        <div class="bg-zinc-950 z-50 rounded-xl w-fit h-fit p-5 mt-5 relative">
            <h1 class="text-xl mb-3">{settings.GraphName}</h1>
            <div class="bg-zinc-900 my-3 p-4 rounded-lg w-96">
                <h2 class="text-lg">🚧UNDER CONSTRUCTION🚧</h2>
            </div>
            <div class="bg-zinc-900 my-3 p-4 rounded-lg w-96">
                <h2 class="text-lg">DEBUG</h2>
                <div class="h-6text-sm flex flex-row p-0 my-3 w-full">
                    <p class="h-6 w-fit text-nowrap">BEHOLD, THE CHECKBOX</p>
                    <div class="h-6 w-full"></div>
                    <Checkbox class="border-zinc-700 hover:bg-zinc-800 transition-all duration-150 z-auto my-auto" bind:checked={settings.View.physics}/>
                </div>
                <div class="h-6">
                    <Button variant="secondary" on:click={graphView.generateVertices}>Spawn vertices</Button>
                </div>

            </div>
        </div>
    </div>
</div>


