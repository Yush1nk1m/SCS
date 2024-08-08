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

    async findAllSections(): Promise<Section[]> {
        return this.find({
            select: {
                id: true,
                subject: true,
                createdAt: true,
                creator: {
                    id: true,
                    nickname: true,
                },
            },
            relations: {
                creator: true,
            },
        });
    }

    async createSection(
        creator: User,
        subject: string,
        description: string,
    ): Promise<Section> {
        const section = this.create({ subject, description, creator });
        this.logger.verbose("created section:", section);
        await this.save(section);

        return section;
    }
}
