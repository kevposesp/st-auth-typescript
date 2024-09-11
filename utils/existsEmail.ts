import { User } from "../models/User";

export default async function existsEmail(email: string): Promise<boolean> {

    let _user = await User.findOne({
        where: {
            email
        }
    });

    return _user ? true : false;

};