import SearchForm from '../../Components/PetAdopt/SearchForm/SearchForm';
import SearchResults from '../../Components/PetAdopt/SearchResults/SearchResults';
import Col from '../../Components/General/Flexboxes/Column/Col';
import { useState } from 'react';
import { Pet } from '../../Interfaces/IPet';
import '../skinnyPage.css';
import './SearchPage.css';

function SearchPage() {
    const [petResults, setPetResults] = useState<Pet[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const searchPetsHandler = (petResults: Pet[]) => {
        setPetResults(petResults);
    };

    const searchPetsErrorHandler = (errorMessage: string | null) => {
        setErrorMessage(errorMessage);
    };

    return (
        <Col styles='skinny-page search-page'>
            <SearchForm onSearchPets={searchPetsHandler} onError={searchPetsErrorHandler} />
            <SearchResults pets={petResults} errorMessage={errorMessage} />
        </Col>
    );
}

export default SearchPage;