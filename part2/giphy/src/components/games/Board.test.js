import React from 'react'
import { render, fireEvent, screen} from '@testing-library/react';

import Board from './Board.js';

const squareArray = ['X', null, 'O', null, 'X', 'O', null, 'X', null]

test('display Square with the correct value', async () => {
    render(<Board squares={squareArray} />)
    
    const squares = screen.getAllByTestId('square');
    expect(squares.length).toBe(9);
    expect(squares[0].textContent).toBe('X');
    expect(squares[1].textContent).toBe('');
    expect(squares[2].textContent).toBe('O');
    expect(squares[3].textContent).toBe('');
    expect(squares[4].textContent).toBe('X');
    expect(squares[5].textContent).toBe('O');
    expect(squares[6].textContent).toBe('');
    expect(squares[7].textContent).toBe('X');
    expect(squares[8].textContent).toBe('');
})

// test('handle onClick event', async () => {
//     const mockCallback = jest.fn((i) => {});
//     render(<Board squares={squareArray} onclick={mockCallback} />)
//     fireEvent.click(screen.getAllByTestId('square')[2]);
//     expect(mockCallback.mock.calls.length).toBe(1)
// })