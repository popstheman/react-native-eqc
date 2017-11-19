import React, { Component } from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Home from './Home';
import Variables from './Variables';
import TestPage from './TestPage';


class ScrollableTabViewComponent extends Component{
    render(){
        return(
            <ScrollableTabView>
                <Home tabLabel="Calculate" />
                <Variables tabLabel="Variables" />
                <TestPage tabLabel="TestPage"/>
            </ScrollableTabView>
        );
    }

};

export default ScrollableTabViewComponent;