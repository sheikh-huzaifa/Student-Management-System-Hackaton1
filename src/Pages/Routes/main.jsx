import React from 'react'
import PropTypes from 'prop-types'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import { Dashboard } from '../Dashboard/Dashboard'
import Students from '../Students/students'
import Courses from '../Courses/Courses'
import Attendence from '../Attendence/Attendence'
import Addstudents from '../Students/addstudents'
import AddCourses from '../Courses/addCourses'


const main = props => {
  return (
    <div >
        <BrowserRouter>
    <Routes >
        <Route path='/' element={<Dashboard/>} />
        <Route path='/Students' element={<Students/>} />
        <Route path='/Courses' element={<Courses/>} />
        <Route path='/Attendence' element={<Attendence/>} />
        <Route path='/addstudents' element={<Addstudents/>} />
        <Route path='/addCourses' element={<AddCourses/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  )
}

main.propTypes = {}

export default main