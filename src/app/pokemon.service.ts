import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private baseUrl: string = 'https://pokeapi.co/api/v2/pokemon/';
  private baseUrlAbility: string = 'https://pokeapi.co/api/v2/ability/';

  constructor(private http: HttpClient ) { }

  public getPokemon(offset: number, limit: number){
    return this.http.get(`${this.baseUrl}?offset=${offset}&limit=${limit}`);
  }

  public getAllPokemon(offset: number, limit: number){
    return this.http.get(`${this.baseUrl}?offset=${offset}&limit=${limit}`);
  }

  public getPokemonByName(name: string){
    return this.http.get(`${this.baseUrl}${name}`);
  }

  public getPokemonAbility(id: number){
    return this.http.get(`${this.baseUrlAbility}${id}`);
  }
}
