import React from "react";
import {render, firEvent, screen} from '@testing-library/react';
import TicTacToe from "./TicTacToe";


test('displays squares with our initial state', async () => {
    render(<TicTacToe />);

    const squares = screen.getAllByTestId('square');
    expect(squares.length).toBe(9)
    expect(squares[0].textContent).toBe('')
})