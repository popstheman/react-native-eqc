import React, { Component } from 'react';
import { Text, View, ListView } from 'react-native';
import { connect } from 'react-redux';
import VariablesListItem from './VariablesListItem';
import { variableFormUpdate } from './../actions';

class Variables extends Component {
    componentWillMount() {
        this.createDataSource(this.props.variable);
    };

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps.variable);
    };

    createDataSource({ newDataVariables }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(newDataVariables);
    };

    renderRow(variable) {
        return <VariablesListItem selectedRow={variable}/>
    };

    renderListView() {
        return (
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        );
    };

    render() {
        return (
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        )
    };
}


const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps, { variableFormUpdate })(Variables);