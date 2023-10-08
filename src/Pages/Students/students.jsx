import React from 'react'
import PropTypes from 'prop-types'
import Sidebar from '../../Component/Sidebar/sidebar'
import { Link } from 'react-router-dom'
import { deleteDoc ,doc,getDocs,collection ,updateDoc,updatedStudent } from 'firebase/firestore'
import { db } from '../../Config/firebase'
import { useState,useEffect } from 'react'
const initialeState = {
  studentName: "",
  studentPhoneNo: "",
  studentAge: "",
  studentEnrolCourse: "",
};

 
const Students = props => {
  const[state,setState]=useState([])
  const [studentForedit,setStudentForedit] =useState(initialeState)
  const [student,setStudent] =useState([])
  const[courses,setCourses]=useState([])
    const onReadCourse = async () => {
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

      useEffect(()=>{onReadCourse()},[])

    const onRead = async () => {
        const array = [];
        const querySnapshot = await getDocs(collection(db, "Student"));
        querySnapshot.forEach((doc) => {
          // console.log(`${doc.id} => ${doc.data()}`);
          const data = doc.data();
          array.push(data);
          data["id"] = doc.id;
          console.log(data);
        });
        setState(array);
        
      };
      useEffect(() => {
        onRead();
      }, []);

      const handleDelete=async (student)=>{
        console.log(student.id);
    console.log("document deleted");
    console.log("student : ", student, " products : ", state);
    let newProducts = state.filter((newProduct) => {
      return student.StudentId !== newProduct.StudentId;
    });
    try {
      console.log(student.StudentId);
      console.log(newProducts);
      const document = doc(db, "Student", student.StudentId);
      await deleteDoc(document);

      setState(newProducts);
      onRead();
    } catch (error) {
      console.log(error);
    }
      }


      const handleChangeUp = (e) => {
        setStudentForedit({ ...studentForedit, [e.target.name]: e.target.value });
        console.log(studentForedit);
      };



       const handleEdit=(student)=>{
    console.log(student);
    setStudentForedit(student);

  }
  


  const handleUpdate = async (student) => {
    const { StudentId, StudentName, StudentCode, StudentAge , StudentEnrolCourse } = student;
  
    // Validation
    // if (StudentName.trim().length < 4) {
    //   window.alert("Name length is too short");
    //   return;
    // }
    // if (StudentDescription.trim().length < 2) {
    //   window.alert("Enter a correct course");
    //   return;
    // }
    // if (StudentCode < 11) {
    //   window.alert("Invalid phone number entered");
    //   return;
    // }
  
    try {
      await updateDoc(doc(db, "Student", student.StudentId), {
        StudentName: StudentName,
        StudentCode: StudentCode,
        StudentAge: StudentAge,
        StudentEnrolCourse: StudentEnrolCourse,
      });
      console.log("Document updated with ID: ", student.StudentId);
  
      // Update the student list with the updated student
      setStudent((prevStudents) => {
        return prevStudents.map((student) => {
          if (student.StudentId === StudentId) {
            return student;
          }
          return student;
        });
      });
  
      setStudentForedit({});
      onRead()
    } catch (e) {
      console.error("Error updating document: ", e);
      window.alert(`Error updating document: ${e.message}`);
    }
  };
   
  return (
    
        <div className='flex d-flex justify-content-start'>
        <Sidebar/>
        <div className="container">
        <div className="py-2">
          <div className="col-12 col-lg-10 offset-lg-1 pt-5">
            <div className="card customCard p-2 p-md-3 p-lg-5 text-center cardCustom mt-5">
                
                
                
                <div className="flex d-flex justify-content-around"><h1></h1><h4>Student</h4><Link to="/addstudents"><button className='btn btn-outline-secondary' >Add Students</button></Link></div>
              <hr />
              
              <table className="table table-light table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Student ID</th>
                    <th scope="col">Student Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Phone No</th>
                    <th scope="col">Enrol Course</th>
                  </tr>
                </thead>
                <tbody>
                  {state.map((p, i) => {
                    return (
                      <tr key={p.studentId}>
                        <th scope="row">{i + 1}</th>
                        <td>{p.StudentId}</td>
                        <td>{p.StudentName}</td>
                        <td>{p.StudentAge}</td>
                        <td>{p.StudentCode}</td>
                        <td>{p.StudentEnrolCourse}</td>

                        <td>
                        <button
                            className="btn btn-sm btn-info me-2"
                            data-bs-toggle="modal"
                            data-bs-target="#editModal"
                            onClick={() => {
                              handleEdit(p);
                            }}
                          >
                            Update
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => {
                              handleDelete(p);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>
      
                  {/* Edit Modal*/}
                  <div className="modal fade" id="editModal">
     <div className="modal-dialog modal-dialog-centered">
       <div className="modal-content">
         <div className="modal-header">
           <h5 className="modal-title">Edit Courses
             
           </h5>
           <button
             type="button"
             className="btn-close"
             data-bs-dismiss="modal"
             aria-label="Close"
           ></button>
         </div>
         <div className="modal-body">
          
           <div className="row mb-3">
             <div className="col">
               <input
                 type="text"
                 className="form-control"
                 placeholder="Name"
                 name="StudentName"
                 required
                 value={studentForedit.StudentName}
                 onChange={handleChangeUp}
               />
             </div>
           </div>
           
           <div className="row mb-3">
             <div className="col">
               <input
                 type="number"
                 className="form-control"
                 placeholder="PhoneAge"
                 name="StudentAge"
                 required
                 value={studentForedit.StudentAge}
                 onChange={handleChangeUp}
               />
             </div>
           
           
         </div>

         <div className="row mb-3">
             <div className="col">
               <input
                 type="number"
                 className="form-control"
                 placeholder="PhoneNumber"
                 name="StudentCode"
                 required
                 value={studentForedit.StudentCode}
                 onChange={handleChangeUp}
               />
             </div>
                 
           </div>

         <div className="row mb-3">
              <div className="col">
              <select
                       onChange={handleChangeUp} name="StudentEnrolCourse" required
                      class="form-select"
                      aria-label="Courses"
                    >
                      <option selected>Select Course</option>
                      {courses.map((course , i)=>{
                        return(
                            <option  value={studentForedit.StudentEnrolCourse}>{i+1}:{course.CourseName}</option>
                        );
                      })}
                      {/* <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option> */}
                    </select>
              </div>
             </div> 
           </div>
           
         <div className="modal-footer">
           <button
             type="button"
             className="btn btn-secondary"
             data-bs-dismiss="modal"
           >
             Close
           </button>
           <button
             type="button"
             className="btn btn-primary"
             data-bs-dismiss="modal"
             onClick={() => {
               handleUpdate(studentForedit);
             }}
           >
             Update
           </button>
         </div>
       </div>
     </div>
   </div>
        </div>
        
        
  )
}

Students.propTypes = {}

export default Students