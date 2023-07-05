import { useState, useEffect} from "react";
import axios from "axios";


const useFetch = (endpoint='', query={}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const localhost = 'http://10.0.0.5:19000/';

    // const options = {
    //     method: 'GET',
    //     url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    //     headers: {
    //         'X-RapidAPI-Key': '191898d3a4msh52065effe1f554dp137adajsnd0cbc33bcad4',
    //         'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    //       },
    //     params: {
    //       ...query
    //     },
        
    //   };
      
      const fetchData = async () => {
        setLoading(true);
        try {

            const response = await axios.get(`${localhost}data.json`);
            setData(response.data);
            setLoading(false)
        
        
        } catch (error) {
            setError(error);
            
            console.log(error);
        

        } finally{
            setLoading(false);
        
        }
      }

      useEffect(() => {
        fetchData();
      },[])

     const reFetch = () => {
        setLoading(true);
        fetchData();
     
     }

     return {data, loading, error, reFetch}

}

export default useFetch;