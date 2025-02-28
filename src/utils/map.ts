import { Map, View } from 'ol';
import Layer from 'ol/layer/Layer';
import { fromLonLat } from 'ol/proj';
import { OSM } from 'ol/source';
import { z } from 'astro/zod';

const responseObject = z.object({
    licence: z.string(),
    osm_type: z.string(),
    osm_id: z.number(),
    lat: z.string(),
    lon: z.string(),
    place_rank: z.number(),
    category: z.string(),
    type: z.string(),
    importance: z.number(),
    addresstype: z.string(),
    display_name: z.string(),
    name: z.string(),
    address: z.object({
        village: z.string().optional(),
        city: z.string().optional(),
        region: z.string().optional(),
        state_district: z.string().optional(),
        state: z.string(),
        postcode: z.string(),
        country: z.string(),
        country_code: z.string(),
    }),
    boundingbox: z.array(z.string()),
});

export class LocationMap {
    constructor(
        private longtitude: number,
        private latitude: number,
    ) {}

    createMap() {
        return new Map({
            view: new View({
                center: fromLonLat([this.longtitude, this.latitude]),
                zoom: 1,
            }),
            layers: [new Layer({ source: new OSM() })],
        });
    }

    async getAddres() {
        try {
            console.log(this.latitude, this.longtitude);
            const url =
                import.meta.env.PUBLIC_API_ADDRES_URL +
                `lon=${this.longtitude.toFixed(2)}&lat=${this.latitude.toFixed(2)}`;
            const response = await fetch(url, {
                headers: { 'User-Agent': 'Weather-Todo' },
            });
            if (!response.ok) {
                throw new Error('unable to get data');
            }
            const data: LocationResponse = await response.json();
            if (responseObject.parse(data)) {
                return {
                    addres: data.address,
                    error: null,
                };
            }
            throw new Error('undefined behavior');
        } catch (e) {
            console.warn(e);
            return {
                addres: null,
                error: 'error',
            };
        }
    }
}
