import { Platform, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { SwitchSmileRN, OfferBeaconSelectMode } from 'react-native-rnssbpsdk';
import { Beacon, BeaconModel, parseJsonToModel } from '../helper';

export function HomeScreen() {
    const [detectedBeacon, setDetectedBeacon] = useState<Beacon | null>(null);

    useEffect(() => {
        if (Platform.OS === 'ios') {
            SwitchSmileRN.subscribe_iOSwatchBeaconsDetected(
                async (params) => {
                    console.log('iOS - Detected beacon: ' + JSON.stringify(params));
                    const beaconModels = parseJsonToModel(params);
                    const beaconModel = beaconModels.length > 0 ? beaconModels[0] : null
                    setDetectedBeacon(beaconModel);
                }
            );
        }

        if (Platform.OS === 'android') {
            SwitchSmileRN.subscribe_ssbpScannerChangeBeacons(
                (params) => {
                    //Example use
                    const regionDatasArray = params.regions;
                    const beaconDatasArray = params.beacons;
                    const jsonArray = [];
                    regionDatasArray.forEach(element => {
                        jsonArray.push(JSON.stringify(element))
                    });
                    beaconDatasArray.forEach(element => {
                        jsonArray.push(JSON.stringify(element))
                    });
                    console.log('Android-ssbpScannerChangeBeacons ' + jsonArray);

                    jsonArray.forEach(jsonString => {
                        const json = JSON.parse(jsonString);
                        console.log(json.your_key_name);

                        const beaconModel = new BeaconModel();
                        beaconModel.uuid = json.uuid;
                        beaconModel.major = json.major;
                        beaconModel.minor = json.minor;
                        beaconModel.rssi = json.rssi;

                        setDetectedBeacon(beaconModel);
                    });


                }
            )
        }
    }, []);

    return (
        <View style={styles.container}>
            <Text>{detectedBeacon?.uuid}</Text>
            <Text>{detectedBeacon?.major}</Text>
            <Text>{detectedBeacon?.minor}</Text>
            <Text>{detectedBeacon?.rssi}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
});