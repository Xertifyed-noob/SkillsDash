import axios from 'axios';

// Action creator for fetching data based on job title
export const fetchData = (jobTitle) => async (dispatch) => {
    // Make GET API request to fetch data for a given job title
    const response = await axios.get(`/api/data?jobTitle=${jobTitle}`);
    // Dispatch action with fetched data
    dispatch({ type: 'FETCH_DATA', payload: response.data });
};