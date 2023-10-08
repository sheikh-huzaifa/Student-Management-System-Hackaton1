import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Sidebar from "../../Component/Sidebar/sidebar";
import { db } from "../../Config/firebase";
import { doc, setDoc ,collection,getDocs } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";
const initialeState = {
  studentName: "",
  studentPhoneNo: "",
  studentAge: "",
  studentEnrolCourse: "",
};



const Addstudents = (props) => {
    
    const[courses,setCourses]=useState([])
    const onRead = async () => {
        const array = [];
        const querySnapshot = await getDocs(collection(db, "Courses"));
        querySnapshot.forEach((doc) => {
          // console.log(`${doc.id} => ${doc.data()}`);
          const data = doc.data();
          array.push(data);
          data["id"] = doc.id;
          console.log(data);
        });
        setCourses(array);
        console.log(typeof(state));
        console.log(courses.CourseId);
      };

      useEffect(()=>{onRead()},[])


  
  const [state, setState] = useState(initialeState);
  const handleOnChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    console.log(state);
  };

  const handleOnCLick = async (e) => {
    e.preventDefault();
    const { studentName, studentPhoneNo, studentAge, studentEnrolCourse } =
      state;
    let studentId = Math.random().toString(36).slice(2);
    console.log(studentId);
    try {
      const docRef = await setDoc(doc(db, "Student", studentId), {
        StudentId: studentId,
        StudentName: studentName,
        StudentCode: studentPhoneNo,
        StudentAge: studentAge,
        StudentEnrolCourse: studentEnrolCourse,
      });
      console.log("Document written with ID: ", studentId);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setState(initialeState);
  };
  return (
    <div className="flex d-flex justify-content-start">
      <Sidebar />
      <div className="container">
        <div className="py-2">
          <div className="col-12 col-lg-10 offset-lg-1 pt-5">
            <div className="card customCard p-2 p-md-3 p-lg-5 text-center cardCustom mt-5">
            <div className="flex d-flex justify-content-around"><h1></h1><h4>Add Students</h4><Link to="/Students"><button className='btn btn-outline-secondary' >Students</button></Link></div>
              <hr />
              <form onSubmit={handleOnCLick} className="text-center">
                <div className="row">
                  <div className="col-2">Student Name</div>
                  <div className="col-2 offset-1">Student Phone No</div>
                  <div className="col-2 offset-1">Student Age</div>
                  <div className="col-2 offset-1">Enrol COurse</div>
                </div>
                <div className="row">
                  <div className="col-2">
                    <input
                      className="form-control productFormInputMain"
                      type="text"
                      required
                      placeholder="Student Name"
                      name="studentName"
                      onChange={handleOnChange}
                      value={state.studentName}
                    />
                  </div>
                  <div className="col-2 offset-1">
                    <input
                      className="form-control productFormInputMain"
                      type="number"
                      required
                      placeholder="Student Phonen No"
                      name="studentPhoneNo"
                      onChange={handleOnChange}
                      value={state.studentPhoneNo}
                    />
                  </div>
                  <div className="col-2 offset-1">
                    <input
                      className="form-control productFormInputMain"
                      type="number"
                      required
                      placeholder="Student Age"
                      name="studentAge"
                      onChange={handleOnChange}
                      value={state.studentAge}
                    ></input>
                  </div>
                  <div className="col-2 offset-1">
                    <select
                       onChange={handleOnChange} name="studentEnrolCourse" required
                      class="form-select"
                      aria-label="Courses"
                    >
                      <option selected>Select Course</option>
                      {courses.map((course , i)=>{
                        return(
                            <option  value={course.CourseId}>{i+1}:{course.CourseName}</option>
                        );
                      })}
                      {/* <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option> */}
                    </select>
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

Addstudents.propTypes = {};

export default Addstudents;
