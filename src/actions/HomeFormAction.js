import {
    HOMEFORM_UPDATE,
    HOMEFORM_CALCULATE_COST,
    HOMEFORM_EQUATE_BASE_VARIABLE,
    VARIABLE_FORM_UPDATE,
    HOMEFORM_CALCULATE_BE_SUCCESS
} from './types';
import Constants from "./../components/Strings";
import { AsyncStorage } from 'react-native';
import deep from 'deep-diff';

import { searchArrayIndex } from '../components/utility';


export const homeFormUpdate = ({ prop, value }) => {
    return {
        type: HOMEFORM_UPDATE,
        payload: { prop, value }
    };
};

export const homeFormGetData = (dataVariables) => {
    return (dispatch) => {
        var value = dataVariables;
        AsyncStorage.getItem("variable_data").then(data => {
            if (data) {
                value = JSON.parse(data);
            }
        }).then(() => {
            var differences = deep(dataVariables, value);
            deep.observableDiff(value, dataVariables, function (d) {
                // console.log(d);
                if (d.kind == "A" || d.kind == "N") {
                    deep.applyChange(value, dataVariables, d);
                }
            });
            dispatch({ type: VARIABLE_FORM_UPDATE, payload: { prop: "newDataVariables", value } })
        });
    };

};

export const calculateBaseEquation = (newDataVar, homeFormVar) => {
    return(dispatch) => {
        const { color, quantity, paperPrice, paperType, printingSize, baseCalculateVariables, quantitySizeRoundUp } = homeFormVar;

        console.log(newDataVar);
        Object.keys(newDataVar).map(function(key, index){
            value = newDataVar[index].value;
            name = newDataVar[index].label;
            newValue = eval(newDataVar[index].equation);
            baseCalculateVariables[name] = newValue;
        });
        dispatch( {type: VARIABLE_FORM_UPDATE, payload:{prop: "baseCalculateVariables", value:baseCalculateVariables}});
    }
};

export const calculateCost = (newDataVar, homeFormVar, eq) => {
        const { color, quantity, paperType, printingSize, baseCalculateVariables, calculationType } = homeFormVar;
        const { trajPrice, zincPrice, laminationPrice, takseerPrice, paperPrice, transport, profit} = baseCalculateVariables;

        eqPos = searchArrayIndex(eq,"name", homeFormVar.paperType);
        var totalPrice = eval(eq[eqPos].equation);
        if (homeFormVar.calculationType === Constants.PROFIT ){
            totalPrice = totalPrice * 1.4;
        }
        console.log(totalPrice);
        return{
            type: HOMEFORM_UPDATE,
            payload: { prop: "totalPrice", value: totalPrice }
        }

};

export const equateBaseVariable = (baseVariables) => {
    return {
        type: HOMEFORM_EQUATE_BASE_VARIABLE,
        payload: baseVariables
    }
};