import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    Param,
    ParseIntPipe,
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
        @GetCurrentUserId() id: number,
        @Body() createSectionDto: CreateSectionDto,
    ): Promise<SectionResponse> {
        const section = await this.sectionService.createSection(
            id,
            createSectionDto,
        );

        return {
            message: "New section has been created.",
            section,
        };
    }
}
