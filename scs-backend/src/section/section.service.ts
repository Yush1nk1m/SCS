import { Injectable, Logger } from "@nestjs/common";
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
}
