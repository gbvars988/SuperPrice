import React from 'react';
import {render, screen} from '@testing-library/react';
import SignUpForm from './SignUpForm';
import {LABEL} from '../../language';

test('renders SignUpForm correctly', () => {
    render(<SignUpForm/>);

    // check that all labels and buttons are included in the sign up form
    const emailLabel = screen.getByText(LABEL.EMAIL);
    expect(emailLabel).toBeInTheDocument();

    const passwordLabel = screen.getByText(LABEL.PASSWORD);
    expect(passwordLabel).toBeInTheDocument();

    const confirmPasswordLabel = screen.getByText(LABEL.CONFIRM_PASSWORD);
    expect(confirmPasswordLabel).toBeInTheDocument();

    const submitButton = screen.getByRole('button', {name: LABEL.SIGN_UP});
    expect(submitButton).toBeInTheDocument();
});

// TODO: add other sign up behaviour tests here when that is implemented
