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
import {
    ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import { PresignedURLResponseDto, URLResponseDto } from "./dto/response.dto";
import { GetCurrentUserId } from "../common/decorator/get-current-user-id.decorator";
import { SetResponseDto } from "../common/decorator/set-response-dto.decorator";

@ApiTags("Upload")
@Controller("v1/upload")
export class UploadController {
    private logger = new Logger("UploadController");

    constructor(private readonly uploadService: UploadService) {}

    // [UP-01] Controller logic
    @ApiBearerAuth()
    @ApiOperation({ summary: "이미지 업로드" })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "이미지 업로드 성공",
        type: URLResponseDto,
    })
    @SetResponseDto(URLResponseDto)
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                file: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    })
    @Post("images")
    @UseInterceptors(FileInterceptor("image"))
    @HttpCode(HttpStatus.CREATED)
    async uploadImage(
        @GetCurrentUserId() userId: number,
        @UploadedFile(ParseFilePipe) file: Express.Multer.File,
    ): Promise<URLResponseDto> {
        this.logger.verbose(`User with id ${userId} uploaded image`);
        const uploadedFile = await this.uploadService.uploadImage(userId, file);

        return {
            message: "An image file has been uploaded.",
            url: uploadedFile.url,
        };
    }

    // [UP-02] Controller logic
    @ApiBearerAuth()
    @ApiOperation({ summary: "Presigned URL 생성" })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "Presigned URL 생성 성공",
        type: PresignedURLResponseDto,
    })
    @SetResponseDto(PresignedURLResponseDto)
    @Post("presigned-url")
    @HttpCode(HttpStatus.CREATED)
    async getPresignedUrl(): Promise<PresignedURLResponseDto> {
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
