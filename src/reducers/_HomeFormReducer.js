import {
    HOMEFORM_UPDATE,
    HOMEFORM_CALCULATE_COST,
    HOMEFORM_EQUATE_BASE_VARIABLE
} from '../actions/types';
import Constants  from '../components/Strings';
import { searchArrayIndex } from '../components/utility';


const INITIAL_STATE = {
    paperType: 'singleNormal',
    colorType: '4',
    quantity: '500',
    printingSize: '4',
    quantitySizeRoundUp: '',
    paperPrice: '4',
    calculationType: `${Constants.COST}`,
    baseVariables: [
        { name: "trajPrice", value: "" },
        { name: "zincPrice", value: "" },
        { name: "laminationPrice", value: "" },
        { name: "takseerPrice", value: "" },
        { name: "transport", value: "" },
        { name: "paperPrice", value: "" }
    ]
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HOMEFORM_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case HOMEFORM_CALCULATE_COST: {
            const { equations } = action.payload.homeObject;
            const { newDataVariables } = action.payload.homeObject.variable;
            const { homeForm } = action.payload.homeObject;
            const { colorType, quantity, printingSize } = homeForm;

            var userInput = {
                color: colorType,
                quantity: (quantity/1000),
                printingSize
            }
            sample = equateBaseVariables(homeForm.baseVariables, userInput, newDataVariables, equations);

            return {};
        }
        case HOMEFORM_EQUATE_BASE_VARIABLE:{
            Object.keys(action.payload.baseVariable).map(function (key, index){
                value = getBaseVariableValue(dataVarArr, obj[key].name);
                pos = searchArrayIndex(eqArr, "name", obj[key].name);

                obj[key].value === eval(eqArr[pos].equation);
            });
        }
        default:
            return state;
    }
}

const getBaseVariableValue = (varArray, varValue) => {
    const varKey = "label";
    const pos2 = searchArrayIndex(varArray, varKey, varValue);
    return varArray[pos2].value;
}

const equateBaseVariables = (obj, userInput, dataVarArr, eqArr) => {
    const { color, quantity, printingSize } = userInput;
    quantitySizeRoundUp = Math.ceil(quantity);

    Object.keys(obj).map(function (key, index) {
        value = getBaseVariableValue(dataVarArr, obj[key].name);
        pos = searchArrayIndex(eqArr, "name", obj[key].name);
        obj[key].value === eval(eqArr[pos].equation);


    });
    return obj;
}