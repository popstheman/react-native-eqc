import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View, ListView} from 'react-native';
import { CardSection, Button } from './common';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { testUpdate } from '../actions';
import VariablesListItem from './VariablesListItem';


class TestPage extends Component {
    componentWillMount() {
        console.log(this.props);
        this.createDataSource(this.props.testPage);
     }

    componentWillReceiveProps(newProps) {
        console.log(newProps);
        this.createDataSource(newProps.testPage);
    }

    createDataSource({ newDataVariables }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(newDataVariables);
    };

    renderButton() {
        console.log(this.props);
        this.props.testUpdate({ prop: "testName", value: "Pops" });
        this.props.testUpdate({ prop: "testEmail", value: "murtaza.saifuddin52@gmail.com" });

        Actions.tabs();
    }

    onRowPress(){
        console.log("Row has been pressed");
    }

    renderRow(variable) {
        return <VariablesListItem selectedRow={variable}/>
    }

    render() {
        return (
            <View>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
                <View style={{flexDirection:"row", height:50}}>
                    <Button
                        onPress={this.renderButton.bind(this)}
                    >
                        Press Me
                    </Button>
                </View>
            </View>



        )
    }
}
const styles = {
    listItemTextStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
};

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps, { testUpdate })(TestPage)