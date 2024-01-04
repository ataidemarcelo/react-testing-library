import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import renderWithRouter from '../renderWithRouter';

import App from '../App';

describe('PokemonDetails Component', () => {
  test(
    'verifica se as informações detalhadas do pokémon selecionado são mostradas na tela:',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/pokemons/25');

      const pokemonName = screen.getByRole('heading', { name: /Pikachu Details/i });
      expect(pokemonName).toBeInTheDocument();

      const gameLocation = screen.getByRole(
        'heading',
        { name: /Game Locations of Pikachu/i, level: 2 },
      );
      expect(gameLocation).toBeInTheDocument();

      const summaryHeading = screen.getByRole(
        'heading',
        { name: /Summary/i, level: 2 },
      );
      expect(summaryHeading).toBeInTheDocument();

      const summaryParagraph = screen.getByText(/This intelligent Pokémon/i);
      expect(summaryParagraph).toBeInTheDocument();

      const favoriteInput = screen.getByRole(
        'checkbox',
        { name: /Pokémon favoritado/i },
      );
      expect(favoriteInput).toBeInTheDocument();

      const url = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
      const imageLocation = screen.getAllByAltText('Pikachu location');
      expect(imageLocation[0]).toBeInTheDocument();
      expect(imageLocation[0].src).toBe(url);
    },
  );
});
