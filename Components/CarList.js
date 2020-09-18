
import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

import CarListItem from './CarListItem';

export default class CarList extends React.Component {
    state = {
        cars: {},
    };

    componentDidMount() {
        firebase
            .database()
            .ref('/Cars')
            .on('value', snapshot => {
                this.setState({ cars: snapshot.val() });
            });
    }

    handleSelectCar = id => {
        this.props.navigation.navigate('CarDetails', { id });
    };

    render() {
        const { cars } = this.state;
        // Vi viser ingenting hvis der ikke er data
        if (!cars) {
            return null;
        }
        // Flatlist forventer et array. Derfor tager vi alle values fra vores cars objekt, og bruger som array til listen
        const carArray = Object.values(cars);
        // Vi skal også bruge alle IDer, så vi tager alle keys også.
        const carKeys = Object.keys(cars);
        return (
            <View>
                <FlatList
                    data={carArray}
                    // Vi bruger carKeys til at finde ID på den aktuelle bil og returnerer dette som key, og giver det med som ID til CarListItem
                    keyExtractor={(item, index) => carKeys[index]}
                    renderItem={({ item, index }) => (
                        <CarListItem
                            car={item}
                            id={carKeys[index]}
                            onSelect={this.handleSelectCar}
                        />
                    )}
                />
            </View>
        );
    }
}
