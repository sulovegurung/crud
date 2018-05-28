import { Roles } from './role.interface';

export interface Account {
    uid: string;
    email: string;
    roles: Roles;
}