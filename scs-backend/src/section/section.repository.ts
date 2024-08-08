import { Injectable, Logger } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Section } from "./section.entity";

@Injectable()
export class SectionRepository extends Repository<Section> {
    private logger = new Logger("SectionRepository");

    constructor(private readonly dataSource: DataSource) {
        super(Section, dataSource.createEntityManager());
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
}
