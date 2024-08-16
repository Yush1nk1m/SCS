import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
    Type,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
    constructor(private readonly reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const handler = context.getHandler();
        const returnType = this.reflector.get<Type<any>>(
            "design:returntype",
            handler,
        );

        Logger.verbose("return type:", returnType);

        if (!returnType) {
            return next.handle();
        }

        return next.handle().pipe(
            map((data) => {
                return plainToInstance(returnType, data, {
                    excludeExtraneousValues: true,
                });
            }),
        );
    }
}
