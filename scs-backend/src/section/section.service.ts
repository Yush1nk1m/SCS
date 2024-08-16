import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { SectionRepository } from "../repository/section.repository";
import { Section } from "./section.entity";
import { CreateSectionDto } from "./dto/create-section.dto";
import {
    UpdateSectionDescriptionDto,
    UpdateSectionSubjectDto,
} from "./dto/update-section.dto";
import { IsolationLevel, Transactional } from "typeorm-transactional";
import { UserRepository } from "../repository/user.repository";
import { QuestionRepository } from "../repository/question.repository";
import { Question } from "../question/question.entity";

@Injectable()
export class SectionService {
    private logger = new Logger("SectionService");

    constructor(
        private readonly sectionRepository: SectionRepository,
        private readonly userRepository: UserRepository,
        private readonly questionRepository: QuestionRepository,
    ) {}

    // [S-01] Service logic
    async getAllSections(
        sort: "subject" | "id",
        order: "ASC" | "DESC",
    ): Promise<Section[]> {
        // find all sections with no creator information
        return this.sectionRepository.findAndSortAllSections(sort, order);
    }

    // [S-02] Service logic
    async getSpecificSection(id: number): Promise<Section> {
        // find specific section with creator information
        const section = await this.sectionRepository.findSectionDetailById(id);

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
        return this.sectionRepository.findAndUpdateSectionSubject(
            sectionId,
            subject,
        );
    }

    // [S-05] Service logic
    @Transactional({
        isolationLevel: IsolationLevel.REPEATABLE_READ,
    })
    async updateSectionDescription(
        sectionId: number,
        updateSectionDescriptionDto: UpdateSectionDescriptionDto,
    ): Promise<Section> {
        const { description } = updateSectionDescriptionDto;

        // change found section's description and save
        return this.sectionRepository.findAndUpdateSectionDescription(
            sectionId,
            description,
        );
    }

    // [S-06] Service logic
    @Transactional({
        isolationLevel: IsolationLevel.REPEATABLE_READ,
    })
    async deleteSection(sectionId: number): Promise<void> {
        return this.sectionRepository.deleteSection(sectionId);
    }

    // [S-07] Service logic
    async getQuestionsBySection(
        sectionId: number,
        page: number = 1,
        limit: number = 10,
        sort: "createdAt" | "saved" = "createdAt",
        order: "ASC" | "DESC" = "DESC",
        search: string,
    ): Promise<[Question[], number]> {
        // find a section with the specified id from DB
        const section = await this.sectionRepository.findSectionById(sectionId);

        // if the section does not exist, it is an error
        if (!section) {
            throw new NotFoundException(
                `Section with id ${sectionId} has not been found.`,
            );
        }

        return this.questionRepository.findQuestionsBySectionId(
            sectionId,
            page,
            limit,
            sort,
            order,
            search,
        );
    }
}
