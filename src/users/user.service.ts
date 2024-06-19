import db from "../drizzle/db";
import { UsersTable } from "../drizzle/schema";
import { eq, gt, like } from "drizzle-orm";
import { iUserSchema, sUserSchema, returnIdObject } from "../drizzle/schema";

export const allUsersService = async (q?: string, limit?: number): Promise<sUserSchema[] | null> => {
    //apply search query and limit
    if(q && limit){
        return await db.query.UsersTable.findMany({
            where: like(UsersTable.fullName, `%${q}%`),
            limit: limit
        });
    }
    if(q){
        return await db.query.UsersTable.findMany({
            where: like(UsersTable.fullName, `%${q}%`)
        });
    }
    if(limit){
        return await db.query.UsersTable.findMany({
            limit: limit
        });
    }
    //return all users if no query or limit
    return await db.query.UsersTable.findMany();
}
export const getUserService = async (id: number):Promise<sUserSchema | undefined> => {
    return await db.query.UsersTable.findFirst({
        where: eq(UsersTable.id, id)
    });
}
export const createUserService = async (user: iUserSchema): Promise<returnIdObject[]> => {
    return await db.insert(UsersTable)
        .values({
            fullName: user.fullName,
            phone: user.phone,
            address: user.address,
            score: user.score
        }).returning({id: UsersTable.id});
}
export const  deleteUserService = async (id: number): Promise<returnIdObject[] | null> => {
    return await db.delete(UsersTable)
        .where(eq(UsersTable.id, id)).returning({id: UsersTable.id});
}