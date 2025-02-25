<script lang="ts">
    import Button from "./Button.svelte";
</script>

<div>
    <Button text='click!' onclick={() => {
        console.log('clicked!');
    }} />
</div>