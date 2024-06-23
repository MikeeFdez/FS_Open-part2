import { useEffect, useState } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import { Notification } from './components/Notification'
import personService from './services/person'
// import axios from 'axios'




const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState(null)
  
  // Así sería utilizando el fetch, al final obtenemos los datos.
  // useEffect(() => {
  //   fetch('http://localhost:3001/persons')
  //     .then(response => {
  //       response.json()
  //       .then(data => {console.log(data)})
  //     })
      
  // }, [])

  // Usando axios:
  // useEffect(() => {
  //   axios
  //     .get('http://localhost:3001/persons')
  //     .then(response => {
  //       setPersons(response.data)
  //     })
  // }, [])

  // Usando axios en el servicio creado:
  useEffect(()=>{
    personService
      .getAll()
      .then(initialPersons => 
        setPersons(initialPersons)
      )
  }, [])

  const addInformation = (event) => {
    
    event.preventDefault() // evita la acción predeterminada de enviar un formulario. La acción predeterminada, entre otras cosas, haría que la página se recargara.

    const personObject = {
      name: newName,
      number: newNumber,
      id: (persons.length + 1).toString(), // podriamos omitir la propiedad id, ¡ya que es mejor dejar que el servidor genere identificadores para nuestros recursos!
    }
    // setPersons(persons.concat(personObject))
    persons.every(person => person.name !== newName) 
      ? personService
          .createPerson(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setMessage(`${newName} was added to the phonebook. Great!`)
            setTimeout(() => {
              setMessage(null)
            }, 2000)
          })
      : window.confirm(`${newName} is already in the agenda, do you want to replace the old number?`)
        ? personService
            .updatePerson({...persons.find(personToModify => personToModify.name === newName)}.id, 
            {...persons.find(personToModify => personToModify.name === newName), number:newNumber})
            .then(modifiedPerson => {
              setPersons(persons.map(person => 
                person.id !== {...persons.find(personToModify => personToModify.name === newName)}.id ? person : modifiedPerson))
              setNewName('')
              setNewNumber('')
              setMessage(`${newName} was modified in the phonebook. Awesome!`)
              setTimeout(() => {
                setMessage(null)
              }, 2000)
            }
            )
        : setNewName('')
          setNewNumber('')

  }

  const handleDelete = (personToDelete) => {
    window.confirm(`Do you want to delete ${personToDelete.name}?`) 
    ? (personService
    .deletePerson(personToDelete.id), 
    setPersons(persons.filter(person => person.id != personToDelete.id)))
    : setPersons(persons)

  }

  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(filterName.toLowerCase())) // Pongo el toLowerCase en ambos sitios por si acaso el usuario mete mayusculas.

  const handleSubmit = (event) => {
    setNewName(event.target.value) //se refiere al valor de entrada de ese elemento.
  }
  const handlePhoneSubmit = (event) => {
    setNewNumber(event.target.value) //se refiere al valor de entrada de ese elemento.
  }
  const handleFilterSubmit = (event) => {
    const filterName = event.target.value
    setFilterName(filterName)
    }

  

  return (
    <div>
    <h2>Phonebook</h2>
    <Notification message={message}/>
    Filter shown with: <Filter value={filterName} onChange={handleFilterSubmit} />
    <h2>Add a new contact</h2>
    <PersonForm onSubmit={addInformation} nameValue={newName} nameChange={handleSubmit} numValue={newNumber} numChange={handlePhoneSubmit} />
    {/* <form onSubmit={addInformation}>
      <div>
        Name: <input value={newName} onChange={handleSubmit}/>
      </div>
      <div>
        Number: <input value={newNumber} onChange={handlePhoneSubmit}/>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form> */}
    <h2>Numbers</h2>
    {personsToShow.map((p, i) => 
      <Persons
      key={i} 
      person={p}
      onClick={() => handleDelete(p)}/>
    )}
    {/* <Persons personsArray={personsToShow} onClick={handleDelete} /> */}
      
      
      {/* {personsToShow.map(person => 
      <p key={person.id}>{person.name} {person.number}</p>
      )} */}
  </div>
  )

}

export default App
