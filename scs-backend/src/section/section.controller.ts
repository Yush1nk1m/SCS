import { Controller, Get, HttpCode, HttpStatus, Logger } from "@nestjs/common";
import { SectionService } from "./section.service";
import { Public } from "../common/decorator/public.decorator";
import { SectionsResponse } from "./types/response.type";

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
}
