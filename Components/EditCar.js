
import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView
} from 'react-native';
import firebase from 'firebase';

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center' },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: { fontWeight: 'bold', width: 100 },
    input: { borderWidth: 1, flex: 1 },
});

export default class EditCar extends React.Component {
    state = {
        brand: '',
        model: '',
        year: '',
        licensePlate: '',
    };

    componentDidMount() {
        const id = this.props.navigation.getParam('id');
        this.loadCar(id);
    }

    // Her loader vi bilens data ud fra det ID vi får med fra navigationen
    loadCar = id => {
        firebase
            .database()
            .ref(`/Cars/${id}`)
            .once('value', dataObject => {
                const car = dataObject.val();
                const { brand, model, year, licensePlate } = car;
                this.setState({ brand, model, year, licensePlate });
            });
    };

    handleBrandChange = text => this.setState({ brand: text });

    handleModelChange = text => this.setState({ model: text });

    handleYearChange = text => this.setState({ year: text });

    handleLicensePlateChange = text => this.setState({ licensePlate: text });

    updateData = () => {
        // Vi bruger this.props.navigation flere steder så vi pakker den ud én gang for alle
        const { navigation } = this.props;
        const { brand, model, year, licensePlate } = this.state;
        const id = navigation.getParam('id');
        try {
            const reference = firebase
                .database()
                .ref(`/Cars/${id}`)
                // Vi bruger update, så kun de felter vi angiver, bliver ændret
                .update({brand, model, year, licensePlate });
            // Når bilen er ændret, går vi tilbage.
            Alert.alert("Din info er nu opdateret");
            navigation.goBack();
        } catch (error) {
            Alert.alert(`Error: ${error.message}`);
        }
    };

    render() {
        const { brand, model, year, licensePlate } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.row}>
                        <Text style={styles.label}>Brand</Text>
                        <TextInput
                            value={brand}
                            onChangeText={this.handleBrandChange}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Model</Text>
                        <TextInput
                            value={model}
                            onChangeText={this.handleModelChange}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Year</Text>
                        <TextInput
                            value={year}
                            onChangeText={this.handleYearChange}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>License Plate</Text>
                        <TextInput
                            value={licensePlate}
                            onChangeText={this.handleLicensePlateChange}
                            style={styles.input}
                        />
                    </View>
                    <Button title="Press to update car info" onPress={this.updateData} />
                </ScrollView>
            </View>
        );
    }
}
