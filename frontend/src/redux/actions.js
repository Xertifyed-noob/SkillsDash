import axios from 'axios';
import { produce } from 'immer';

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/aggregated`;

// Action creator for fetching data based on job title
export const fetchData = (jobTitle) => async (dispatch) => {
    // Create GET API requests to fetch data for a given job title
    try {
        const skillsResponse = await axios.get(`${BASE_URL}/skills`, {
            params: { job_title: jobTitle }
        });

        console.log('Fetched Data:', skillsResponse.data); 

        const toolsResponse = await axios.get(`${BASE_URL}/tools`, {
            params: { job_title: jobTitle }
        });
        const educationResponse = await axios.get(`${BASE_URL}/education`, {
            params: { job_title: jobTitle }
        });
        const summaryResponse = await axios.get(`${BASE_URL}/summary`, {
            params: { job_title: jobTitle }
        });   

        const skillsData = skillsResponse.data || [];
        const toolsData = toolsResponse.data || [];
        const educationData = educationResponse.data || [];
        const summaryStatsData = summaryResponse.data || {};

        // Use Immer to produce a new state based on the fetched data
        const data = produce({}, draft => {
            draft.skills = skillsData.map(item => ({ ...item }));
            draft.tools = toolsData.map(item => ({ ...item }));
            draft.education = educationData.map(item => ({ ...item }));
            draft.summaryStats = { ...summaryStatsData };
        });

        console.log('Dispatching Data:', data);
        // Dispatch action with fetched data
        dispatch({ type: 'FETCH_DATA', payload: data });
        
    }  catch (error) {
        console.error('Error fetching data:', error);
    }
};