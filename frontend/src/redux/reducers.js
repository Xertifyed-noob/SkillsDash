// Intitial state of redux store
const initialState = {
    data: {
        skills: [],
        tools: [],
        education_levels: [],
        fields_of_study: [],
        summaryStats: {}
    },
    jobTitles: []
};
  
// Root reducer which handles different action types
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        // Copies existing state and updates data of copied state with action payload
        case 'FETCH_DATA':
            // Ensures state is only updated when there is a difference between current state and new data
            if (JSON.stringify(state.data) !== JSON.stringify(action.payload)) {
                console.log('FETCH_DATA action payload:', action.payload);
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
        // Else returns the current unchanged state
        default:
            return state;
    }
};
  
export default rootReducer;