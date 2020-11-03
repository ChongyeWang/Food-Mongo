import React, {Component} from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import Posts from './Posts';
import Pagination from './Pagination';

import { useState, useEffect } from 'react';

const Event = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    useEffect(() => {
      const fetchPosts = async () => {
        setLoading(true);
        const res = await axios.get('/event/all');
        console.log(res);
        setPosts(res.data);
        setLoading(false);
      };
  
      fetchPosts();
    }, []);

  
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    
    var res3 = null;
    // var listItems3 = null;

    
    var [listItems3, setRes3] = useState(listItems3);
    const KeyChangeHandler = (e) => {
      const data = {
          keyword : e.target.value,
      }
    
      axios.post('/event/search', data)
      .then(response => {

        res3 = response.data;
        listItems3 = res3.map((d) => <div key={d.name}>
          {d.name} {d.content} {d.date} {d.location}
      </div>);
          
          console.log(listItems3);
      }) 

      setRes3(listItems3);
    }
  
    return (
      <div className='container mt-5'>
        <h1 className='text-primary mb-3'>All Events</h1>
        <Posts posts={currentPosts} loading={loading} />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />

          <div class="" style={{marginTop:'30px', width:'300px'}}>
              <div class="panel">
              </div>
              <div class="form-group">
                  <input onChange = {KeyChangeHandler} type="text" class="form-control" name="key" placeholder="Search Event"/>
              </div>           
            
          </div>
          <h4>{listItems3}</h4>
         

        <ul className='list-group mb-4'>
        <h3>Registered Users</h3>
        {posts.map(post => (
          <li key={post._id} className='list-group-item'>
            <span style={{fontWeight: 'bold', marginRight: '20px'}}>{post.name}</span> 
            {post.content} {post.date} {post.location} 
            <span style={{marginRight: '20px'}}></span>

            <ul className='list-group mb-4'>
              {post.userId.map((user,index) => (
                <li>
                  <a href={'/user-page/' + user}>{index}</a>
                </li>
              ))}
            </ul>

          </li>
        ))}
      </ul>
      </div>
    );
  };
export default Event;
