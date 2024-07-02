import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/aggregated`;

// Action creator for fetching data based on job title
export const fetchData = (jobTitle) => async (dispatch) => {
    // Create GET API requests to fetch data for a given job title
    try {
        const skillsResponse = await axios.get(`${BASE_URL}/skills`, {
            params: { job_title: jobTitle }
        });
        const toolsResponse = await axios.get(`${BASE_URL}/tools`, {
            params: { job_title: jobTitle }
        });
        const educationResponse = await axios.get(`${BASE_URL}/education`, {
            params: { job_title: jobTitle }
        });
        const summaryResponse = await axios.get(`${BASE_URL}/summary`, {
            params: { job_title: jobTitle }
        });   

        const data = {
            skills: skillsResponse.data,
            tools: toolsResponse.data,
            education: educationResponse.data,
            summaryStats: summaryResponse.data
        };

        // Dispatch action with fetched data
        dispatch({ type: 'FETCH_DATA', payload: data });
    }  catch (error) {
        console.error('Error fetching data:', error);
    }
};