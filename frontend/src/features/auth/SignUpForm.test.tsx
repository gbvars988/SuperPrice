import React from 'react';
import {render, screen} from '@testing-library/react';
import SignUpForm from './SignUpForm';
import {LABEL} from '../../language';
import {BrowserRouter} from 'react-router-dom';

const renderWithRouter = (ui: React.ReactElement) => {
    return render(
        <BrowserRouter>
            {ui}
        </BrowserRouter>
    );
};

test('renders SignUpForm correctly', () => {
    renderWithRouter(<SignUpForm/>);


    // check that all labels and buttons are included in the sign up form
    const emailLabel = screen.getByText(LABEL.EMAIL);
    expect(emailLabel).toBeInTheDocument();

    const passwordLabel = screen.getByText(LABEL.PASSWORD);
    expect(passwordLabel).toBeInTheDocument();

    const confirmPasswordLabel = screen.getByText(LABEL.CONFIRM_PASSWORD);
    expect(confirmPasswordLabel).toBeInTheDocument();

    const firstNameLabel = screen.getByText(LABEL.FIRST_NAME);
    expect(firstNameLabel).toBeInTheDocument();

    const lastNameLabel = screen.getByText(LABEL.LAST_NAME);
    expect(lastNameLabel).toBeInTheDocument();

    const submitButton = screen.getByRole('button', {name: LABEL.SIGN_UP});
    expect(submitButton).toBeInTheDocument();
});