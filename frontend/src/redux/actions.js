import axios from 'axios';
import { produce } from 'immer';

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/data`;

// Action creator to fetch data from consolidated API endpoint of routes.py, based on job title
export const fetchData = (jobTitle) => async (dispatch) => {
    // Create GET HTTP requests the consolidated API endpoint with job title as a query parameter
    try {
        const response = await axios.get(BASE_URL, { params: { job_title: jobTitle || '' } });
        const data = response.data;

        console.log('Fetched Data:', data);

        // Use Immer to create an immutable state update to produce a new state based on fetched data
        const processedData = produce({}, draft => {
            draft.skills = data.skills.map(item => ({ ...item }));
            draft.tools = data.tools.map(item => ({ ...item }));
            draft.education_levels = data.education_levels.map(item => ({ ...item }));
            draft.fields_of_study = data.fields_of_study.map(item => ({ ...item }));
            draft.summaryStats = { ...data.summaryStats };
        });

        console.log('Dispatching Data:', processedData);

        // Dispatch action with fetched data as payload
        dispatch({ type: 'FETCH_DATA', payload: processedData });
        
    }  catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Action creator to fetch industry data for a specific selected skill
export const fetchSkillIndustryData = (skill, jobTitle) => async (dispatch) => {
    try {
        // Create GET HTTP request with skill and job title as query parameters
        const response = await axios.get(`${BASE_URL}/skill_industries`, { params: { skill, job_title: jobTitle || '' } });
        const data = response.data;

        console.log('Fetched Skill Industry Data:', data);

        const processedData = produce({}, draft => {
            draft.skillIndustries = data.map(item => ({ ...item }));
        });

        // Dispatch action with fetched data as payload
        dispatch({ type: 'FETCH_SKILL_INDUSTRY_DATA', payload: processedData });

        // Return the processed data to ensure the promise resolves correctly
        return processedData;

    } catch (error) {
        console.error('Error fetching skill industry data:', error);
    }
};

// Action creator to fetch industry data for a specific selected tool
export const fetchToolIndustryData = (tool, jobTitle) => async (dispatch) => {
    try {
        // Create GET HTTP request with tool and job title as query parameters
        const response = await axios.get(`${BASE_URL}/tool_industries`, { params: { tool, job_title: jobTitle || '' } });
        const data = response.data;

        console.log('Fetched Tool Industry Data:', data);

        const processedData = produce({}, draft => {
            draft.toolIndustries = data.map(item => ({ ...item }));
        });

        // Dispatch action with fetched data as payload
        dispatch({ type: 'FETCH_TOOL_INDUSTRY_DATA', payload: processedData });

        // Return the processed data to ensure the promise resolves correctly
        return processedData;

    } catch (error) {
        console.error('Error fetching tool industry data:', error);
    }
};

