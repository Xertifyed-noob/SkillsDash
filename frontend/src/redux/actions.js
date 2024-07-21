import axios from 'axios';
import { produce } from 'immer';

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/aggregated`;

// Action creator to fetch data from API endpoints of routes.py, based on job title
export const fetchData = (jobTitle) => async (dispatch) => {
    // Create GET HTTP requests to various API endpoints with job title as a query parameter
    try {
        const skillsResponse = await axios.get(`${BASE_URL}/skills`, { params: { job_title: jobTitle }});
        const toolsResponse = await axios.get(`${BASE_URL}/tools`, { params: { job_title: jobTitle }});
        const educationLevelsResponse = await axios.get(`${BASE_URL}/education-levels`, { params: { job_title: jobTitle }});
        const fieldsOfStudyResponse = await axios.get(`${BASE_URL}/fields-of-study`, { params: { job_title: jobTitle }});
        const summaryResponse = await axios.get(`${BASE_URL}/summary`, { params: { job_title: jobTitle }});   

        // Accesses the data property of the responses, if response data is null or undefined, assign empty array
        const skillsData = skillsResponse.data || [];
        const toolsData = toolsResponse.data || [];
        const educationLevelsData = educationLevelsResponse.data || [];
        const fieldsOfStudyData = fieldsOfStudyResponse.data || []
        const summaryStatsData = summaryResponse.data || {};

        console.log('Fetched Data:', {
            skillsData,
            toolsData,
            educationLevelsData,
            fieldsOfStudyData,
            summaryStatsData
        });

        // Use Immer to create an immutable state update to produce a new state based on fetched data
        const data = produce({}, draft => {
            draft.skills = skillsData.map(item => ({ ...item }));
            draft.tools = toolsData.map(item => ({ ...item }));
            draft.education_levels = educationLevelsData.map(item => ({ ...item }));
            draft.fields_of_study = fieldsOfStudyData.map(item => ({ ...item }));
            draft.summaryStats = { ...summaryStatsData };
        });

        console.log('Dispatching Data:', data);

        // Dispatch action with fetched data as payload
        dispatch({ type: 'FETCH_DATA', payload: data });
        
    }  catch (error) {
        console.error('Error fetching data:', error);
    }
};