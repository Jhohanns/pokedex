import { Component, OnInit } from '@angular/core';

import { IPokemonDetail } from '@interfaces/pokemon.interface';
import { Pokemon } from '@services/pokemon';

@Component({
  selector: 'app-pokemon-detail-evolution-chain',
  templateUrl: './pokemon-detail-evolution-chain.component.html',
  styleUrls: ['./pokemon-detail-evolution-chain.component.scss'],
})
export class PokemonDetailEvolutionChainComponent implements OnInit {
  evolutions = [];
  pokemonDetail: IPokemonDetail;

  constructor(private pokemon: Pokemon) {
    this.pokemonDetail = this.pokemon.selectedPokemon;
  }

  ngOnInit() {
    const pokemonSpecieId = this.pokemon.selectedPokemon.species.url.split('/').reverse()[1];
    this.pokemon.getPokemonEvolutionChain(pokemonSpecieId).subscribe((response: any) => this.getEvolutionChain(response));
  }

  getEvolutionChain(evolutionData) {
    let evolutionInfo = evolutionData.chain.evolves_to[0];
    while (evolutionInfo) {
      const evolutionItem: any = {};
      evolutionItem.name = evolutionInfo.species.name;
      evolutionItem.level = evolutionInfo.evolution_details[0].min_level;
      this.evolutions.push(evolutionItem);
      evolutionInfo = evolutionInfo.evolves_to[0];
    }
  }

}
