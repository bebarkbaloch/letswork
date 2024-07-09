import React from 'react';
import { render, screen, waitFor,act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './store/store';
import { Provider } from 'react-redux';

test('renders learn react link', async () => {
  render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
  );

  // Wait for any asynchronous operations to complete
  await waitFor(() => {

    const linkElement = screen.getByText(/Combo Deals/i);
    expect(linkElement).toBeInTheDocument();
  });
});
