import * as Minio from 'minio';
import dotenv from 'dotenv';
dotenv.config();

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_END_POINT,
  port: process.env.MINIO_PORT,
  useSSL: false,
  accessKey: process.env.MINIO_ROOT_USER,
  secretKey: process.env.MINIO_ROOT_PASSWORD
});

const bucketName = 'uploads';

const initializeMinio = () => {
  minioClient.bucketExists(bucketName, (err, exists) => {
    if (err) {
      console.error('MinIO 버킷 확인 오류:', err);
      return;
    }
    if (!exists) {
      minioClient.makeBucket(bucketName, 'us-east-1', (err) => {
        if (err) {
          console.error('MinIO 버킷 생성 오류:', err);
          return;
        }
        console.log(`MinIO 버킷 '${bucketName}'이 생성되었습니다.`);

        // 버킷 정책 설정
        const policy = {
          Version: "2012-10-17",
          Statement: [
            {
              Effect: "Allow",
              Principal: "*",
              Action: ["s3:GetObject", "s3:PutObject"],
              Resource: [`arn:aws:s3:::${bucketName}/*`]
            }
          ]
        };

        minioClient.setBucketPolicy(bucketName, JSON.stringify(policy), (err) => {
          if (err) {
            console.error('MinIO 버킷 정책 설정 오류:', err);
            return;
          }
          console.log(`MinIO 버킷 '${bucketName}'에 대한 정책이 설정되었습니다.`);
        });
      });
    } else {
      console.log(`MinIO 버킷 '${bucketName}'이 이미 존재합니다.`);

      // 버킷 정책 설정
      const policy = {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: "*",
            Action: ["s3:GetObject", "s3:PutObject"],
            Resource: [`arn:aws:s3:::${bucketName}/*`]
          }
        ]
      };

      minioClient.setBucketPolicy(bucketName, JSON.stringify(policy), (err) => {
        if (err) {
          console.error('MinIO 버킷 정책 설정 오류:', err);
          return;
        }
        console.log(`MinIO 버킷 '${bucketName}'에 대한 정책이 설정되었습니다.`);
      });
    }
  });
};

export { minioClient, initializeMinio };