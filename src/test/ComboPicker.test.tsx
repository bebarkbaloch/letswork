import React from 'react';
import { render, screen, fireEvent, waitFor ,act} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import comboReducer from '../store/comboSlice';
import ComboPicker from '../components/ComboPicker';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';
fetchMock.enableMocks();

const renderWithProviders = (ui: React.ReactElement) => {
    const store = configureStore({
        reducer: {
            combo: comboReducer,
        },
    });
    return render(<Provider store={store}>{ui}</Provider>);
};

describe('ComboPicker', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    afterEach(() => {

        jest.restoreAllMocks();
    });

    test('renders ComboPicker component', () => {
        renderWithProviders(<ComboPicker />);
        expect(screen.getByText(/Combo Deals/i)).toBeInTheDocument();
        expect(screen.getByText(/Select your combo:/i)).toBeInTheDocument();
    });

    test('fetches and displays combo options', async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify({
                data: [
                    { chips: 'Lays Salted', drink: 'Pepsi', chocolate: 'Cadbury' },
                    { chips: 'Slims', drink: '7Up', chocolate: 'Perk' },
                    { chips: 'Potato Sticks', drink: 'Pepsi', chocolate: 'Now' },
                    { chips: 'Slanty', drink: 'Miranda', chocolate: 'Cadbury' },
                    { chips: 'Slims', drink: 'Pepsi', chocolate: 'Perk' },
                ],
            })
        );

        renderWithProviders(<ComboPicker />);

        expect(screen.getByRole('progressbar', { name: /tail-spin-loading/i })).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByRole('progressbar', { name: /tail-spin-loading/i })).not.toBeInTheDocument();
        });

        expect(screen.getByText(/Lays Salted/i)).toBeInTheDocument();
        expect(screen.getByText(/Slims/i)).toBeInTheDocument();
        expect(screen.getByText(/Potato Sticks/i)).toBeInTheDocument();
        expect(screen.getByText(/Slanty/i)).toBeInTheDocument();
    });

    test('handles tab selection', async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify({
                data: [
                    { chips: 'Lays Salted', drink: 'Pepsi', chocolate: 'Cadbury' },
                    { chips: 'Slims', drink: '7Up', chocolate: 'Perk' },
                    { chips: 'Potato Sticks', drink: 'Pepsi', chocolate: 'Now' },
                    { chips: 'Slanty', drink: 'Miranda', chocolate: 'Cadbury' },
                    { chips: 'Slims', drink: 'Pepsi', chocolate: 'Perk' },
                ],
            })
        );

        await act(async () => {
            renderWithProviders(<ComboPicker />);
        });

        await waitFor(() => {
            expect(screen.getByText(/Lays Salted/i)).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText(/Drinks/i));

        expect(screen.getByText(/Pepsi/i)).toBeInTheDocument();
        expect(screen.getByText(/7Up/i)).toBeInTheDocument();
        expect(screen.getByText(/Miranda/i)).toBeInTheDocument();
        expect(screen.queryByText(/Lays Salted/i)).not.toBeInTheDocument();
    });

    test('handles option selection and dynamic updates', async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify({
                data: [
                    { chips: 'Lays Salted', drink: 'Pepsi', chocolate: 'Cadbury' },
                    { chips: 'Slims', drink: '7Up', chocolate: 'Perk' },
                    { chips: 'Potato Sticks', drink: 'Pepsi', chocolate: 'Now' },
                    { chips: 'Slanty', drink: 'Miranda', chocolate: 'Cadbury' },
                    { chips: 'Slims', drink: 'Pepsi', chocolate: 'Perk' },
                ],
            })
        );

        renderWithProviders(<ComboPicker />);

        await waitFor(() => {
            expect(screen.getByText(/Lays Salted/i)).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText(/Lays Salted/i));
        fireEvent.click(screen.getByText(/Pepsi/i));
        fireEvent.click(screen.getByText(/Cadbury/i));

        expect(screen.getByText(/Selected Combo/i)).toBeInTheDocument();

        const chipsSelected = screen.getAllByText(/Lays Salted/i)[1];
        const drinkSelected = screen.getAllByText(/Pepsi/i)[1];
        const chocolateSelected = screen.getAllByText(/Cadbury/i)[1];

        expect(chipsSelected).toBeInTheDocument();
        expect(drinkSelected).toBeInTheDocument();
        expect(chocolateSelected).toBeInTheDocument();
    });

    test('resets combo selection', async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify({
                data: [
                    { chips: 'Lays Salted', drink: 'Pepsi', chocolate: 'Cadbury' },
                    { chips: 'Slims', drink: '7Up', chocolate: 'Perk' },
                    { chips: 'Potato Sticks', drink: 'Pepsi', chocolate: 'Now' },
                    { chips: 'Slanty', drink: 'Miranda', chocolate: 'Cadbury' },
                    { chips: 'Slims', drink: 'Pepsi', chocolate: 'Perk' },
                ],
            })
        );

        renderWithProviders(<ComboPicker />);

        await waitFor(() => {
            expect(screen.getByText(/Lays Salted/i)).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText(/Lays Salted/i));
        fireEvent.click(screen.getByText(/Pepsi/i));
        fireEvent.click(screen.getByText(/Cadbury/i));

        fireEvent.click(screen.getByText(/Change Combo/i));

        expect(screen.queryByText(/Selected Combo/i)).not.toBeInTheDocument();
    });
});