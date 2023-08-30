import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthPage from './AuthPage';
import {act} from 'react-dom/test-utils';
import {LABEL} from "../../language";

test('renders AuthPage correctly and can toggle between forms', async () => {
    render(<AuthPage/>);

    // check if LoginForm is rendered initially
    const loginButton = screen.getByRole('button', {name: LABEL.LOGIN});
    expect(loginButton).toBeInTheDocument();

    // check for a button to switch formsc
    const toggleButton = screen.getByRole('button', {name: /Switch to Sign up/i});
    expect(toggleButton).toBeInTheDocument();

    // toggle form to SignUpForm
    await act(async () => {
        await userEvent.click(toggleButton);
    });

    // check if SignUpForm is now rendered
    const signUpButton = screen.getByRole('button', {name: LABEL.SIGN_UP});
    expect(signUpButton).toBeInTheDocument();
});
