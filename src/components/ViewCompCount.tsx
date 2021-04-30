import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_COMPETITION_SUBMISSION_COUNT } from '../lib/queries';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
    compId: number;
    refreshing: boolean;
}
const ViewCompCount: React.FC<Props> = ({ compId, refreshing }: Props) => {
    const [counter, setCounter] = useState(0);
    const { height } = Dimensions.get('window');

    const { loading, error, data, refetch } = useQuery(GET_COMPETITION_SUBMISSION_COUNT, {
        variables: { comp_id: compId },
    });

    useEffect(() => {
        refetch();
    }, [refreshing]);

    useEffect(() => {
        async function getCompThumpnail() {
            if (!loading && !error) {
                const aggr = data.competition_submission_aggregate.aggregate;
                setCounter(aggr.count);
            }
        }
        getCompThumpnail();
    }, [data]);

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons
                name={'account-multiple'}
                size={0.025 * height}
                color={'black'}
            />
            <View style={{ paddingLeft: 3 }}>
                <Text style={{ fontSize: 18 }}>{counter}</Text>
            </View>
        </View>
    );
};

export default ViewCompCount;
