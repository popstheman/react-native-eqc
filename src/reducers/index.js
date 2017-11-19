import { combineReducers } from 'redux';
import PaperTypesReducer from './PaperTypesReducer';
import ColorTypesReducer from './ColorTypesReducer';
import HomeFormReducer from './HomeFormReducer';
import DataVariablesReducer from './DataVariablesReducer';
import VariableReducer from './VariableReducer';
import EquationReducer from './EquationsReducer';
import TestPageReducer from './TestPageReducer';

export default combineReducers({
    paperTypes: PaperTypesReducer,
    colorTypes: ColorTypesReducer,
    equations: EquationReducer,
    dataVariables: DataVariablesReducer,
    homeForm: HomeFormReducer,
    variable: VariableReducer,
    testPage: TestPageReducer
})