import { firestore } from './firebase';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';

interface UserCompletion {
    userId: string;
    count: number;
    name?: string;
}

export const fetchLeaderboard = async (): Promise<UserCompletion[]> => {
    try {
        const todoRef = collection(firestore, 'todos');
        const q = query(todoRef, where('status', '==', 'complete'));
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
        console.error("Error fetching leaderboard: ", error);
        return [];
    }
};
