import { Request } from "express";

export interface UserData {
    id: string;
    username: string;
    email: string;
    birthdate: Date;
}
  
export interface UserRO {
    data: UserData;
}

export interface RequestWithUser extends Request {
    userInfo: UserData
}