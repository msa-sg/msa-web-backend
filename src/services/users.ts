import User, {UserDocument, UserInput} from 'db/users';
import { FilterQuery, Query, ProjectionType, QueryOptions } from 'mongoose';
import {DeleteResult} from 'mongodb';

export async function createUser(input: UserInput): Promise<UserDocument>{
    return User.create<UserInput>(input);
}

export async function findUser(
    query: FilterQuery<UserDocument>, 
    projection: ProjectionType<UserDocument> | null = null, 
    retrieveSensitive: boolean = false,
    options: QueryOptions = {lean: true}): Promise<UserDocument | null>{
    
        if(retrieveSensitive) return User.findOne(query, projection, options).select('+password +sessions');
        else return User.findOne(query, projection, options);
}

export async function findUserById(
    id: string, 
    projection: ProjectionType<UserDocument> | null = null, 
    retrieveSensitive: boolean = false,
    options: QueryOptions = {lean: true}): Promise<UserDocument | null>{
    
        return findUser({_id: id}, projection, retrieveSensitive, options);
}


export async function findUserByEmail(
    email: string, 
    projection: ProjectionType<UserDocument> | null = null, 
    retrieveSensitive: boolean = false,
    options: QueryOptions = {lean: true}): Promise<UserDocument | null>{
    
        return findUser({email: email}, projection, retrieveSensitive, options);
}

export async function verifyUser(
    targetUser: UserDocument | null,
    email: UserDocument["email"],
    password: UserDocument["password"]
): Promise<boolean> {
    if(targetUser === null) return false;
    return (targetUser.email === email) && targetUser.comparePassword(password);
}

export async function deleteUser(id: UserDocument["_id"]){
    const deleteStats: DeleteResult = await User.deleteOne({_id: id});
    if(!deleteStats.acknowledged || deleteStats.deletedCount != 1){
        throw new Error("User does not exist");
    }
}

export async function deleteAllUsers() {
    return User.deleteMany({});
}