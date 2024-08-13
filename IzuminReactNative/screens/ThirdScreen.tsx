import { StyleSheet, Text, View } from 'react-native';

export function ThirdScreen() {
    return (
        <View style={styles.container}>
            <Text>ThirdScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
});