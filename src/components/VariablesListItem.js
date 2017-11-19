import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { CardSection } from './common';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { variableFormUpdate } from './../actions';

class VariablesListItem extends Component {

    onRowPress() {
        _.each(this.props.selectedRow, (value, prop) => {
            this.props.variableFormUpdate({ prop, value });
        });

        Actions.variableDetails({type: "reset"});
    }

    render() {
        const { value, name } = this.props.selectedRow;
        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View>
                    <CardSection>
                        <Text style={styles.listItemTextStyle}> {name} : {value}</Text>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
;

const styles = {
    listItemTextStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
};

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps, { variableFormUpdate })(VariablesListItem);