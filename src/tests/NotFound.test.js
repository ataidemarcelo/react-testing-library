import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('NotFound Component', () => {
  test(
    'verifica se a página contém um H2 com o texto "Page requested not found"',
    () => {
      renderWithRouter(<NotFound />);
      const notFoundHeading = screen.getByRole(
        'heading', { name: /Page requested not found/i, level: 2 },
      );
      expect(notFoundHeading).toBeInTheDocument();
    },
  );

  test('verifica se a página mostra a imagem correta', async () => {
    renderWithRouter(<NotFound />);
    const aboutImg = await screen.findByAltText(/Pikachu crying/i);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(aboutImg.src).toBe(url);
  });
});
