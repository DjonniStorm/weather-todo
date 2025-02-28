<script lang="ts">
    import { onMount } from "svelte";
    import Card from "./Card.svelte";
    import ErrorWeather from "./ErrorWeather.svelte";
    let isLocation = $state(false);
    let error = $state(false);
    let loading = $state(true);

    let coords: {
        latitude: number,
        longtitude: number
    } | null = $state(null);

    onMount(() => {
        if (navigator.geolocation) {
            isLocation = true;
            navigator.geolocation.getCurrentPosition((position) => {
                coords = {
                    latitude: position.coords.latitude,
                    longtitude: position.coords.longitude
                }
                loading = false;
            }, (err) => {
                loading = false;
                error = true;
                console.error(err);
            })
        }
        if (!coords) {
            coords = {
                latitude: 1,
                longtitude: 1,
            }
        }
    })

</script>

<main class="flex-1 flex items-center justify-center">
    {#if loading}
        <div>loading...</div>
    {:else if isLocation && coords}
        <Card {...coords} />
    {:else if error}
        <ErrorWeather />
    {:else}
        <div>бля не ебу что у тебя за устройство такое</div>
    {/if}
</main>