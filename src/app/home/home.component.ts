import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../models/pokemon';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { PokeDataComponent } from '../poke-data/poke-data.component';
import { Ability } from '../models/ability';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  pokemon: Pokemon[] = [];
  ability: Ability[] = [];
  searchResult: Pokemon[] = [];
  input: String;
  // generation: String;
  baseImageUrl: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  types: Array<{types: string}> = []


  constructor(private pokemonService: PokemonService, private dialog: MatDialog) { }

  ngOnInit() {
    //Get Pokemons
    this.pokemonService.getPokemon(this.pokemon.length, 25).subscribe((res: any) => {
      res.results.map((pokemon, i) => {
        const id: number =  this.pokemon.length + 1;
        this.pokemonService.getPokemonAbility(id).subscribe((response: any) =>{
          return this.ability.push({
            id: response.id,
            effect_entries: response.effect_entries,
            generation: response.generation.name,
          })
        })
        // console.log(pokemon)

        return this.pokemon.push({
          name: pokemon.name,
          image: `${this.baseImageUrl}${id}.png`,
          weight: pokemon.weight,
          abilities: null,
          height: null,
          base_experience: null,
          generation: this.ability,
          types: null,
          id
        })
      })
      
      console.log(this.pokemon)
      return this.pokemon;
    })
  }

  openPokemon(pokemon){
    console.log('open', pokemon);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = pokemon;
    const dialogRef = this.dialog.open(PokeDataComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result !== undefined) {
        this.pokemon.push(result);
      }
  });
  }

  search(input) {
    console.log(input);
    this.searchResult = [];
    const value = input !== '';
    console.log(value);
    
    this.pokemonService.getAllPokemon(this.pokemon.length, 807).subscribe((res: any) => {
      res.results.map((pokemon, i) => {
        const id: number = i + this.pokemon.length + 1;
        return this.pokemon.push({
          name: pokemon.name,
          image: `${this.baseImageUrl}${id}.png`,
          weight: pokemon.weight,
          abilities: null,
          height: null,
          base_experience: null,
          generation: pokemon.generation,
          types: null,
          id
        })
      })
      
      console.log(this.pokemon)
      return this.pokemon;
    })

    if (input !== '') {
      this.pokemon.filter((pokemon: Pokemon) => {
        if (pokemon.name.toLowerCase().indexOf(input.toLowerCase()) > -1) {
          console.log(pokemon)
          this.searchResult.push(pokemon);
        } 
        // else if (pokemon.pokemon_code.toLowerCase().indexOf(input.toLowerCase()) > -1) {
        //   this.searchResult.push(pokemon);
        // }
      });
    }

    if (value === true && this.searchResult.length === 0) {
      console.log('not found');
      // this.found = false;
    } else {
      console.log('found');
      // this.found = true;
    }
    // console.log(this.searchResult);
  }

}
