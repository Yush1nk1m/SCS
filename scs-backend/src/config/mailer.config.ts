import { MailerAsyncOptions } from "@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface";

export class mailerConfig implements MailerAsyncOptions {
    useFactory = () => ({
        transport: {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASS,
            },
        },
        defaults: {
            from: '"SCS" <studycomputerscienceadm1n@gmail.com>',
        },
    });
}
