import { upload } from '@testing-library/user-event/dist/upload';
import {useState } from 'react'
import { useHistory } from 'react-router-dom';

const Create = ()=>{
   const [title,setTitle] = useState('');
   const [body,setBody] = useState('');
   const [author,setAuthor] = useState('');
   const [file,setFile] = useState('');
   const [selectedFile,setSelectedFile] = useState('');
   const [preview,setPreview] = useState('');

   const [genre,setGenre] = useState('');
   const [isPending, setIspending] = useState(false);
   const history =useHistory();


   
    const handleFIleInput=(e)=>{
      console.log(e.target.value)
      const file = e.target.files[0];
      console.log(file)
      previewFile(file)
    }
    const previewFile = (file)=>{
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = ()=>{
        setPreview(reader.result);
      }
    }
    const handleSubmit = (e)=>{
      e.preventDefault();
      const newBlog = {title,genre,body,author,file};
      console.log( uploadImage(preview))
      setIspending(true);
      fetch('https://bogbogo.herokuapp.com/create',{
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

    const uploadImage = (base64EncodedImage)=>{
      return base64EncodedImage;
    }


    return(
        <div className="create">
          {
            preview && (
              <img src={preview} width="100%"/>
            )
          }
          {
            !preview && (
              <img src="https://blog.displate.com/wp-content/uploads/2021/11/Blog-Featured-Images-5.jpg" width="100%"/>
            )
          }

          <form onSubmit={handleSubmit}>

             <input 
             value={title}
             placeholder="Title.."
             onChange={(e)=>setTitle(e.target.value)}
             type="text"
             required
              />
             {/* { <label htmlFor="">Genre</label>
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
              </select>} */}
            <textarea 
            value={body}
            onChange={(e)=>setBody(e.target.value)}
            required
            ></textarea>
             

                <input 
                type="file"

                name='image'
                onChange={handleFIleInput}
                value={file}

                />
                
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