export default async function initDb(sequelize: any) {

    const { models } = sequelize;
    
    const { Role, Permission, User } = models;

    const st_auth_role = await Role.create({
        name: "st_admin"
    });

    const create_permission = await Permission.create({
        name: "createPermission"
    });

    const read_permission = await Permission.create({
        name: "readPermission"
    });

    const update_permission = await Permission.create({
        name: "updatePermission"
    });

    const delete_permission = await Permission.create({
        name: "deletePermission"
    });

    const create_role = await Permission.create({
        name: "createRole"
    });

    const read_role = await Permission.create({
        name: "readRole"
    });

    const update_role = await Permission.create({
        name: "updateRole"
    });

    const delete_role = await Permission.create({
        name: "deleteRole"
    });

    const addOrRemoveRole_permission = await Permission.create({
        name: "addOrRemoveRole"
    });

    const addOrRemovePermission_permission = await Permission.create({
        name: "addOrRemovePermission"
    });

    const st_auth = await User.create({
        username: "st_admin",
        email: "st_admin@stauth.com",
        password: "st_admin"
    });

    await st_auth.addRole(st_auth_role.get('id'));
    await st_auth_role.addPermissions([
        create_permission.get('id'),
        read_permission.get('id'),
        update_permission.get('id'),
        delete_permission.get('id'),
        create_role.get('id'),
        read_role.get('id'),
        update_role.get('id'),
        delete_role.get('id'),
        addOrRemoveRole_permission.get('id'),
        addOrRemovePermission_permission.get('id')
    ]);
}