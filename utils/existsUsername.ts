import { User } from "../models/User";

export default async function existsUsername(username: string): Promise<boolean> {

    let _user = await User.findOne({
        where: {
            username
        }
    });

    return _user ? true : false;

};