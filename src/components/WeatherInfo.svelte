<script lang="ts">
    let { time, rain, snowfall, windspeed }: WeatherData = $props();
</script>

<div class="rounded-2xl border border-b-blue-100 p-2">
    <div
        class="flex flex-col gap-1 min-w-10 min-h-10 justify-center items-center"
    >
        {#if !!+rain.trim()}
            <span>&#9748; {rain}</span>
        {/if}
        {#if !!+snowfall}
            <span>&#10054; {snowfall}</span>
        {/if}
        {#if !!+windspeed}
            <span>&#127744; {windspeed}</span>
        {/if}
    </div>
    <div class="flex-1/2">
        <p class="text-black text-center">
            &#x231b; {time.toLocaleTimeString().substring(0, 5)}
        </p>
    </div>
</div>
