import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../pages';
import { PokemonButtonsPanel } from '../components';

import pokemons from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

const pokemonTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

describe('Pokedex Component', () => {
  test(
    'verifica se a página contém um heading h2 com o texto Encountered pokémons',
    () => {
      renderWithRouter(
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteById }
        />,
      );

      const pokedexHeading = screen.getByRole(
        'heading', { name: /Encountered pokémons/i, level: 2 },
      );
      expect(pokedexHeading).toBeInTheDocument();

      const buttonAll = screen.getByRole('button', { name: /All/i });
      expect(buttonAll).toBeInTheDocument();
      userEvent.click(buttonAll);

      const pokemonsCard = screen.getAllByTestId('pokemon-name');
      expect(pokemonsCard.length).not.toBe(0);
    },
  );

  test('verifica se a Pokedex tem os botões de filtro em PokemonButtonsPanel', () => {
    renderWithRouter(
      <PokemonButtonsPanel
        pokemonTypes={ pokemonTypes }
        filterPokemons={ () => filterPokemons('all') }
      />,
    );

    pokemonTypes.forEach((type) => {
      expect(screen.getByText(type)).toBeInTheDocument();
    });

    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons[pokemonTypes.length - 1]).toBeInTheDocument();

    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).toBeInTheDocument();
  });

  test(
    'verifica se é exibido o próximo pokémon quando o botão Próximo pokémon é clicado',
    () => {
      renderWithRouter(
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteById }
        />,
      );

      const buttonAll = screen.getByRole('button', { name: /All/i });
      expect(buttonAll).toBeInTheDocument();

      const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
      expect(buttonNext).toBeInTheDocument();

      userEvent.click(buttonNext);
      const nextPokemon = screen.getByTestId('pokemon-name');
      expect(nextPokemon).toHaveTextContent('Charmander');
    },
  );
});
