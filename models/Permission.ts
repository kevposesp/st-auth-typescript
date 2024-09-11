import { Sequelize, DataTypes, Model } from 'sequelize';

import { PermissionAttributes, PermissionCreationAttributes } from "../types/permission";
import { Role } from './Role';

export class Permission extends Model<PermissionAttributes, PermissionCreationAttributes> implements PermissionAttributes {
    public id!: string;
    public name!: string;

    public static initModel(sequelize: Sequelize) {
        Permission.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                name: {
                    type: new DataTypes.STRING(128),
                    allowNull: true,
                    get() {
                        return this.getDataValue('name');
                    },
                    set(value: string) {
                        this.setDataValue('name', value);
                    }
                }
            },
            {
                sequelize,
                tableName: "permissions"
            }
        );
    }

    public static associate() {
        Permission.belongsToMany(Role, { through: 'role_permissions', foreignKey: 'permissionId' });
    }
};
