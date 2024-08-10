import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Section } from "./section.entity";
import { User } from "../user/user.entity";

@Injectable()
export class SectionRepository extends Repository<Section> {
    private logger = new Logger("SectionRepository");

    constructor(private readonly dataSource: DataSource) {
        super(Section, dataSource.createEntityManager());
    }

    async findSectionById(id: number): Promise<Section> {
        return this.findOne({
            where: { id },
            relations: ["creator"],
            select: {
                id: true,
                subject: true,
                description: true,
                createdAt: true,
                creator: {
                    id: true,
                    nickname: true,
                },
            },
        });
    }

    async findAllSections(): Promise<Section[]> {
        return this.find({
            relations: ["creator"],
            select: {
                id: true,
                subject: true,
                description: true,
                createdAt: true,
                creator: {
                    id: true,
                    nickname: true,
                },
            },
        });
    }

    async createSection(
        creator: User,
        subject: string,
        description: string,
    ): Promise<Section> {
        const section = this.create({ subject, description, creator });
        await this.save(section);

        return section;
    }

    async updateSectionSubject(id: number, subject: string): Promise<Section> {
        const section = await this.findSectionById(id);
        if (!section) {
            throw new NotFoundException(`Section ${id} not found.`);
        }

        section.subject = subject;
        await this.save(section);

        return section;
    }

    async updateSectionDescription(
        id: number,
        description: string,
    ): Promise<Section> {
        const section = await this.findSectionById(id);
        if (!section) {
            throw new NotFoundException(`Section ${id} not found.`);
        }

        section.description = description;
        await this.save(section);

        return section;
    }

    async deleteSection(id: number): Promise<void> {
        await this.delete({ id });
    }
}
