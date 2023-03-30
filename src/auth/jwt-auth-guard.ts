import {JwtService} from "@nestjs/jwt";
import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor(private jwtService:JwtService) {
    }


    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        try{
            const authHeader = request.headers.authorization;
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]

            if (bearer !== 'Bearer' || !token){
                throw new HttpException('Пользователь не авторизован!',HttpStatus.FORBIDDEN)
            }

            const passenger = this.jwtService.verify(token)
            request.passenger = passenger;
            return true;
        }catch (e) {
            throw new HttpException('Пользователь не авторизован!',HttpStatus.FORBIDDEN)
        }
    }
}