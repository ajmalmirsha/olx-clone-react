import React,{useEffect,useState,useContext} from 'react';

import './View.css';
import { PostContext } from '../../store/postContext';
import { FirebaseContext } from '../../store/Context';
import { Firebase } from '../../firebase/config';
function View() {
  const [userDetials,setUserDetials] = useState()
 const {postDetials} = useContext(PostContext)
  const {firebase} = useContext(FirebaseContext)

 useEffect(()=>{
  console.log('mountedd');
  const {userId} = postDetials
   Firebase.firestore().collection('users').where('id','==',userId).get().then((response)=>{
    response.forEach((doc)=>{
    setUserDetials(doc.data())
   })
   })



 },[])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetials?.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetials?.price} </p>
          <span>{postDetials?.name}</span>
          <p>{postDetials?.catagory}</p>
          <span>{postDetials?.createdAt.slice(0,15)}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetials?.username}</p>
          <p>{userDetials?.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
