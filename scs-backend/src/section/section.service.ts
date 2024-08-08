import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { SectionRepository } from "./section.repository";
import { Section } from "./section.entity";

@Injectable()
export class SectionService {
    private logger = new Logger("SectionService");

    constructor(private readonly sectionRepository: SectionRepository) {}

    // [S-01] Service logic
    async getAllSections(): Promise<Section[]> {
        return this.sectionRepository.findAllSections();
    }

    // [S-02] Service logic
    async getSpecificSection(id: number): Promise<Section> {
        const section = await this.sectionRepository.findSectionById(id);
        if (!section) {
            throw new NotFoundException(
                `Section with id: ${id} has not been found.`,
            );
        }

        return section;
    }
}
