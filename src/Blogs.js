import { Link } from "react-router-dom"

const BlogList = ({blogs, deleteBlog})=>{
    return(
        <div className="blog-list">
        {blogs.map((blog,i)=>(
            <div className="blog-preview" key={blog._id}>
                <Link to={`/blog/${blog._id}`}>
                <h2>{blog.title}</h2>
                <p>written by {blog.author}</p>
                </Link>
              
            </div>
        ))}

    </div>
    )
}

export default BlogList