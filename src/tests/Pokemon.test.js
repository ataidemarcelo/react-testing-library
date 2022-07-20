import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';

import pokemons from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Pokemon Component', () => {
  test('verifica se é renderizado um card com as informações corretas.', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ isPokemonFavoriteById[pokemons[0].id] }
      />,
    );

    const pokemonsName = screen.getAllByTestId('pokemon-name');
    expect(pokemonsName[0]).toHaveTextContent('Pikachu');

    const pokemonsType = screen.getAllByTestId('pokemon-type');
    expect(pokemonsType[0]).toHaveTextContent('Electric');

    const pokemonsWeight = screen.getAllByTestId('pokemon-weight');
    expect(pokemonsWeight[0]).toHaveTextContent('Average weight: 6.0 kg');

    const pokemonSprite = screen.getByAltText(/Pikachu sprite/i);
    const url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(pokemonSprite).toBeInTheDocument();
    expect(pokemonSprite.src).toBe(url);

    const favoriteIcon = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon.src).toBe('http://localhost/star-icon.svg');

    const moreDetails = screen.getByRole('link', { name: /More Details/i });
    expect(moreDetails.href).toBe('http://localhost/pokemons/25');
  });
});
