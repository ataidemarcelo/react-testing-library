import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('App Component', () => {
  test('verifica se existe um link e se redireciona para "Favorite Pokémons"', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoriteLink).toBeInTheDocument();

    userEvent.click(favoriteLink);
    const favoriteHeading = screen.getByRole(
      'heading', { name: /Favorite pokémons/i, level: 2 },
    );
    expect(favoriteHeading).toBeInTheDocument();

    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  test('verifica se existe um link e se redireciona para "About"', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /About/i });
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);
    const aboutHeading = screen.getByRole(
      'heading', { name: /About Pokédex/i, level: 2 },
    );
    expect(aboutHeading).toBeInTheDocument();

    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  test('verifica se existe um link e se redireciona para "Home"', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);
    const homeHeading = screen.getByRole(
      'heading', { name: /Encountered pokémons/i, level: 2 },
    );
    expect(homeHeading).toBeInTheDocument();

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('verifica se uma URL inválida, redireciona para página Not Found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/url_invalida');

    const notFoundHeading = screen.getByRole(
      'heading',
      { name: /Page requested not found/i, level: 2 },
    );
    expect(notFoundHeading).toBeInTheDocument();
  });
});
