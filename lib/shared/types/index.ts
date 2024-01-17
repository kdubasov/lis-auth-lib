export interface IUser {
   uuid: string;
   email: string;
   is_active: boolean;
   is_superuser: boolean;
   is_verified: boolean;
   login: string;
   name: null | string;
   surname: null | string;
   roles: IUserRole[];
}

export interface IUserRole {
   name: ERoleNames;
   uuid: string;
}

export enum ERoleNames {
   ADMIN = 'admin',
   TECH = 'Технолог',
   INJENER = 'Инженер',
   USER = 'Пользователь',
}