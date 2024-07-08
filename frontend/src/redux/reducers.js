// Intitial state of redux store
const initialState = {
    data: {
        skills: [],
        tools: [],
        education: [],
        summaryStats: {}
    },
    jobTitles: []
};
  
// Root reducer which handles different action types
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        // Copies existing state and updates data of copied state with action payload
        case 'FETCH_DATA':
            return {
                ...state,
                data: {
                    skills: action.payload.skills || [],
                    tools: action.payload.tools || [],
                    education: action.payload.education || [],
                    summaryStats: action.payload.summaryStats || {}
                }
            };
        // Else returns the current unchanged state
        default:
            return state;
    }
};
  
export default rootReducer;