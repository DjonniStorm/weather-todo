<script lang="ts">
    let {time, rain}: WeatherData = $props();
</script>

<div class="rounded-2xl border border-b-blue-100 p-5">
    <div class="flex flex-col rounded border border-b-blue-100">
        {#if !!rain.trim()}
            <span>&#9748;</span>
        {/if}
    </div>
    <div class="flex-1/2">
        <p class="text-black">{time.toLocaleTimeString().substring(0,5)}</p>
    </div>
</div>