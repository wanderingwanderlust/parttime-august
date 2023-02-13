import React from 'react'
import { render, fireEvent, screen} from '@testing-library/react';

import Square from './Square.js';

test('display square with value', async () => {
    render(<Square value='Greg' />)

    expect(screen.getByTestId("square")).not.toBeNull();
    expect(screen.getByTestId("square").textContent).toBe('Greg')
})

// test('verify onClick event triggers', async () => {
//     const  mockCallback = jest.fn(() => {})

//     render(<Square onClick={mockCallback} />)

//     fireEvent.click(screen.getByTestId('square'));
//     expect(mockCallback.mock.calls.length).toBe(1)
// })