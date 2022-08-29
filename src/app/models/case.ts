export interface CaseResponse{
    All: Case
}

export interface Case {
    confirmed: number;
    recovered: number;
    deaths: number;
    country: string;
    population: number;
    sq_km_area: number;
    life_expectancy: string;
    elevation_in_meters: number;
    continent: string;
    abbreviation: string;
    location: string;
    iso: number;
    capital_city: string;
    lat: string;
    long: string;
    updated: Date;
}