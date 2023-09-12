import { createThumbnail } from 'react-native-create-thumbnail';

async function generateThumbnail(videoUri: string): Promise<string | null> {
    try {
        const { path } = await createThumbnail({
            url: videoUri,
        });
        return path;
    } catch (error) {
        console.error("Error generating thumbnail: ", error);
        return null;
    }
}

export { generateThumbnail };