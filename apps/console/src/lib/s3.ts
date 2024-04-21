import { S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { PutObjectCommand } from '@aws-sdk/client-s3'

export const s3Client = new S3Client({
  region: 'us-east-1',
  endpoint: 'http://localhost:9000',
  forcePathStyle: true,
  credentials: {
    accessKeyId: 'minio',
    secretAccessKey: 'minio123',
  },
})

interface s3UploadUrlProps {
  key: string
  acl?: 'public-read' | 'private'
  options?: { expiresIn?: number }
}

export const getFileUploadUrl = async ({
  key,
  acl = 'public-read',
  options: { expiresIn = 3600 } = {},
}: s3UploadUrlProps): Promise<{ signedUrl: string }> => {
  const command = new PutObjectCommand({
    Bucket: 'acme',
    Key: key,
    ACL: acl,
  })

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn })

  return { signedUrl }
}

export {
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  NoSuchKey,
} from '@aws-sdk/client-s3'
