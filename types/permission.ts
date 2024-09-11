import { Optional } from "sequelize";

export interface PermissionAttributes {
  id: string;
  name: string;
}

export interface PermissionCreationAttributes extends Optional<PermissionAttributes, 'id'> { }