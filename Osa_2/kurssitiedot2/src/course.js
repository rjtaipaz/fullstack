const Course = ({course}) => {
  
    return (
      <div>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>
      </div>
    )
  }
  const Header = ({course}) => {
    
    return (
      <>
      <h1>{course.name}</h1> 
      </>
    )
  }
  
  const Part = ({part}) => {
    
    return(
      <>
      <p> {part.name} {part.exercises} </p>
      </>
    )
  }
  
  const Content = ({course}) => {
  
    return (
      <div>
      {course.parts.map((part, i)=> <Part key={i} part={part}></Part>)}    
      </div>
    )
  }
  
  const Total = ({course}) => {
    const total =  course.parts.reduce( (s, p) => { return(s + p.exercises)} , 0)
    return (
      <>
      <p>Number of exercises {total} </p> 
      </>
    )
  }

  export {Course, Header, Content, Part, Total}

