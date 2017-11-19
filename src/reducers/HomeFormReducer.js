import {
    HOMEFORM_UPDATE,
    HOMEFORM_GET_DATA_SUCCESS,
    HOMEFORM_CALCULATE_BE_SUCCESS,
} from '../actions/types';
import Constants  from '../components/Strings';



const INITIAL_STATE = {
    paperType: 'singleNormal',
    color: '4',
    quantity: '500',
    profit: '1.4',
    printingSize: '4',
    quantitySizeRoundUp:'1',
    paperPrice: '4',
    calculationType: `${Constants.COST}`,
    totalPrice: '0',
    baseCalculateVariables: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HOMEFORM_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case HOMEFORM_GET_DATA_SUCCESS:{
            return {...state};
        }
        case HOMEFORM_CALCULATE_BE_SUCCESS:
            return (action.payload);
        default:
            return state;
    }
}