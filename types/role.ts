import { Optional } from "sequelize";

export interface RoleAttributes {
  id: string;
  name: string;
}

export interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> { }