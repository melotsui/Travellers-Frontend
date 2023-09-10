import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key: string, value: any) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        console.log('Data stored successfully.');
    } catch (error) {
        console.log('Error storing data:', error);
    }
};

const retrieveData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            const parsedValue = JSON.parse(value);
            console.log(`Retrieved value (${key}):`, parsedValue);
            return parsedValue;
        } else {
            console.log('Value not found.');
            return null;
        }
    } catch (error) {
        console.log('Error retrieving data:', error);
        return null;
    }
};

const removeData = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
        console.log('Data removed successfully.');
    } catch (error) {
        console.log('Error removing data:', error);
    }
};

export { storeData, retrieveData, removeData };