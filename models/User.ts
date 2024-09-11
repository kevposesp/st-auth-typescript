import { DataTypes, Model, Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/auth.config";
import { UserAttributes, UserCreationAttributes, UserProfile } from "../types/user"
import { Role } from "./Role"

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public name!: string;
  public email!: string;
  public address!: string;
  public phone!: string;
  public username!: string;
  public password!: string;
  public enableLog!: boolean;
  public status!: number;

  public static initModel(sequelize: Sequelize) {
    User.init(
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
        },
        email: {
          type: new DataTypes.STRING(128),
          allowNull: false,
          get() {
            return this.getDataValue('email');
          },
          set(value: string) {
            this.setDataValue('email', value);
          }
        },
        address: {
          type: new DataTypes.STRING(128),
          allowNull: true,
          get() {
            return this.getDataValue('address');
          },
          set(value: string) {
            this.setDataValue('address', value);
          }
        },
        phone: {
          type: new DataTypes.STRING(128),
          allowNull: true,
          get() {
            return this.getDataValue('phone');
          },
          set(value: string) {
            this.setDataValue('phone', value);
          }
        },
        username: {
          type: new DataTypes.STRING(128),
          allowNull: false,
          get() {
            return this.getDataValue('username');
          },
          set(value: string) {
            this.setDataValue('username', value);
          }
        },
        password: {
          type: new DataTypes.STRING(128),
          allowNull: false,
          get() {
            return this.getDataValue('password');
          },
          set(value: string) {
            const saltRounds = 10;
            const hashedPassword = bcrypt.hashSync(value, saltRounds);
            this.setDataValue('password', hashedPassword);
          }
        },
        enableLog: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true,
          get() {
            return this.getDataValue('enableLog');
          },
          set(value: boolean) {
            this.setDataValue('enableLog', value);
          }
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 1,
          get() {
            return this.getDataValue('status');
          },
          set(value: number) {
            this.setDataValue('status', value);
          }
        },
      },
      {
        sequelize,
        tableName: "users"
      }
    );
  }

  public static associate() {
    User.belongsToMany(Role, { through: 'user_roles', foreignKey: 'userId' });
  }

  public async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compareSync(password, this.get('password'));
  }

  public async generateJWT(): Promise<string> {
    return jwt.sign(
      {
        id: this.get('id'),
        username: this.get('username'),
        email: this.get('email'),
      },
      config.secret,
      {
        expiresIn: config.jwtExpiration,
      }
    );
  }

  public async toLoginResponse(): Promise<{ id: string, email: string, username: string, accessToken: string }> {
    return {
      id: this.get('id'),
      email: this.get('email'),
      username: this.get('username'),
      accessToken: await this.generateJWT()
    };
  }

  public async toResponse(): Promise<UserProfile> {
    return {
      id: this.get('id'),
      name: this.get('name'),
      email: this.get('email'),
      address: this.get('address'),
      phone: this.get('phone'),
      username: this.get('username'),
      enableLog: this.get('enableLog'),
      status: this.get('status')
    };
  }

  public async addUserRole(role: Role): Promise<void> {
    await (this as any).addRole(role);
  }

  public async removeUserRole(role: Role): Promise<void> {
    await (this as any).removeRole(role);
  }

  public async hasUserRole(role: Role): Promise<boolean> {
    return await (this as any).hasRole(role);
  }

  public async getUserRoles(): Promise<Role[]> {
    return await (this as any).getRoles();
  }

}