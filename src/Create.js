import {useState } from 'react'
import { useHistory } from 'react-router-dom';

const Create = ()=>{
   const [title,setTitle] = useState('');
   const [body,setBody] = useState('');
   const [genre,setGenre] = useState('');
   const [isPending, setIspending] = useState(false)
   const history =useHistory();


    const handleSubmit = (e)=>{
      e.preventDefault();
      const newBlog = {title,genre,body};

      setIspending(true);
      fetch('http://localhost:5000/create',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(newBlog)
      })
      .then(()=>{
        console.log('new blog created');
        setIspending(false);
        //redirecting to home page after creating new blog
        history.push('/');
      })

       
    }
    return(
        <div className="create">
          <h3>Create a New Bog </h3>

          <form onSubmit={handleSubmit}>
             <label htmlFor="">Blog title</label>

             <input 
             value={title}
             onChange={(e)=>setTitle(e.target.value)}
             type="text"
             required
              />
              <label htmlFor="">Genre</label>
              <select name="" id="" 
               value={genre}
               onChange={(e)=>setGenre(e.target.value)}
              required
              >
                <option value="game">Game</option>
                <option value="fashion">Fashion</option>
                <option value="anime">Anime</option>
                <option value="education">Education</option>
                <option value="Technology">Technology</option>
                <option value="Politics">Politics</option>
              </select>
            <label htmlFor="">Blog body</label>
            <textarea 
            value={body}
            onChange={(e)=>setBody(e.target.value)}
            required
            ></textarea>
              <br />
           {
             !isPending &&  <button>Add Blog</button> 
            
           }
         
           {
             isPending &&  <button>Creating....</button> 
            
           }

            

          </form>
        </div>
    )
}

export default Create