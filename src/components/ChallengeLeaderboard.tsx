import React from 'react';
import { Text, View } from 'native-base';
import { Row, Rows, Table } from 'react-native-table-component';
import { StyleSheet, Image } from 'react-native';
import { Challenge } from '../lib/types';

interface Props {
    challenge: Challenge;
}

const LeaderBoard: React.FC<Props> = ({ challenge }: Props) => {
    const tableHead = ['#', 'User', 'Views', 'Likes'];
    const tableData = [
        ['1', 'Logan', '2000', '123'],
        ['2', 'Dana', '1500', '100'],
        ['3', 'Liam', '1000', '90'],
        ['4', 'Simon', '100', '12'],
        ['5', 'Des', '97', '11'],
        ['6', 'Ben', '81', '10'],
        ['7', 'Colin', '56', '9'],
        ['8', 'Marcus', '34', '8'],
        ['9', 'Luis', '12', '3'],
        ['10', 'Fatty', '1', '1'],
    ];
    return (
        <View style={styles.modalContainer}>
            <View
                style={{
                    position: 'absolute',
                    left: 5,
                    top: 20,
                }}
            ></View>
            <Text
                style={{
                    textAlign: 'center',
                    fontSize: 30,
                    textDecorationLine: 'underline',
                }}
            >
                {challenge.title}
            </Text>
            <Image
                style={{ height: 200, width: '100%', marginTop: 20 }}
                source={{ uri: challenge.posterUri }}
            />
            <View style={styles.container}>
                <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                    <Row data={tableHead} style={styles.head} textStyle={styles.text} />
                    <Rows data={tableData} textStyle={styles.text} />
                </Table>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        marginTop: 60,
    },
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff',
    },
    head: {
        height: 40,
        backgroundColor: '#f1f8ff',
    },
    text: {
        margin: 6,
    },
});

export default LeaderBoard;
