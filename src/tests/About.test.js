import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('About Component', () => {
  test('verifica se a página contém as informações sobre a Pokédex', async () => {
    renderWithRouter(<About />);

    const aboutHeading = screen.getByRole(
      'heading', { name: /About Pokédex/i, level: 2 },
    );
    expect(aboutHeading).toBeInTheDocument();

    const paragraphsAbout = screen.getAllByText(/Pokémons/i);
    expect(paragraphsAbout).toHaveLength(2);

    const aboutImg = await screen.findByAltText('Pokédex');
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(aboutImg.src).toBe(url);
  });
});
