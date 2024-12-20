<script lang="ts">
    import LanguageSelection from './LanguageSelection.svelte';

    import { buttonVariants } from "$lib/components/ui/button/index.js";

    import Button from "$lib/components/ui/button/button.svelte";
    import { ArrowDownToLine, InfoIcon } from 'lucide-svelte';
    import * as Dialog from "$lib/components/ui/dialog";
    import * as Tabs from "$lib/components/ui/tabs";

    import { Textarea } from "$lib/components/ui/textarea/index.js";
</script>

<Dialog.Root>
    <Dialog.Trigger class={buttonVariants({ variant: "outline" }) + " mr-2"}><InfoIcon class="mr-2 h-6 w-6"/>Guide</Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title class="mb-4 text-4xl"  >Description</Dialog.Title>
            <Dialog.Description class="text-xl">This is graph editor. You can import, export and edit graph here.</Dialog.Description>
            <Dialog.Title class="mb-4 text-4xl" >Formats
                <p></p>
                <a href="https://en.wikipedia.org/wiki/Edge_list" class="text-2xl" style = "color: rgb(136, 162, 255);">Edge list</a>
                <Dialog.Description class="text-xl" style = "">*Vertice A* *Vertice B*</Dialog.Description>
                <Dialog.Description class="text-xl" style = "">...</Dialog.Description>
                <Dialog.Description class="text-xl">*Vertice X* *Vertice Y*</Dialog.Description>
                
                <p></p>
                <a href="https://en.wikipedia.org/wiki/Adjacency_matrix" class="text-2xl" style = "color: rgb(136, 162, 255);">Adjacency matrix</a>
                <Dialog.Description class="text-xl">⠀⠀⠀*A*⠀*B*⠀*C* </Dialog.Description>
                <Dialog.Description class="text-xl">*A*⠀⠀0⠀⠀1⠀⠀⠀0</Dialog.Description>
                <Dialog.Description class="text-xl">*B*⠀⠀1⠀⠀0⠀⠀⠀1</Dialog.Description>
                <Dialog.Description class="text-xl">*C*⠀⠀0⠀⠀1⠀⠀⠀0</Dialog.Description>
                <Dialog.Description></Dialog.Description>
            </Dialog.Title>

            <Dialog.Title class="mb-4 text-4xl"  >Hotkeys</Dialog.Title>
            <Dialog.Description class="text-xl">Left click on vertice - select vertice</Dialog.Description>
            <Dialog.Description class="text-xl">Right click on vertice - delete vertice</Dialog.Description>
            <Dialog.Description class="text-xl">Middle click/Left click on workspace and drag - move workspace</Dialog.Description>
            <Dialog.Description class="text-xl">Left click on vertice and drag - move vertice</Dialog.Description>
            <Dialog.Description class="text-xl">Left click on workspace and drag - move workspace</Dialog.Description>
            <Dialog.Description class="text-xl">Double left click on workspace - spawn new vertice</Dialog.Description>
            <Dialog.Description class="text-xl">Mouse wheel up/down - upscale/downscale workspace</Dialog.Description>
            <Dialog.Description class="text-xl">Select vertice + Shift + Left click on another vertice - create edge</Dialog.Description>
        </Dialog.Header>
    </Dialog.Content>
</Dialog.Root>
