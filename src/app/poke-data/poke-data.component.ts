import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../models/pokemon';

@Component({
  selector: 'app-poke-data',
  templateUrl: './poke-data.component.html',
  styleUrls: ['./poke-data.component.sass']
})
export class PokeDataComponent implements OnInit {

  
  pokemon: Pokemon = {
    id: null,
    image: '',
    name: '',
    weight: null,
    height: null,
    base_experience: null,
    abilities: [],
    generation: [],
    types: [],
  };
  baseImageUrl: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  abilities: Array<{name: string}> = [];
  types: Array<{types: string}> = [];
  generation: Array<{generation: string, effect_entries: string}> = []

  constructor(public dialogRef: MatDialogRef<PokeDataComponent>, private pokemonService: PokemonService) {
    if (this.dialogRef._containerInstance._config.data !== undefined) {
      this.pokemon = this.dialogRef._containerInstance._config.data;
    }
    console.log(this.pokemon);
  }

  ngOnInit() {
    console.log(this.pokemon.name)
    this.pokemonService.getPokemonByName(this.pokemon.name).subscribe((res: any) => {

      //GET POKEMON GENERATION
      this.pokemonService.getPokemonAbility(this.pokemon.id).subscribe((response: any) =>{
        return this.generation.push({
          effect_entries: response.effect_entries,
          generation: response.generation.name,
        })
      })

      console.log(this.generation)

      //GET POKEMON TYPES
      res.types.map((types) => {
        this.pokemon.types = types.type.name;
        this.types.push(types.type.name)
        console.log(this.types.join(','))
        return this.types;
      })

      //GET POKEMON ABILITY/ABITLITIES
      res.abilities.map((ability) => {
        this.pokemon.abilities = ability.ability.name;
        this.abilities.push(ability.ability.name)
        console.log(this.abilities.join(','))
        return this.abilities;
      })
      console.log(res);
      return this.pokemon = {
        id: this.pokemon.id,
        image: this.pokemon.image,
        name: this.pokemon.name,
        weight: res.weight,
        height: res.height,
        base_experience: res.base_experience,
        abilities: res.abilities,
        generation: this.pokemon.generation,
        types: res.types
      };
    })
  }

  onClose(pokemon) {
    this.dialogRef.close(pokemon);
  }

}
