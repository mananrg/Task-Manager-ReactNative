import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { fetchLeaderboard } from '../Firebase/FetchLeaderBoard';
import globalStyles from '../styles';
import { SafeAreaView } from 'react-native-safe-area-context';

const LeaderboardScreen = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchLeaderboardData();
    }, []);

    const fetchLeaderboardData = async () => {
        try {
            const leaderboardData = await fetchLeaderboard();
            setLeaderboard(leaderboardData);
        } catch (error) {
            console.error("Error fetching leaderboard: ", error);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchLeaderboardData();
        setRefreshing(false);
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <Text style={globalStyles.headerText}>Leaderboard</Text>
            <FlatList
                data={leaderboard}
                keyExtractor={(item) => item.userId}
                renderItem={({ item }) => (
                    <View style={globalStyles.leaderboardItem}>
                        <Text style={globalStyles.leaderboardName}>{item.name}</Text>
                        <Text style={globalStyles.leaderboardCount}>{item.count} completed tasks</Text>
                    </View>
                )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </SafeAreaView>
    );
};

export default LeaderboardScreen;
