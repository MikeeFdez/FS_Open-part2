
export const Persons = ({ person, onClick }) => {
    return (
        // personsArray.map(person => 
        //     <p key={person.id}>{person.name} {person.number} <button onClick={onClick}>delete</button></p>
        <p>
            {person.name} {person.number} <button onClick={onClick}>delete</button>
        </p>
            
        )
}

