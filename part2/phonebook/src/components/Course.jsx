const Header = ({ course }) => <h1>{course.name}</h1>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ course }) => {
    const parts = course.parts
    
    return (
        <div>
            {parts.map(part => 
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}
 
const Total = ({ parts }) => {
    const total = parts.reduce((sum, course) => sum + course.exercises, 0)

    return <p><strong>total of {total} exercises</strong></p>
}

const Course = ({ courses }) => {    
    return (
    <>
        {courses.map(elem => {
            return (
            <div key={elem.id}>
                <Header course={elem} />
                <Content key={elem.id} course={elem} />
                <Total parts={elem.parts} />
            </div>
            )
        }
        )}
    </>
    )
}

export default Course