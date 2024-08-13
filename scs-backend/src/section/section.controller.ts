import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
} from "@nestjs/common";
import { SectionService } from "./section.service";
import { Public } from "../common/decorator/public.decorator";
import { SectionResponse, SectionsResponse } from "./types/response.type";
import { RolesGuard } from "../common/guard/roles.guard";
import { Roles } from "../common/decorator/roles.decorator";
import { CreateSectionDto } from "./dto/create-section.dto";
import { GetCurrentUserId } from "../common/decorator/get-current-user-id.decorator";
import {
    UpdateSectionDescriptionDto,
    UpdateSectionSubjectDto,
} from "./dto/update-section.dto";
import { BaseResponse } from "../common/types/response.type";
import { QuestionsResponse } from "../question/types/response.type";

@Controller("v1/sections")
export class SectionController {
    private logger = new Logger("SectionController");
    constructor(private readonly sectionService: SectionService) {}

    // [S-01] Controller logic
    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllSections(
        @Query("sort") sort: "subject" | "id" = "id",
        @Query("order") order: "ASC" | "DESC" = "ASC",
    ): Promise<SectionsResponse> {
        const sections = await this.sectionService.getAllSections(sort, order);

        return {
            message: "All sections have been found.",
            sections,
        };
    }

    // [S-02] Controller logic
    @Public()
    @Get(":id")
    @HttpCode(HttpStatus.OK)
    async getSpecificSection(
        @Param("id", ParseIntPipe) id: number,
    ): Promise<SectionResponse> {
        const section = await this.sectionService.getSpecificSection(id);

        return {
            message: `Section with id: ${id} has been found.`,
            section,
        };
    }

    // [S-07] Controller logic
    @Public()
    @Get(":id/questions")
    @HttpCode(HttpStatus.OK)
    async getQuestionsBySection(
        @Param("id", ParseIntPipe) sectionId: number,
        @Query("page", ParseIntPipe) page: number = 1, // page number
        @Query("limit", ParseIntPipe) limit: number = 10, // questions per page
        @Query("sort") sort: "createdAt" | "saved" = "createdAt",
        @Query("order") order: "ASC" | "DESC" = "DESC",
        @Query("search") search: string = "",
    ): Promise<QuestionsResponse> {
        this.logger.verbose(
            "Query parameters: ",
            page,
            limit,
            sort,
            order,
            search,
        );

        const { questions, total } =
            await this.sectionService.getQuestionsBySection(
                sectionId,
                page,
                limit,
                sort,
                order,
                search,
            );

        return {
            message: `Questions of section ${sectionId} have been found.`,
            questions,
            total,
        };
    }

    // [S-03] Controller logic
    @UseGuards(RolesGuard)
    @Roles("admin")
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createSection(
        @GetCurrentUserId(ParseIntPipe) userId: number,
        @Body() createSectionDto: CreateSectionDto,
    ): Promise<SectionResponse> {
        const section = await this.sectionService.createSection(
            userId,
            createSectionDto,
        );

        return {
            message: "New section has been created.",
            section,
        };
    }

    // [S-04] Controller logic
    @UseGuards(RolesGuard)
    @Roles("admin")
    @Patch(":id/subject")
    @HttpCode(HttpStatus.OK)
    async updateSectionSubject(
        @Param("id", ParseIntPipe) sectionId: number,
        @Body() updateSectionSubjectDto: UpdateSectionSubjectDto,
    ): Promise<SectionResponse> {
        const section = await this.sectionService.updateSectionSubject(
            sectionId,
            updateSectionSubjectDto,
        );

        return {
            message: "Section subject has been updated.",
            section,
        };
    }

    // [S-05] Controller logic
    @UseGuards(RolesGuard)
    @Roles("admin")
    @Patch(":id/description")
    @HttpCode(HttpStatus.OK)
    async updateSectionDescription(
        @Param("id", ParseIntPipe) sectionId: number,
        @Body() updateSectionDescriptionDto: UpdateSectionDescriptionDto,
    ): Promise<SectionResponse> {
        const section = await this.sectionService.updateSectionDescription(
            sectionId,
            updateSectionDescriptionDto,
        );

        return {
            message: "Section description has been updated.",
            section,
        };
    }

    // [S-06] Controller logic
    @UseGuards(RolesGuard)
    @Roles("admin")
    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    async deleteSection(
        @Param("id", ParseIntPipe) sectionId: number,
    ): Promise<BaseResponse> {
        await this.sectionService.deleteSection(sectionId);

        return {
            message: "Section has been deleted.",
        };
    }
}
