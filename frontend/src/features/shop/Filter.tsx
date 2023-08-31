import React from 'react';
import {Button, Checkbox, Heading, HStack, VStack} from '@chakra-ui/react';
import Categories from './Categories';
import {LABEL} from "../../language";

interface FilterProps {
    filterState: Record<string, boolean>;
    setFilterState: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const Filter: React.FC<FilterProps> = ({filterState, setFilterState}) => {
    const handleCheckboxChange = (category: string) => {
        setFilterState(prevState => ({...prevState, [category]: !prevState[category]}));
    };

    const clearFilters = () => {
        const clearedFilters = Object.fromEntries(
            Object.keys(filterState).map(key => [key, false])
        );
        setFilterState(clearedFilters);
    };

    return (
        <VStack align="stretch" spacing={4}>
            <HStack justify="space-between">
                <Heading as="h4" size="md">
                    {LABEL.FILTER}
                </Heading>
                <Button size="sm" onClick={clearFilters}>
                    {LABEL.CLEAR_FILTERS}
                </Button>
            </HStack>

            <Heading as="h5" size="sm">
                {LABEL.CATEGORIES}
            </Heading>

            {Object.entries(Categories).map(([key, value]) => (
                <Checkbox key={key} isChecked={filterState[value]} onChange={() => handleCheckboxChange(value)}>
                    {value}
                </Checkbox>
            ))}
        </VStack>
    );
};

export default Filter;
