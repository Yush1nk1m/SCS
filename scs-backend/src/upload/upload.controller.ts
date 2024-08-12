import {
    Controller,
    HttpCode,
    HttpStatus,
    Logger,
    ParseFilePipe,
    Post,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { UploadService } from "./upload.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { PresignedURLResponse, URLResponse } from "./types/response.type";

@Controller("v1/upload")
export class UploadController {
    private logger = new Logger("UploadController");

    constructor(private readonly uploadService: UploadService) {}

    @Post("images")
    @UseInterceptors(FileInterceptor("image"))
    @HttpCode(HttpStatus.CREATED)
    async uploadImage(
        @UploadedFile(ParseFilePipe) file: Express.Multer.File,
    ): Promise<URLResponse> {
        const uploadedFile = await this.uploadService.uploadImage(file);

        return {
            message: "An image file has been uploaded.",
            url: uploadedFile.url,
        };
    }

    @Post("presigned-url")
    @HttpCode(HttpStatus.CREATED)
    async getPresignedUrl(): Promise<PresignedURLResponse> {
        // key can be changed in any way
        const key = `${new Date().getTime()}.jpg`;

        // get pre-signed url from S3 service
        const url = await this.uploadService.getPresignedUrl(key);

        return {
            message: "pre-signed url has been created.",
            url,
            key,
        };
    }
}
