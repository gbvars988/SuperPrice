import React, {useState} from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Filter from './Filter';
import Categories from './Categories';
import {LABEL} from '../../language';
import {act} from "react-dom/test-utils";

const initialFilterState = Object.fromEntries(
    Object.values(Categories).map(category => [category, false])
) as Record<string, boolean>;

test('renders the filter component correctly', () => {
    render(<Filter filterState={initialFilterState} setFilterState={() => {
    }}/>);

    const filterHeader = screen.getByText(LABEL.FILTER);
    expect(filterHeader).toBeInTheDocument();

    const clearFiltersButton = screen.getByText(LABEL.CLEAR_FILTERS);
    expect(clearFiltersButton).toBeInTheDocument();

    // check if all category checkboxes are displayed
    for (const category of Object.values(Categories)) {
        const checkbox = screen.getByText(category);
        expect(checkbox).toBeInTheDocument();
    }
});


test('clears all filters when Clear Filters button is clicked', () => {
    const initialFilterState = Object.fromEntries(
        Object.values(Categories).map((category) => [category, false])
    ) as Record<string, boolean>;

    const Wrapper: React.FC = () => {
        const [state, setState] = useState(initialFilterState);

        return (
            <div>
                <Filter filterState={state} setFilterState={setState}/>
                <div data-testid="meat-category-status">
                    {String(state[Categories.MeatSeafood])}
                </div>
            </div>
        );
    };

    render(<Wrapper/>);

    // simulate clicking a checkbox to set its state to true
    act(() => {
        fireEvent.click(screen.getByText(Categories.MeatSeafood));
    });

    // check if the checkbox is checked
    expect(screen.getByTestId('meat-category-status')).toHaveTextContent('true');

    // simulate clicking the clear filter button
    act(() => {
        fireEvent.click(screen.getByText(LABEL.CLEAR_FILTERS));
    });

    // check if all checkboxes are cleared
    expect(screen.getByTestId('meat-category-status')).toHaveTextContent('false');
});
