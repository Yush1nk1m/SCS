import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { SectionRepository } from "./section.repository";
import { Section } from "./section.entity";
import { CreateSectionDto } from "./dto/create-section.dto";
import { UpdateSectionSubjectDto } from "./dto/update-section.dto";
import { IsolationLevel, Transactional } from "typeorm-transactional";
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
        // find all sections with no creator information
        return this.sectionRepository.findAllSections();
    }

    // [S-02] Service logic
    async getSpecificSection(id: number): Promise<Section> {
        // find specific section with creator information
        const section = await this.sectionRepository.findSectionById(id);

        // if it does not exist, it is an error
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

        // check again if user exists
        const creator = await this.userRepository.findUserById(userId);
        if (!creator) {
            throw new NotFoundException("User not found.");
        }

        // create new section
        const section = await this.sectionRepository.createSection(
            creator,
            subject,
            description,
        );

        return section;
    }

    // [S-04] Service logic
    @Transactional({
        isolationLevel: IsolationLevel.REPEATABLE_READ,
    })
    async updateSectionSubject(
        sectionId: number,
        updateSectionSubjectDto: UpdateSectionSubjectDto,
    ): Promise<Section> {
        const { subject } = updateSectionSubjectDto;

        // change found section's subject and save
        return this.sectionRepository.updateSectionSubject(sectionId, subject);
    }
}
