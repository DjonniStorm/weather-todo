<script lang="ts">
    import { getWeather } from '../utils/weather.api';
    import { LocationMap } from '../utils/map';
    import Weather from './Weather.astro';
    import { onMount } from 'svelte';
    
    type Props = {
        latitude: number;
        longtitude: number;
    }
    let { latitude, longtitude }: Props = $props();

    
    let city = $state('Загружаю...');
    let addres_state = $state("Загружаю...");
    
    onMount(async () => {
        const loc = new LocationMap(longtitude, latitude);
        const addres = await loc.getAddres();
        console.log(addres);
        city = addres.error ? addres.error : (addres.addres!.city ?? addres.addres!.state);
        if (addres.addres) {
            city = addres.addres.city ?? addres.addres.village;
            addres_state = addres.addres.state ?? addres.addres.region;
        }

        const weather = await getWeather({latitude, longtitude});
    })
</script>

<div class="rounded-4xl flex flex-col justify-center items-center border-amber-300 border-2 shadow-2xl p-10">
    <section class="">
        <h1>{addres_state}</h1>
        <span>О погоде в городе {city}</span>
    </section>
    <section>
        <h2>Погода сегодня:</h2>

    </section>
</div>