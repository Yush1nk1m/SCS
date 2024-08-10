import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    Param,
    ParseIntPipe,
    Patch,
    Post,
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

@Controller("v1/sections")
export class SectionController {
    private logger = new Logger("SectionController");
    constructor(private readonly sectionService: SectionService) {}

    // [S-01] Controller logic
    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllSections(): Promise<SectionsResponse> {
        const sections = await this.sectionService.getAllSections();

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

    // [U-06] Controller logic
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
}
