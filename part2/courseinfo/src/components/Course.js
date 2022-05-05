import React from 'react'

const Header = (props) =>  <h1>{props.course.name}</h1> 

const Part = (props) =>  <p>{props.part.name}: {props.part.exercises}</p> 
  
const Content = (props) => props.course.parts.map(par => <Part key = {par.id} part = {par} />)

const Total = (props) => <p><strong>Total of {props.course.parts.reduce((sum,insideparts) => sum + insideparts.exercises,0)} exercises</strong></p>

const Course = (props) => {

    return (
        <div>
        <Header course = {props.course}/>
        <Content course = {props.course}/>
        <Total course = {props.course}/>
        </div>
    )
}
  
export default Course