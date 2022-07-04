import { useState, useEffect } from "react"



const useFetch = (url)=>{

    const [data,setData]=useState(null);
    const [isPending,setisPending] = useState(true);
    const [error,setError] = useState(null) 

    useEffect(()=>{
        const abortCont = new AbortController();

        fetch(url,{signal:abortCont.signal})
        .then(res=>{
          if (!res.ok) {
            throw Error("ERROR 404 NOT FOUND");
          }
          return res.json();
        })
        .then((data)=>{
          console.log(data);
          setData(data);
          setisPending(false);
          setError(null);
        })
        .catch(err=>{
            if(err.name ==='AbortError'){
                console.log('Fetch aborted')
            }
            else{
                setisPending(false);
                setData(null);
                setError(err.message);
            }
        })

        return ()=>abortCont.abort();
     },[url])

  

     return {data,isPending,error}

}


export default useFetch;
