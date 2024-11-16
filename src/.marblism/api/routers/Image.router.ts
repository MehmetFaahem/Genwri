/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.ImageInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).image.createMany(input as any))),

        create: procedure.input($Schema.ImageInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).image.create(input as any))),

        deleteMany: procedure.input($Schema.ImageInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).image.deleteMany(input as any))),

        delete: procedure.input($Schema.ImageInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).image.delete(input as any))),

        findFirst: procedure.input($Schema.ImageInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).image.findFirst(input as any))),

        findMany: procedure.input($Schema.ImageInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).image.findMany(input as any))),

        findUnique: procedure.input($Schema.ImageInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).image.findUnique(input as any))),

        updateMany: procedure.input($Schema.ImageInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).image.updateMany(input as any))),

        update: procedure.input($Schema.ImageInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).image.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.ImageCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ImageCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ImageCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ImageCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.ImageCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ImageCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ImageGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ImageGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ImageCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ImageCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ImageGetPayload<T>, Context>) => Promise<Prisma.ImageGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.ImageDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ImageDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ImageDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ImageDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.ImageDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ImageDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ImageGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ImageGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ImageDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ImageDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ImageGetPayload<T>, Context>) => Promise<Prisma.ImageGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.ImageFindFirstArgs, TData = Prisma.ImageGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ImageFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ImageGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ImageFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ImageFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ImageGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ImageGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.ImageFindManyArgs, TData = Array<Prisma.ImageGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.ImageFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.ImageGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ImageFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ImageFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.ImageGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.ImageGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.ImageFindUniqueArgs, TData = Prisma.ImageGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ImageFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ImageGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ImageFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ImageFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ImageGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ImageGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.ImageUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ImageUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ImageUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ImageUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.ImageUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ImageUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ImageGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ImageGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ImageUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ImageUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ImageGetPayload<T>, Context>) => Promise<Prisma.ImageGetPayload<T>>
            };

    };
}
