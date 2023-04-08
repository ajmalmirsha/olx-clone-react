import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext,AuthContext } from '../../store/Context';
import { Firebase } from '../../firebase/config';
import { useHistory } from 'react-router-dom';
const Create = () => {
  const history = useHistory()
 const {firebase} = useContext(FirebaseContext)
 const {user} = useContext(AuthContext)
  const [image,setImage] = useState(null)
  const [name,setName] = useState('')
  const [catagory,setCatagory] = useState('')
  const [price,setPrice] = useState('')

const date = new Date()

  const handleSubmit = ()=>{
    try {
      console.log('reaxched handleSubmit');
      Firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
        ref.getDownloadURL().then((url)=>{
          Firebase.firestore().collection('products').add({
            name,
            catagory,
            price,
            url,
            userId:user.uid,
            createdAt: date.toString()
          }).then(()=>{
            history.push('/')
          })
        })
      })
    } catch (error) {
      console.error('this error',error);
    }
    
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
       
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              defaultValue="John"
              value={name}
              onChange={(e)=>{
                setName(e.target.value)
              }}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              defaultValue="John"
              value={catagory}
              onChange={(e)=>{
                setCatagory(e.target.value)
              }}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" 
             value={price}
              onChange={(e)=>{
                setPrice(e.target.value)
              }} />
            <br />
     
          <br />
         {    image && <img alt="Posts" width="200px" height="200px" src={ URL.createObjectURL(image) }></img>}
     
            <br />
            <input  onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
