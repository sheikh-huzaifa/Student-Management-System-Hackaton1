import React from 'react'
import PropTypes from 'prop-types'
import { db } from '../../../Config/firebase'
import { useEffect,useState } from 'react'
import { getDocs,collection,doc,updateDoc } from 'firebase/firestore'
const initialeState = {
    studentName: "",
    studentPhoneNo: "",
    studentAge: "",
    studentEnrolCourse: "",
  };

const MakeAttendence = props => {
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
      
          <div className=''>
          
          <div className="">
          <div className="py-2">
            <div className="col-12 col-lg-10 offset-lg-1 ">
              <div className="card customCard p-2 p-md-3 p-lg-5 text-center cardCustom mt-5">
                  
                  
                  
                  <h4>Attendence</h4></div>
                <hr />
                
                <table className="table table-light table-striped">
                  <thead>
                    <tr>
                      <th scope="col-2">#</th>
                      <th scope="col-2">Student ID</th>
                      <th scope="col-2">Student Name</th>
                      <th scope="col-2">Age</th>
                      <th scope="col-2">Phone No</th>
                      <th scope="col-2">Enrol Course</th>
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
                          
                          <input class="form-check-input mt-0" type="checkbox"  aria-label="Checkbox for following text input"/>
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
      
  )
}

MakeAttendence.propTypes = {}

export default MakeAttendence