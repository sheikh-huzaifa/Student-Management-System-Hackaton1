import React from 'react'
import PropTypes from 'prop-types'
import MakeAttendence from './MakeAttendence/MakeAttendence'
import Sidebar from '../../Component/Sidebar/sidebar'
const Attendence = props => {
  return (
    <div className="flex d-flex justify-content-start"><Sidebar/>
    <div style={{width:"100vw"}}><MakeAttendence/></div>
    </div>
  )
}

Attendence.propTypes = {}

export default Attendence