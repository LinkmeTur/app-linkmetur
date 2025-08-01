/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    S3Client,
    PutObjectCommand,
    ObjectCannedACL,
    DeleteObjectCommand,
} from '@aws-sdk/client-s3';

const s3 = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION as string,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
    },
    requestChecksumCalculation: 'WHEN_REQUIRED',
});

export async function sendFileS3(key: string, file: File) {
    const params = {
        Bucket: 'linkmeturimages2025',
        Key: `${key}/${Date.now()}_${file.name.trim()}`,
        Body: file,
        ACL: ObjectCannedACL.public_read,
    };
    console.log(process.env.NEXT_PUBLIC_AWS_REGION);
    console.log('teste', s3);
    console.log(params);
    console.log(file);

    const command = new PutObjectCommand(params);
    console.log(command);
    const res = await s3.send(command);
    console.log(res);
    if (!res) throw new Error('Erro ao enviar arquivo para o S3');
    return {
        file_URL: `https://${params.Bucket}.s3.sa-east-1.amazonaws.com/${params.Key}`,
        file_alt: file.name,
    };
}
export async function deleteFile(key: string, file_URL: string) {
    const fileKey = file_URL.split('/');

    const params = {
        Bucket: 'linkmeturimages2025',
        Key: key + '/' + fileKey[fileKey.length - 1],
    };

    try {
        const command = new DeleteObjectCommand(params);
        await s3.send(command);
        console.log('Arquivo deletado com sucesso!');
    } catch (error) {
        console.error('Erro ao deletar arquivo:', error);
    }
}
