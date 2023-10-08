import React from "react";
import { useEffect,useState } from "react";
import { collection, doc ,getDocs } from "firebase/firestore";
import PropTypes from "prop-types";
import { Tree, TreeNode ,div } from 'react-organizational-chart';
import { db } from "../../Config/firebase";
import img from '../../Image/document-icon-36546.jpg'

const DashCards = (props) => {
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
  return (
    
            <div className="card  cardCustom p2 p-md3 p-md-5 text-center">
              <Tree
                lineWidth={"2px"}
                lineColor={"green"}
                lineBorderRadius={"10px"}

                label={<div>
                    <img src={img} alt="" style={{height:64}}/>
                    <h2>Courses</h2>
                </div>}
              > {courses.map((course , i)=>{
                return(
                    <TreeNode label={<div>{course.CourseName}</div>}></TreeNode>
                );
              })}
                
              </Tree>
            </div>
            
          
  );
};

DashCards.propTypes = {};

export default DashCards;
