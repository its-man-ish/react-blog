import BlogList from "./Blogs";
import { useState,useEffect } from "react";

const Index = ()=>{

    const [blogs,setBlogs] = useState(null);
    const deleteBlogs = (id)=>{
        const newBlogs = blogs.filter(blog=>blog.id!==id);
        setBlogs(newBlogs);
    }
    useEffect(()=>{
        fetch('http://localhost:8000/blogs')
        .then(res=>{
            if(!res.ok)
            {
              Error('Error 404 Not found')
            }
            return res.json()
        })
        .then(data=>{
            setBlogs(data)
            console.log(data)
        })
    },[])

   
    return(
        <div className="home">
        { blogs && <BlogList blogs={blogs} deleteBlog={deleteBlogs} />}
        </div>
    )
}

export default Index;