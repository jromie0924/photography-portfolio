import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";

@Injectable()
export class FilterService {
    constructor(
        private authService: AuthService
    ) {
    }
}