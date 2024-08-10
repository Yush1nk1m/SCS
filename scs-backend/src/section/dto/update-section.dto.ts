import { IsNotEmpty, IsString } from "class-validator";

export class UpdateSectionSubjectDto {
    @IsString()
    @IsNotEmpty()
    subject: string;
}

export class UpdateSectionDescriptionDto {
    @IsString()
    description: string;
}
