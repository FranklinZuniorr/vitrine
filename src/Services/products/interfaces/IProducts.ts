import { ENUM_STATUS } from "../../../constants";

export interface IProduct {
    name: string;
    description?: string;
    photo: string;
    status: ENUM_STATUS;
    redirectLink: string;
    value: number;
    userId: string;
};