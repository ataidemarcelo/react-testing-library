import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../pages';

import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

let pokemonsMock = [];

describe('FavoritePokemons Component', () => {
  beforeAll(() => {
    pokemonsMock = pokemons;
  });

  test(
    'verifica se nenhum pokemon for passado renderiza a msg "No favorite pokemon found"',
    () => {
      renderWithRouter(<FavoritePokemons pokemons={ [] } />);
      const msg = screen.getByText('No favorite pokemon found');
      expect(msg).toBeInTheDocument();
    },
  );

  test(
    'verifica se todos os cards dos pokemons são renderizados por "FavoritePokemons"',
    () => {
      renderWithRouter(<FavoritePokemons pokemons={ pokemonsMock } />);

      const LENGTH_POKEMONS = pokemonsMock.length;
      const pokemonsFavorite = screen.getAllByTestId('pokemon-name');
      expect(pokemonsFavorite).toHaveLength(LENGTH_POKEMONS);
    },
  );
});
