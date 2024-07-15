import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { fetchLeaderboard } from '../Firebase/FetchLeaderBoard';
import globalStyles from '../styles';
import { SafeAreaView } from 'react-native-safe-area-context';

type TimePeriod = 'daily' | 'weekly' | 'monthly' | 'all';

const LeaderboardScreen = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [timePeriod, setTimePeriod] = useState<TimePeriod>('all');

    useEffect(() => {
        fetchLeaderboardData();
    }, [timePeriod]);

    const fetchLeaderboardData = async () => {
        setRefreshing(true);
        try {
            const leaderboardData = await fetchLeaderboard(timePeriod);
            setLeaderboard(leaderboardData);
        } catch (error) {
            console.error("Error fetching leaderboard: ", error);
        } finally {
            setRefreshing(false);
        }
    };

    const TimePeriodButton = ({ period }: { period: TimePeriod }) => (
        <TouchableOpacity
            style={[
                globalStyles.periodButton,
                timePeriod === period && globalStyles.activePeriodButton
            ]}
            onPress={() => setTimePeriod(period)}
        >
            <Text style={[
                globalStyles.periodButtonText,
                timePeriod === period && globalStyles.activePeriodButtonText
            ]}>
                {period.charAt(0).toUpperCase() + period.slice(1)}
            </Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={globalStyles.container}>
            <Text style={globalStyles.headerText}>Leaderboard</Text>
            <View style={globalStyles.periodContainer}>
                <TimePeriodButton period="daily" />
                <TimePeriodButton period="weekly" />
                <TimePeriodButton period="monthly" />
                <TimePeriodButton period="all" />
            </View>
            <FlatList
                data={leaderboard}
                keyExtractor={(item) => item.userId}
                renderItem={({ item, index }) => (
                    <View style={globalStyles.leaderboardItem}>
                        <Text style={globalStyles.leaderboardRank}>{index + 1}</Text>
                        <Text style={globalStyles.leaderboardName}>{item.name}</Text>
                        <Text style={globalStyles.leaderboardCount}>{item.count} tasks</Text>
                    </View>
                )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={fetchLeaderboardData} />
                }
            />
        </SafeAreaView>
    );
};



export default LeaderboardScreen;