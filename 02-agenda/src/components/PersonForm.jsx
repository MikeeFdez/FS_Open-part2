

export const PersonForm = ({ onSubmit, nameValue, numValue, nameChange, numChange }) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                Name: <input value={nameValue} onChange={nameChange}/>
            </div>
            <div>
                Number: <input value={numValue} onChange={numChange}/>
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}