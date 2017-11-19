import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Input } from './common';
import { variableFormUpdate, variableObjUpdate } from './../actions';
import { Actions } from 'react-native-router-flux';
import { searchArrayIndex } from './utility';


class VariableDetails extends Component {

    componentWillMount() {

    }

    onButtonPress() {
        const { value, name, newDataVariables } = this.props.state.variable;
        var position = searchArrayIndex(newDataVariables, "name", name);

        this.props.variableObjUpdate({ prop: 'newDataVariables', value }, position);

        AsyncStorage.setItem('variable_data', JSON.stringify(newDataVariables));

        Actions.jump("variableTab");
    }


    render() {
        const { name,value, input_unit, output_unit } = this.props.state.variable;
        return (
            <Card>
                <Text style={styles.titleTextStyle}>{name}</Text>
                <CardSection>
                    <Input
                        label="Input Unit"
                        value={input_unit}
                        editable={false}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Output Unit"
                        value={output_unit}
                        editable={false}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Value"
                        value={value}
                        onChangeText={value => this.props.variableFormUpdate({prop:'value', value})}

                    />
                </CardSection>
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Update Value
                    </Button>
                </CardSection>
            </Card>
        )
    };
}
const styles = {
    titleTextStyle: {
        fontSize: 20,
        fontFamily: 'pacifico',
        padding: 20,
        textAlign: 'center'
    }
};

const mapStateToProps = state => {
    return { state };
};
export default connect(mapStateToProps, { variableFormUpdate, variableObjUpdate })(VariableDetails);