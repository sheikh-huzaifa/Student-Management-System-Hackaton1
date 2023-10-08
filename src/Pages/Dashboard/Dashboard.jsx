import React, { useEffect, useState } from 'react';
import DashCards from '../../Component/Cards/dashCards';
import Sidebar from '../../Component/Sidebar/sidebar'
import img from "../../Image/person-icon-1685.png"
import { db } from '../../Config/firebase';
import { getCountFromServer ,collection, getDocs } from 'firebase/firestore';

import Animatednumbers from "ggabcd-react-animated-numbers";




export const Dashboard = () => {
  const [count,setcount]=useState([])
  const[formatValue,setFormatValue]=useState(3)
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
    setcount(array);
    
    
  };
  useEffect(() => {
    onRead();
  }, []);
  console.log(count.length);

  return (
    <div className='flex d-flex justify-content-start' >
    <Sidebar/>
    <div className="container pt-5"><div className="py-2">
    <div className="row">
      <div className="col-6 ">
        <DashCards/>
      </div>
      <div className="col-6 text-center">
        <div className="card cardCustom">
          <div className='text-center mt-5'><img src={img} alt="" style={{height:64 , width:64}} /><h2>Students</h2></div>
          <div className='text-center d-flex justify-content-center mt-2 pb-5'>

          <h1><Animatednumbers
        animateToNumber={count.length}
        fontStyle={{ fontSize: "5rem" }}
        configs={(number, index) => {
          return { mass: 1, tension: 230 * (index + 1), friction: 140 };
        }}
      ></Animatednumbers></h1>

          </div>
        </div>
      </div>
      
    </div>
      </div></div>
    </div>
  )
}
