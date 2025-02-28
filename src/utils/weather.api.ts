import { fetchWeatherApi } from 'openmeteo';

const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

export const getWeather = async ({ latitude, longtitude }: Coordinates) => {
    const params = {
        latitude: latitude.toFixed(2),
        longitude: longtitude.toFixed(2),
        hourly: [
            'temperature_2m',
            'rain',
            'showers',
            'snowfall',
            'snow_depth',
            'cloud_cover',
            'visibility',
            'wind_speed_10m',
        ],
    };
    const responses = await fetchWeatherApi(
        import.meta.env.PUBLIC_API_URL,
        params,
    );

    if (!responses.length) {
        throw new Error('unable get weather');
    }

    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    // const timezone = response.timezone();
    // const timezoneAbbreviation = response.timezoneAbbreviation();
    // const latitude = response.latitude();
    // const longitude = response.longitude();

    const hourly = response.hourly()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        hourly: {
            time: range(
                Number(hourly.time()),
                Number(hourly.timeEnd()),
                hourly.interval(),
            ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
            temperature2m: hourly.variables(0)!.valuesArray()!,
            rain: hourly.variables(1)!.valuesArray()!,
            showers: hourly.variables(2)!.valuesArray()!,
            snowfall: hourly.variables(3)!.valuesArray()!,
            snowDepth: hourly.variables(4)!.valuesArray()!,
            cloudCover: hourly.variables(5)!.valuesArray()!,
            visibility: hourly.variables(6)!.valuesArray()!,
            windSpeed10m: hourly.variables(7)!.valuesArray()!,
        },
    };

    const returnData = weatherData.hourly;

    return {
        time: returnData.time,
        temperature: returnData.temperature2m,
        rain: returnData.rain,
        showers: returnData.showers,
        snowfall: returnData.snowfall,
        snowDepth: returnData.snowDepth,
        visibility: returnData.visibility,
        windspeed: returnData.windSpeed10m,
    };
};
