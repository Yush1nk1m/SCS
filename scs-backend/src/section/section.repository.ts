import { Injectable, Logger } from "@nestjs/common";
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
        return this.findOne({ where: { id } });
    }

    async findSectionAndUserById(id: number): Promise<Section> {
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
        return this.find();
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
}
