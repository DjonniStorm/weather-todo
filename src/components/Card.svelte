<script lang="ts">
    import { getWeather } from '../utils/weather.api';
    import { LocationMap } from '../utils/map';
    import { onMount } from 'svelte';
    import WeatherInfo from './WeatherInfo.svelte';
    import EmojiDescription from './EmojiDescription.svelte';
    
    type Props = {
        latitude: number;
        longtitude: number;
    }

    type WeatherResponse<T> = {
        [P in keyof T]: T[P] extends Date ? Date[] : Float32Array<ArrayBufferLike>;
    };

    let { latitude, longtitude }: Props = $props();

    
    let city = $state('Загружаю...');

    let addres_state = $state("Загружаю...");

    let weather: WeatherResponse<WeatherData> | null  = $state(null);
    
    onMount(async () => {
        const loc = new LocationMap(longtitude, latitude);
        const addres = await loc.getAddres();
        console.log(addres);
        city = addres.error ? addres.error : (addres.addres!.city ?? addres.addres!.state);
        if (addres.addres) {
            city = addres.addres.city ?? addres.addres.village;
            addres_state = addres.addres.state ?? addres.addres.region;
        }

        weather = await getWeather({latitude, longtitude});
    })


    const getNeededWeather = (weathr: WeatherResponse<WeatherData>) => {
        const now = new Date();

        const closestIndex = weathr.time.reduce((closestIdx, currentTime, index) => {
            const currentDiff = Math.abs(currentTime.getTime() - now.getTime());
            const closestDiff = Math.abs(weathr.time[closestIdx].getTime() - now.getTime());
            return currentDiff < closestDiff ? index : closestIdx;
        }, 0);

        const intervalSize = 5;
        const halfInterval = Math.floor(intervalSize / 2); // 2 до и 2 после
        const startIndex = Math.max(0, closestIndex - halfInterval);
        const endIndex = Math.min(weathr.time.length, startIndex + intervalSize);

        const result: WeatherData[] = weathr.time.slice(startIndex, endIndex).map((time, i) => ({
            time,
            temperature: weathr.temperature[startIndex + i].toFixed(2),
            rain: weathr.rain[startIndex + i].toFixed(2),
            showers: weathr.showers[startIndex + i].toFixed(2),
            snowfall: weathr.snowfall[startIndex + i].toFixed(2),
            snowDepth: weathr.snowDepth[startIndex + i].toFixed(2),
            visibility: weathr.visibility[startIndex + i].toFixed(2),
            windspeed: weathr.windspeed[startIndex + i].toFixed(2),
        }));
        
        return result;
    }
</script>

<div class="rounded-4xl flex flex-col justify-center items-center gap-10 border-amber-300 border-2 shadow-2xl p-10 overflow-hidden md:max-w-10/12">
    <section class="">
        <h1>{addres_state}</h1>
        <span>О погоде в городе {city}</span>
    </section>
    <section class="">
        <h2>Погода сегодня:</h2>
        <div class="flex gap-3 overflow-hidden">
            {#if weather}
                {#each getNeededWeather(weather) as data}
                    <WeatherInfo
                        {...data}
                    />
                {/each}
            {/if}
        </div>
    </section>
    <EmojiDescription />
</div>