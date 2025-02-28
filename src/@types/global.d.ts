type RoutesType = {
    routes: Readonly<Route[]>;
};

type Route = {
    name: string;
    href: string;
    text: string;
    target?: '_blank';
};

interface LocationResponse {
    place_id: string;
    licence: string;
    osm_type: string;
    osm_id: string;
    lat: string;
    lon: string;
    place_rank: string;
    category: string;
    type: string;
    importance: string;
    addresstype: string;
    display_name: string;
    name: string;
    address: Address;
    boundingbox: string[];
}

interface Address {
    road: string;
    village: string;
    state_district: string;
    state: string;
    postcode: string;
    country: string;
    country_code: string;
    city: string;
    region: string;
}

type Coordinates = {
    latitude: number;
    longtitude: number;
};
