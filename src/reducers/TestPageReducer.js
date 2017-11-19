const INITIAL_STATE = {
    testName: "",
    testEmail: "",
    newDataVariables: [
        { "name": "Murtaza", "value": "100" },
        { "name": "Pops", "value": "100" },
        { "name": "Andrew", "value": "50" }
    ]
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "testUpdate":
            return { ...state, [action.payload.prop]: action.payload.value }
        default:
            return state;
    }
}