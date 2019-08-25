export interface Pokemon {
    id: number;
    image: string;
    name: string;
    weight: number;
    height: number;
    base_experience: number;
    abilities: [];
    generation: any;
    types: [];
}