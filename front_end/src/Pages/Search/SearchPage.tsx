import SearchForm from '../../Components/PetAdopt/SearchForm/SearchForm';
import SearchResults from '../../Components/PetAdopt/SearchResults/SearchResults';
import Col from '../../Components/General/Flexboxes/Column/Col';
import { useState } from 'react';
import { Pet } from '../../Interfaces/IPet';
import '../skinnyPage.css';
import './SearchPage.css';

function SearchPage() {
    const [petResults, setPetResults] = useState<Pet[]>([]);

    const searchPetsHandler = (petResults: Pet[]) => {
        setPetResults(petResults);
    };

    return (
        <Col styles='skinny-page search-page'>
            <SearchForm onSearchPets={searchPetsHandler} />
            <SearchResults pets={petResults} />
        </Col>
    );
}

export default SearchPage;