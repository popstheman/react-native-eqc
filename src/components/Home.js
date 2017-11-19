import React, { Component } from 'react';
import { Text, View, Picker, ScrollView, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import RadioForm, { RadioButtonLable } from 'react-native-simple-radio-button';
import { Card, CardSection, Input, Button } from './common';
import { homeFormUpdate, homeFormGetData, calculateCost, calculateBaseEquation } from '../actions';


import Constants from './Strings';

class Home extends Component {

    componentWillMount() {
        this.props.homeFormGetData(this.props.state.dataVariables);
    };

    componentWillReceiveProps(newProps) {
        this.props = newProps;
    }


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
        const { variable, homeForm, equations } = this.props.state;
        this.props.calculateBaseEquation(variable.newDataVariables, this.props.state.homeForm);

        this.props.calculateCost(variable.newDataVariables, homeForm, equations);
        this.refs._scrollView.scrollTo({ x: 0, y: 0, animated: true });
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
        const { paperType, color, quantity, paperPrice, calculationType, printingSize, totalPrice } = this.props.state.homeForm;
        const { paperTypes, colorTypes } = this.props.state;
        return (
            <ScrollView ref="_scrollView" contentContainerStyle={contentContainerStyle}>
                <Card>
                    <CardSection>
                        <View style={calculationResultViewStyle}>
                            <Text style={[resultTextStyle, pacificoFontStyle]}>{totalPrice}</Text>
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
                            selectedValue={color}
                            onValueChange={value => this.props.homeFormUpdate({prop:'color', value})}
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
                            onChangeText={value => {
                            this.props.homeFormUpdate({prop:'quantity', value});
                            newValue = Math.ceil((value/1000));
                            this.props.homeFormUpdate({prop:'quantitySizeRoundUp', value:newValue })
                        }}
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
                        <View style={{flex: 1, flexDirection: 'row', marginTop:5}}>
                            <RadioForm
                                radio_props={this.renderRadioProps()}
                                initial={0}
                                onPress={(value) => this.props.homeFormUpdate({prop:'calculationType', value})}
                            />
                            <Button onPress={this.onButtonPress.bind(this)}> Calculate </Button>


                        </View>


                    </CardSection>

                    <CardSection>

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

export default connect(mapStateToProps, {
    homeFormUpdate,
    homeFormGetData,
    calculateCost,
    calculateBaseEquation
})(Home);