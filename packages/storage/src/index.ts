import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  NoSuchKey,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3Client = new S3Client({
  region: process.env.STORAGE_DEFAULT_REGION,
  endpoint: process.env.STORAGE_ENDPOINT_URL,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.STORAGE_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY ?? '',
  },
})

export {
  s3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  NoSuchKey,
  getSignedUrl,
}
