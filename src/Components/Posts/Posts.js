import React,{useContext,useEffect,useState} from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { Firebase } from '../../firebase/config';
import { PostContext } from '../../store/postContext';
import { useHistory } from 'react-router-dom';
function Posts() {
  const history = useHistory()
  const {setPostDetails} = useContext(PostContext)
  const {firebase} = useContext(FirebaseContext)
  const [products,setProducts] = useState([])
  useEffect(()=>{
    Firebase.firestore().collection('products').get().then((snapshot)=>{
      const allpost = snapshot.docs.map((product)=>{
        return {
          ...product.data(),
          id:product.id
        }
      })

      console.log(allpost);
      setProducts(allpost)
    })
  },[])
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
         
         {

      products.map((pro)=>{

     return(
          <div className="card" onClick={()=>{
     
            setPostDetails(pro)
      history.push('/view')
          }}>
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={pro.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {pro.price}</p>
              <span className="kilometer">{pro.catagory}</span>
              <p className="name"> {pro.name}</p>
            </div>
            <div className="date">
              <span>{pro.createdAt.slice(0,15)}</span>
            </div>
          </div>
     )
           })
   }


        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {
       products.map((pro)=>{
            return(
          <div className="card" onClick={()=>{
     
            setPostDetails(pro)
      history.push('/view')
          }}>
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={pro.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {pro.price}</p>
              <span className="kilometer">{pro.catagory}</span>
              <p className="name">{pro.name}</p>
            </div>
            <div className="date">
              <span>{pro.createdAt.slice(0,15)}</span>
            </div>
          </div>
           ) 
            }) 

}
        </div>

      </div>
    </div>
  );
}

export default Posts;
