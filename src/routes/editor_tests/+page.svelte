<script lang="ts">
    import GraphView from "./graphView.svelte";
    import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";

    let settings = $state({
        GraphName: "Graph 1",
        View: {
            physics: false
        },
        Edit: {
            directed: false
        }
    });
    $inspect(settings.View.physics)
</script>

<div class=" bg-black h-screen w-screen m-0 text-white">
    <GraphView />
    <div class=" h-full w-full z-0 m-0 p-8 absolute">
        <div class=" bg-zinc-900 z-50 rounded-xl w-full h-14"></div>
        <div class="bg-zinc-950 z-50 rounded-xl w-fit h-fit p-5 mt-5">
            <h1 class="text-xl mb-3">{settings.GraphName}</h1>
            <div class="bg-zinc-900 my-3 p-4 rounded-lg w-96">
                <h2 class="text-lg">View options</h2>
                <div class="text-sm flex flex-row p-0 my-3 w-full">
                    <p class="w-fit text-nowrap">Enable physics</p>
                    <div class=" w-full"></div>
                    <Checkbox class="border-zinc-700 hover:bg-zinc-800 transition-all duration-150" bind:checked={settings.View.physics}/>
                </div>
            </div>
        </div>
    </div>
</div>


