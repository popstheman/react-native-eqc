import {
    VARIABLE_OBJ_UPDATE,
    VARIABLE_FORM_UPDATE
} from './types';

export const variableObjUpdate = ({ value }, id) => {
    return {
        type: VARIABLE_OBJ_UPDATE,
        payload: { value },
        id: id
    };
};

export const variableFormUpdate = ({ prop, value }) => {
    return {
        type: VARIABLE_FORM_UPDATE,
        payload: { prop, value }
    }
};

