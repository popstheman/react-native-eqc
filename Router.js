import React, { Component } from 'react';
import { PixelRatio, View, Text } from 'react-native';
import { Scene, Router, ActionConst } from 'react-native-router-flux';
import VariableDetails from './src/components/VariableDetails';
import Home from './src/components/Home';
import Variables from './src/components/Variables';
import Icon from 'react-native-vector-icons/MaterialIcons';


class TabIcon extends Component {
    render() {
        var color = this.props.selected ? '#00f240' : '#301c2a';

        return (
            <View style={styles.container}>
                <Icon style={{color: "black"}} name={this.props.iconName} size={25}/>
                {/*<Text style={styles.tabBarTextStyle}>{this.props.title}</Text>*/}
            </View>
        );
    }
}

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root">
                <Scene key="tabs" showLabel={false} tabBarStyle={styles.tabBarStyle} activeBackgroundColor="#3FA5BF" animationEnabled tabs={true} initial
                       type={ActionConst.REPLACE}>
                    <Scene key="homeTab" hideNavBar component={Home} title="Calculate" icon={TabIcon} iconName="home"/>
                    <Scene key="variableTab" hideNavBar component={Variables} title="Variables" icon={TabIcon} iconName="description"/>
                </Scene>
                <Scene key="variableDetails" component={VariableDetails} title="Variable Details" />
            </Scene>
        </Router>
    );
};
const styles = {
    tabBarStyle: {
        backgroundColor: 'white',
        opacity:0.6,
        height:40
    },
    tabBarTextStyle: {
        color: "black",
        fontSize: 18,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center'
    }
}


export default RouterComponent;
