
import { useState, useEffect } from 'react';
import useBreedList from './useBreedList';
import Result from './Results';

const ANIMALS = ["bird", "dog", "cat", "rabbit", "horse"];

const SearchParams = () => {
    //const location = "India"

    // const locationTuple = useState("India");
    // const location = locationTuple[0];
    // const setLocation = locationTuple[1];

    const [location, setLocation] = useState("");

    // function updateLocation(e) {
    //     setLocation(e.target.value)
    // }

    const [animal, setAnimal] = useState("");
    const [breed, setBreed] = useState("");
    const [pets, setPets] = useState([]);
    const [breedList] = useBreedList(animal);

    useEffect(() => {
        requestPets();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    async function requestPets() {
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
        );
        const json = await res.json();
        setPets(json.pets);
    }

    return (
        // class cannot be used because class is keyword in javascript. 
        <div className="search-params">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    requestPets();
                }} >
                <label htmlFor="location">
                    Location
                    <input id="location"
                        onChange={(e) => setLocation(e.target.value)}
                        //onChange={updateLocation}
                        value={location}
                        placeholder="Location"
                    />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        value={animal}
                        onChange={(e) => setAnimal(e.target.value)}
                        onBlur={(e) => setAnimal(e.target.value)}
                    >
                        <option />
                        {
                            ANIMALS.map(animal => (
                                <option value={animal} key={animal}>
                                    {animal}
                                </option>
                            ))
                        }
                    </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select
                        id="breed"
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                        onBlur={(e) => setBreed(e.target.value)}
                    >
                        <option />
                        {
                            breedList.map(breed => (
                                <option value={breed} key={breed}>
                                    {breed}
                                </option>
                            ))
                        },
                    </select>
                </label>
                <button>Submit</button>
            </form>
            <Result pets={pets} />
        </div>
    )
}

export default SearchParams;