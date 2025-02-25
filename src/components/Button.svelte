<script lang="ts">
    type Props = {
        text: string;
        onclick: () => void;
    }

    let { text, onclick }: Props = $props();
    console.log(text, onclick)
</script>

<button class="rounded-m border text-black bg-red border-black" onclick={onclick}>{text}</button>
