import { PrismaClient, User } from "@prisma/client";

type UserToCreate = {
    user: CreateUserInput;
}
type CreateUserInput = {
    name: string;
    password: string;
    email: string;
}

type UserToUpdate = {
    id: number;
    user: UpdateUserInput;
}

type UpdateUserInput = {
    name?: string;
    password?: string;
    email?: string;
}

const resolvers = {
    Query: {
        users: async (_parent: unknown, _args: unknown, context: PrismaClient) => {
            const res = await context.user.findMany({});
            return res;
        },
        user: async (_parent: unknown, args: User, context: PrismaClient) => {
            const { id } = args;
            const user = await context.user.findFirst({
                where: {
                    id: Number(id) 
                }
            });
            return user;
        }
    },
    Mutation: {
        createUser: async (_parent: unknown, args: UserToCreate, context: PrismaClient) => {
            const { name, password, email } = args.user;
            const newUser = await context.user.create({
                data: {
                    name: name,
                    password: password,
                    email: email
                }
            });
            return newUser;
        },
        updateUser: async (_parent: unknown, args: UserToUpdate, context: PrismaClient) => {
            const updatedUser = await context.user.update({
                where: {
                    id: Number(args.id)
                },
                data: args.user
            });
            return updatedUser;
        },
        deleteUser: async (_parent: unknown, args: {id: number}, context: PrismaClient) => {
            const { id } = args;
            const deletedUser = await context.user.delete({
                where: {
                    id: Number(id)
                }
            });
            return deletedUser;
        }
    }
}

export default resolvers;
