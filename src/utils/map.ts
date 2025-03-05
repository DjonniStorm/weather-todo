import { Map, View } from 'ol';
import Layer from 'ol/layer/Layer';
import { fromLonLat } from 'ol/proj';
import { OSM } from 'ol/source';
import { z } from 'astro/zod';

const responseObject = z.object({
    licence: z.string().optional(),
    osm_type: z.string().optional(),
    osm_id: z.number().optional(),
    lat: z.string().optional(),
    lon: z.string().optional(),
    place_rank: z.number().optional(),
    category: z.string().optional(),
    type: z.string().optional(),
    importance: z.number().optional(),
    addresstype: z.string().optional(),
    display_name: z.string().optional(),
    name: z.string().optional(),
    address: z.object({
        village: z.string().optional(),
        city: z.string().optional(),
        region: z.string().optional(),
        state_district: z.string().optional(),
        state: z.string().optional(),
        postcode: z.string().optional(),
        country: z.string().optional(),
        country_code: z.string().optional(),
    }),
    boundingbox: z.array(z.string()).optional(),
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
                error: 'Невозможно получить адрес',
            };
        }
    }
}
