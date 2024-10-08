// Intitial state of redux store
const initialState = {
    data: {
        skills: [],
        tools: [],
        education_levels: [],
        fields_of_study: [],
        summaryStats: {}
    },
    jobTitles: [],
    skillIndustries: [],
    toolIndustries: []
};
  
// Root reducer which handles different action types
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        // Copies existing state and updates data of copied state with data from action payload
        case 'FETCH_DATA':
            // Ensures state is only updated when there is a difference between current state data and new data
            if (JSON.stringify(state.data) !== JSON.stringify(action.payload)) {
                console.log('FETCH_DATA action payload:', action.payload);
                // Returns the new state with the updated data from the action payload
                return {
                    ...state,
                    data: {
                        skills: action.payload.skills || [],
                        tools: action.payload.tools || [],
                        education_levels: action.payload.education_levels || [],
                        fields_of_study: action.payload.fields_of_study || [],
                        summaryStats: action.payload.summaryStats || {}
                    }
                };
            }
            return state;
        case 'FETCH_SKILL_INDUSTRY_DATA':
            // Returns the new state with the updated data from the action payload
            return {
                ...state,
                skillIndustries: action.payload
            };
        case 'FETCH_TOOL_INDUSTRY_DATA':
            // Returns the new state with the updated data from the action payload
            return {
                ...state,
                toolIndustries: action.payload
            };
        // Else if the current state data is the same as the new data, returns the current unchanged state
        default:
            return state;
    }
};
  
export default rootReducer;