import React, { useState } from "react";
import PropTypes from "prop-types";
import Sidebar from "../../Component/Sidebar/sidebar";
import { db } from "../../Config/firebase";
import { doc,setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const initialeState={courseName:"",courseCode:"",courseDescription:""};

const AddCourses = (props) => {
    const[state,setState]=useState(initialeState)
    const handleOnChange=(e)=>{
        setState({...state,[e.target.name]:e.target.value})
        console.log(state);
    }

    const handleOnCLick=async(e)=>{
        e.preventDefault();
        const{
            courseName,
            courseCode,
            courseDescription
        }=state
    let courseId =  Math.random().toString(36).slice(2);
    console.log(courseId);
    try {
      const docRef = await setDoc(doc(db, "Courses", courseId), {
        CourseId : courseId,
        CourseName: courseName,
        CourseCode: courseCode,
        CourseDescription: courseDescription
      });
      console.log("Document written with ID: ", courseId);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setState(initialeState);
    }
  return (
    <div className="flex d-flex justify-content-start">
      <Sidebar />
      <div className="container">
        <div className="py-2">
          <div className="col-12 col-lg-10 offset-lg-1 pt-5">
            <div className="card customCard p-2 p-md-3 p-lg-5 text-center cardCustom mt-5">
                
                
            <div className="flex d-flex justify-content-around"><h1></h1><h4>Add Course</h4><Link to="/Courses"><button className='btn btn-outline-secondary' >Course</button></Link></div>
              <hr />
              <form onSubmit={handleOnCLick} className="text-center">
                <div className="row">
                  <div className="col-2">Name</div>
                  <div className="col-2 offset-1">Course Code</div>
                  <div className="col-6 offset-1">Description</div>
                </div>
                <div className="row">
                  <div className="col-2">
                    <input
                      className="form-control productFormInputMain"
                      type="text"
                      required
                      placeholder="Course Name"
                      name="courseName"
                      onChange={handleOnChange}
                      value={state.courseName}
                    />
                  </div>
                  <div className="col-2 offset-1">
                    <input
                      className="form-control productFormInputMain"
                      type="text"
                      required
                      placeholder="Course Code"
                      name="courseCode"
                      onChange={handleOnChange}
                      value ={state.courseCode}
                    />
                  </div>
                  <div className="col-6 offset-1">
                    <textarea
                      className="form-control productFormInputMain"
                      cols="50"
                      rows="5"
                      required
                      placeholder="Course Description"
                      name="courseDescription"
                      onChange={handleOnChange}
                      value={state.courseDescription}
                    ></textarea>
                  </div>
                </div>
                <button className={`btn btn-outline-success w-50 my-4 `}>
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AddCourses.propTypes = {};

export default AddCourses;
