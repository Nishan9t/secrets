import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Secrets from './Secrets';

export default function HomePage() {

  const [text,setText] = useState('');
  const [secrets,setSecrets]=useState([]);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    
    try{
      const res=await axios.post('http://localhost:8000/secret',{text});
      setText("");

    }
    catch(error)
    {
      console.log(error);
    }
  }

  const getSecrets=async()=>{
    try{
      await axios.get('http://localhost:8000/')
      .then((response) => {
        setSecrets(response.data.data);
      });
      
      
    }
    catch(error)
    {
      console.log(error);
    }

  }

useEffect(()=>{
 
  getSecrets();

},[])

const handleLogout=()=>{
  localStorage.removeItem('token');
  window.location.reload();
}
  
  return (
    <div>
          <div className="mx-auto my-2 max-w-7xl px-2 sm:px-6 lg:px-8 bg-gray-500 rounded-lg">
              <div className="relative flex h-16 items-center justify-end">
                    <button
                      type="submit"
                      className="px-4 right-2 text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark hover:bg-green-700 my-1"
                      onClick={handleLogout}>
                        Logout
                    </button>
              </div>
          </div>
  
          <div className="mx-auto my-2 max-w-7xl px-2 sm:px-6 lg:px-8 ">
               <h1 className='text-center mx-auto font-bold text-3xl m-16'>SECRETS:- that's no one knows</h1>
                <form onSubmit={(e)=>handleSubmit(e)}>
                  <textarea
                    className="border p-2 w-full mb-2 rounded "
                    placeholder="Enter your text here"
                    value={text}
                    onChange={(e)=>{setText(e.target.value)}}
                    required
                  />
                  <button
                    type='submit'
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    
                  >
                    Submit
                  </button>
                </form>
          </div>
          <Secrets secrets={secrets}/>
      
        </div>

  )
}
