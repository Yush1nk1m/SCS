import {
    Injectable,
    InternalServerErrorException,
    Logger,
} from "@nestjs/common";
import { UploadedFile } from "./types/uploaded-file.type";
import * as path from "path";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";
dotenv.config();

@Injectable()
export class UploadService {
    private logger = new Logger("UploadService");
    private s3Client: S3Client;

    constructor() {
        this.s3Client = new S3Client({
            region: process.env.AWS_S3_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
    }

    // server receives file from the client and upload it to S3 bucket
    async uploadImage(file: Express.Multer.File): Promise<UploadedFile> {
        // get AWS S3 bucket name from environment variable
        const bucketName = process.env.AWS_S3_BUCKET_NAME;
        // generate filename with timestamp
        const filename = `${new Date().getTime()}${uuidv4()}${path.extname(file.originalname).toLowerCase()}`;

        // create put command to send image file to S3 bucket
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: filename,
            Body: file.buffer,
            ContentType: file.mimetype,
        });

        try {
            // upload file to S3 bucket and return URL
            await this.s3Client.send(command);
            const url = `https://${bucketName}.s3.amazonaws.com/${filename}`;
            return { url };
        } catch (error) {
            console.error("S3 upload error:", error);
            throw new InternalServerErrorException(
                "Failed to upload file to S3",
            );
        }
    }

    // Sign URL and return it to the client to allow them to upload directly
    async getPresignedUrl(key: string): Promise<string> {
        // create command to upload file to S3 bucket
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
        });

        return getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
    }
}
