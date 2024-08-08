import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { SectionRepository } from "./section.repository";
import { Section } from "./section.entity";
import { CreateSectionDto } from "./dto/create-section.dto";
import { UserRepository } from "../user/user.repository";

@Injectable()
export class SectionService {
    private logger = new Logger("SectionService");

    constructor(
        private readonly sectionRepository: SectionRepository,
        private readonly userRepository: UserRepository,
    ) {}

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

    // [S-03] Service logic
    async createSection(
        userId: number,
        createSectionDto: CreateSectionDto,
    ): Promise<Section> {
        const { subject, description } = createSectionDto;
        const creator = await this.userRepository.findUserById(userId);

        const section = await this.sectionRepository.createSection(
            creator,
            subject,
            description,
        );
        delete section.creator.password;
        delete section.creator.refreshToken;

        return section;
    }
}
