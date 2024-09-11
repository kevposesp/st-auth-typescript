import { Optional } from "sequelize";

export interface UserAttributes {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  username: string;
  password: string;
  enableLog: boolean;
  status: number;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  username: string;
  enableLog: boolean;
  status: number;
}