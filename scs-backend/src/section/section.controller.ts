import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    Param,
    ParseIntPipe,
} from "@nestjs/common";
import { SectionService } from "./section.service";
import { Public } from "../common/decorator/public.decorator";
import { SectionResponse, SectionsResponse } from "./types/response.type";

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
}
