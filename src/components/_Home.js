import React, { Component } from 'react';
import { Text, View, Picker, ScrollView, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import RadioForm, { RadioButtonLable } from 'react-native-simple-radio-button';
import { Card, CardSection, Input, Button } from './common';
import { homeFormUpdate, calculateCost, variableFormUpdate } from '../actions';
import deep from 'deep-diff';

import { searchArrayIndex } from '../components/utility';



import Constants from './Strings';

class Home extends Component {

    componentWillMount() {
        this.getData();
    };

    getData() {
        const { dataVariables } = this.props.state;
        var value = dataVariables;
        // Make this call as an action
        AsyncStorage.getItem("variable_data").then(data => {
            if (data) {
                value = JSON.parse(data);
            }
        }).then(() => {
            var differences = deep(dataVariables,value);
            deep.observableDiff(value,dataVariables, function (d){
                console.log(d);
                if (d.kind == "A" || d.kind == "N")
                {
                    deep.applyChange(value,dataVariables,d);
                }
            });
            this.props.variableFormUpdate({ prop: 'newDataVariables', value });
        });
    };

    renderPickerList(pickerListArray) {
        let pickerListMapped = pickerListArray.map((v, i) => {
            return <Picker.Item key={i} value={v.value} label={v.label}/>
        });
        return pickerListMapped;
    }

    renderRadioProps() {
        const {
            PROFIT,
            COST,
        } = Constants;
        return [
            { label: `${COST}`, value: `${COST}` },
            { label: `${PROFIT}`, value: `${PROFIT}` }
        ];
    }

    onButtonPress() {
        this.props.calculateCost({ prop: "homeObject", homeObject: this.props.state });
    }


    render() {
        const {
            contentContainerStyle,
            calculationResultViewStyle,
            resultTextStyle,
            pickerContainerStyle,
            pickerTextStyle,
            pacificoFontStyle
        } = styles;
        const { paperType, colorType, quantity, paperPrice, calculationType, printingSize } = this.props.state.homeForm;
        const { paperTypes, dataVariables, colorTypes } = this.props.state;
        return (
            <ScrollView contentContainerStyle={contentContainerStyle}>
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}> Calculate </Button>
                </CardSection><Card>
                <CardSection>
                    <View style={calculationResultViewStyle}>
                        <Text style={[resultTextStyle, pacificoFontStyle]}>0</Text>
                        <Text>{calculationType}</Text>
                    </View>
                </CardSection>

                <CardSection style={[pickerContainerStyle]}>
                    <Text style={[pickerTextStyle, pacificoFontStyle]}>
                        Type of Printing
                    </Text>
                    <Picker
                        selectedValue={paperType}
                        onValueChange={value => this.props.homeFormUpdate({prop:'paperType', value})}>
                        {this.renderPickerList(paperTypes)}
                    </Picker>
                </CardSection>

                <CardSection style={pickerContainerStyle}>
                    <Text style={[pickerTextStyle, pacificoFontStyle]}>
                        Color
                    </Text>
                    <Picker
                        selectedValue={colorType}
                        onValueChange={value => this.props.homeFormUpdate({prop:'colorType', value})}
                    >
                        {this.renderPickerList(colorTypes)}
                    </Picker>
                </CardSection>

                <CardSection>
                    <Input
                        label="Printing Size"
                        placeholder="4"
                        onChangeText={value => this.props.homeFormUpdate({prop:'printingSize', value})}
                        value={printingSize}
                        keyboardType="numeric"
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Quantity"
                        placeholder="500"
                        onChangeText={value => this.props.homeFormUpdate({prop:'quantity', value})}
                        value={quantity}
                        keyboardType="numeric"
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Price"
                        placeholder="3.5"
                        onChangeText={value => this.props.homeFormUpdate({prop:'paperPrice', value})}
                        value={paperPrice}
                        keyboardType="numeric"

                    />
                </CardSection>

                <CardSection>
                    <View>
                        <RadioForm
                            radio_props={this.renderRadioProps()}
                            initial={0}
                            onPress={(value) => this.props.homeFormUpdate({prop:'calculationType', value})}
                        />
                    </View>
                </CardSection>
            </Card>
            </ScrollView>
        );
    };
}

const styles = {
    pickerContainerStyle: {
        flexDirection: 'column'
    },
    pickerTextStyle: {
        fontSize: 18,
        paddingLeft: 20,
    },
    resultTextStyle: {
        fontSize: 55,
    },
    calculationResultViewStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainerStyle: {
        paddingVertical: 20
    },
    pacificoFontStyle: {
        fontFamily: 'pacifico'
    },
    walkwayBoldFontStyle: {
        fontFamily: 'walkway_bold'
    }
};


const mapStateToProps = state => {
    return { state };
};

export default connect(mapStateToProps, { homeFormUpdate, calculateCost, variableFormUpdate })(Home);