import { S3Client, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

const s3 = new S3Client({});
const BUCKET = process.env.BUCKET_NAME!;

export const handler = async (event: any) => {
  try {
    const res = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET }));
    return {
      statusCode: 200,
      body: JSON.stringify(res.Contents || []),
    };
  } catch (err: any) {
    console.error('Error listing S3 objects:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};