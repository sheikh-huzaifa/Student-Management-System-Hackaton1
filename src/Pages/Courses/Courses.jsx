import React, { useState ,useEffect } from 'react'
import PropTypes from 'prop-types'
import Sidebar from '../../Component/Sidebar/sidebar'
import { db } from '../../Config/firebase'
import { collection,getDocs,deleteDoc,doc } from 'firebase/firestore'
import { Link } from 'react-router-dom'


const Courses = props => {
    const[state,setState]=useState([])

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
        setState(array);
        console.log(typeof(state));
        console.log(state.CourseId);
      };
      useEffect(() => {
        onRead();
      }, []);

      const handleDelete=async (cousrse)=>{
        console.log(cousrse.id);
    console.log("document deleted");
    console.log("cousrse : ", cousrse, " products : ", state);
    let newProducts = state.filter((newProduct) => {
      return cousrse.CourseId !== newProduct.CousrseId;
    });
    try {
      console.log(cousrse.CousrseId);
      console.log(newProducts);
      const document = doc(db, "Courses", cousrse.id);
      await deleteDoc(document);

      setState(newProducts);
      onRead();
    } catch (error) {
      console.log(error);
    }
      }
     

  return (
    <div className='flex d-flex justify-content-start'>
        <Sidebar/>
        <div className="container">
        <div className="py-2">
          <div className="col-12 col-lg-10 offset-lg-1 pt-5">
            <div className="card customCard p-2 p-md-3 p-lg-5 text-center cardCustom mt-5">
                
                
                <div className="flex d-flex justify-content-around"><h1></h1><h4>Courses</h4><Link to="/addCourses"><button className='btn btn-outline-secondary' >Add Course</button></Link></div>
              <hr />
              <table className="table table-light table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Course ID</th>
                    <th scope="col">Course Name</th>
                    <th scope="col">Course Code</th>
                    <th scope="col">Course Description</th>
                  </tr>
                </thead>
                <tbody>
                  {state.map((p, i) => {
                    return (
                      <tr key={p.courseId}>
                        <th scope="row">{i + 1}</th>
                        <td>{p.CourseId}</td>
                        <td>{p.CourseName}</td>

                        <td>{p.CourseCode}</td>
                        <td>{p.CourseDescription}</td>

                        <td>
                          
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
        </div>
  )
}

Courses.propTypes = {}

export default Courses