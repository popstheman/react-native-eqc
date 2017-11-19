import {
    VARIABLE_OBJ_UPDATE,
    VARIABLE_FORM_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
    newDataVariables: [],
    newTempVariables: [
        {
            "id": "1",
            "name": "Width",
            "input_unit": "cm",
            "output_unit": "m",
            "value": "88"
        },
        {
            "id": "2",
            "name": "Height",
            "input_unit": "cm",
            "output_unit": "m",
            "value": "66"
        },
        {
            "id": "3",
            "name": "Weight",
            "input_unit": "g",
            "output_unit": "ton",
            "value": "300"
        },
        {
            "id": "4",
            "name": "POT",
            "input_unit": "price",
            "output_unit": "price",
            "value": "15000"
        }
    ],
    value: "",
    id: "",
    input_unit: "",
    output_unit: "",
    name: "",

};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case VARIABLE_FORM_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case VARIABLE_OBJ_UPDATE: {
            state.newDataVariables[action.id] = { ...state.newDataVariables[action.id], ...action.payload };
            return { ...state };
        }
        default:
            return state;
    }
}