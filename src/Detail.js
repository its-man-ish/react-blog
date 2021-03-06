import { useParams }from 'react-router-dom'

import useFetch from './useFetch';
import { useHistory } from 'react-router-dom';
const BlogDetails = ()=>{

    const {id} = useParams();
    const history = useHistory();
    
    const {data:blog, error, isPending } = useFetch('https://bogbogo.herokuapp.com/blog/'+id);
    console.log("data: ",blog)
    const handleDelete=()=>{
        fetch('https://bogbogo.herokuapp.com/blog/'+blog._id,{
            method:"DELETE"
        })
        .then(()=>{
            history.push('/');
        })
    }
    return(
        <div className="blog-details">
          {isPending && <div>Loading...</div>}
          {error && <div>{error}</div> }
          {blog && (
              <article>
                  <h2>{blog.title}</h2>
                  <div>
                      <img src={blog.author} alt="" />
                  </div>
                  <p>written by {blog.author}</p>
                  <hr/>
                  <div>
                      {blog.body}
                  </div>

                  <button onClick={handleDelete}>Delete</button>

              </article>
              
          )}

        </div>
    );
}


export default BlogDetails;