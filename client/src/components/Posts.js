import React from 'react';
import axios from 'axios';


const Posts = ({ posts, loading }) => {

  const submitEvent = (id) => {
    // e.preventDefault();
    const data = {
        userId : localStorage.getItem("user_id"),
        eventId : id,
    }

    //set the with credentials to true
    axios.defaults.withCredentials = true;
  
    axios.post('/event/register_event', data)
        .then(response => {
            alert("Successfully Registered!");
        })
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <ul className='list-group mb-4'>
        {posts.map(post => (
          <li key={post._id} className='list-group-item'>
            <span style={{fontWeight: 'bold', marginRight: '20px'}}>{post.name}</span> 
            {post.content} {post.date} {post.location} 
            <span style={{marginRight: '20px'}}></span>
            <button onClick = {() => {submitEvent(post._id)}} class="btn btn-primary">Register</button> 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
