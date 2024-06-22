 import React, { useEffect } from 'react'
 
 const useFetchData = (apiEndPoint) => {

    const [allData, setAllData] = useState([])
    const [loading, setLoading] = useState(true)
    const [initialLoad, setInitialLoad] = useState(true)


    useEffect(()=>{
        if(initialLoad){
            // set initialload to false to prevent the api call on subsequent renders
            setInitialLoad(false)
            setLoading(false) // set loading to false to show components initially
            return; // exit useEffect
        }

        setLoading(true);

        const fetchAllData = async()=>{
            try{
                const res = await axios.get(apiEndPoint)
                const allData = res.allData;
                setAllData(allData)
                setLoading(false); // set loading state to false after data is fetched
            }catch(error){
                console.log('Error fetching blof data', error)
                setLoading(fals)
            }
        }
    })


   return (
     <div>
       
     </div>
   )
 }
 
 export default useFetchData
 