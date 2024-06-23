

export const Course = ({ course }) => {

    const coursesTitles = course.map(part => 
        <section key={part.id}>
            <h2>
                {part.name}
            </h2>
            {
                part.parts.map(subpart=>
                    <p key={subpart.id}>
                        {subpart.name} {subpart.exercises}
                    </p>
                    
                )

            }
            <p><b>Total of {
                part.parts.map(p => 
                    p.exercises).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
            } exercises</b></p>
        </section>
    )

    return (
        <main>
            <h1>Web development curriculum</h1>
                {coursesTitles}

                {/* {course.map(part => 
                <h2 key={part.id}>
                    {part.name}
                </h2>
                )}
                {course.map(part =>
                    part.parts.map(p=>
                        <p key={p.id}>{p.name}</p>
                    )
                )
                } */}
                
                {/* {course.parts.map(p => 
                <p key={p.key}>
                    {p.name}
                </p>)}        */}
            
                {/* <ul>
                    {course.parts.map(part => 
                        <li key={part.id}>
                            {part.name} {part.exercises}
                        </li>
                    )}
                    <li><b>Total of {total} exercises</b></li>
                </ul> */}
        </main>

    )

}


