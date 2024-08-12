import { Injectable } from "@nestjs/common";

@Injectable()
export class ActionService {
    // extract image URLs from markdown text
    private extractImageUrls(content: string): string[] {
        const regex = /!\[.*?\]\((https:\/\/.*\.s3\.amazonaws\.com\/.*?)\)/g;
        const matches = content.matchAll(regex);
        return Array.from(matches, (m) => m[1]);
    }
}
