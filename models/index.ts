import { Sequelize, sequelize } from './sequelize';
import { User } from "./User";
import { Permission } from "./Permission";
import { Role } from "./Role";
import initDb from "../utils/initDb";

User.initModel(sequelize);
Permission.initModel(sequelize);
Role.initModel(sequelize);

User.associate();
Role.associate();
Permission.associate();

const extendUserModel = (relationFn: (userModel: typeof User) => void) => {
    relationFn(User);
};

const sync = (force = false, alter = false) => {
    sequelize.sync({ force, alter }).then(() => {
        force ? initDb(sequelize) : null;
    })
}

export { sequelize, Sequelize, User, Role, Permission, sync, extendUserModel };
