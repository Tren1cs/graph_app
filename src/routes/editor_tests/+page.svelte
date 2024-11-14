<script lang="ts">
    import ImportMenu from './ImportMenu.svelte';
    import GraphView from "./graphView.svelte";
    import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import generateVertices from "./graphView.svelte"
    import { ArrowDownToLine } from 'lucide-svelte';
    import { ArrowUpFromLine } from "lucide-svelte";

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

<div class=" bg-background h-screen w-screen m-0 text-white">
    <GraphView bind:this={graphView} />

    <div class=" h-full w-screen z-0 m-0 p-0">
        <div class=" h-fit border-b border-secondary bg-background flex flex-row justify-between z-50 w-full p-4 absolute">
            <div class="h-10 content-center">
                <p class="text-2xl text-center">Graph Editor</p>
            </div>

            <div class="align-middle flex justify-end">
                <ImportMenu></ImportMenu>
                <Button variant="secondary" class=""><ArrowUpFromLine class="mr-2 h-4 w-4" />Export</Button>
            </div>
        </div>
    </div>
</div>


