import { Sequelize, DataTypes, Model } from 'sequelize';

import { RoleAttributes, RoleCreationAttributes } from "../types/role"
import { Permission } from './Permission';
import { User } from './User';

export class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
    public id!: string;
    public name!: string;

    public static initModel(sequelize: Sequelize) {
        Role.init(
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
                tableName: "roles"
            }
        );
    }

    public static associate() {
        Role.belongsToMany(Permission, { through: 'role_permissions', foreignKey: 'roleId' });
        Role.belongsToMany(User, { through: 'user_roles', foreignKey: 'roleId' });
    }

    public async addRolePermission(permission: Permission): Promise<void> {
        await (this as any).addPermission(permission);
    }

    public async removeRolePermission(permission: Permission): Promise<void> {
        await (this as any).removePermission(permission);
    }

    public async hasRolePermission(permission: Permission): Promise<boolean> {
        return await (this as any).hasPermission(permission);
    }
    
    public async getRolePermissions(): Promise<Permission[]> {
        return await (this as any).getPermissions();
    }
};
