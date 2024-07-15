import { firestore } from './firebase';
import { collection, query, where, getDocs, getDoc, doc, Timestamp, orderBy } from 'firebase/firestore';

interface UserCompletion {
    userId: string;
    count: number;
    name?: string;
}

type TimePeriod = 'daily' | 'weekly' | 'monthly' | 'all';

export const fetchLeaderboard = async (timePeriod: TimePeriod = 'all'): Promise<UserCompletion[]> => {
    try {
        const todoRef = collection(firestore, 'todos');
        let q = query(todoRef, where('status', '==', 'complete'));

        // Add time period filter
        if (timePeriod !== 'all') {
            const now = new Date();
            let startDate: Date;

            switch (timePeriod) {
                case 'daily':
                    startDate = new Date(now.setHours(0, 0, 0, 0));
                    break;
                case 'weekly':
                    startDate = new Date(now.setDate(now.getDate() - 7));
                    break;
                case 'monthly':
                    startDate = new Date(now.setMonth(now.getMonth() - 1));
                    break;
                default:
                    startDate = new Date(0); // Beginning of time
            }

            q = query(q, 
                where('createdAt', '>=', Timestamp.fromDate(startDate)),
                orderBy('createdAt', 'desc')
            );
        }

        const snapshot = await getDocs(q);

        const userCompletionCounts: { [key: string]: number } = {};

        snapshot.docs.forEach(doc => {
            const todo = doc.data();
            const userId = todo.userId;
            if (!userCompletionCounts[userId]) {
                userCompletionCounts[userId] = 0;
            }
            userCompletionCounts[userId] += 1;
        });

        const sortedUsers = Object.entries(userCompletionCounts)
            .map(([userId, count]) => ({ userId, count }))
            .sort((a, b) => b.count - a.count);

        const userDetailsPromises = sortedUsers.map(async (user) => {
            try {
                const userDoc = await getDoc(doc(firestore, 'users', user.userId));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const userName = userData.displayName || 'Unknown User';
                    return { ...user, name: userName };
                } else {
                    console.log(`No user found for userId: ${user.userId}`);
                    return { ...user, name: 'Unknown User' };
                }
            } catch (error) {
                console.error(`Error fetching user data for userId: ${user.userId}`, error);
                return { ...user, name: 'Unknown User' };
            }
        });

        return await Promise.all(userDetailsPromises);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Detailed error:", error.message);
        }
        console.error("Error fetching leaderboard: ", error);
        return [];
    }
};