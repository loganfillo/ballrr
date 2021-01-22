import { Storage } from 'aws-amplify';

export async function deleteFromS3(s3_key: string): Promise<void> {
    try {
        await Storage.remove(s3_key);
    } catch (e) {
        console.log('Failed to delete post. Error: \n', e);
    }
}
