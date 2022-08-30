export interface HistoryResponse{
    All: History
}

export interface History {
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
    dates: { [key: string]: number };
    newDates: NewDate[]
}

export interface NewDate{
    date: string,
    allCount: number,
    countByDay: number
}