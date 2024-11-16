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

        createMany: procedure.input($Schema.DownloadInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).download.createMany(input as any))),

        create: procedure.input($Schema.DownloadInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).download.create(input as any))),

        deleteMany: procedure.input($Schema.DownloadInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).download.deleteMany(input as any))),

        delete: procedure.input($Schema.DownloadInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).download.delete(input as any))),

        findFirst: procedure.input($Schema.DownloadInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).download.findFirst(input as any))),

        findMany: procedure.input($Schema.DownloadInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).download.findMany(input as any))),

        findUnique: procedure.input($Schema.DownloadInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).download.findUnique(input as any))),

        updateMany: procedure.input($Schema.DownloadInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).download.updateMany(input as any))),

        update: procedure.input($Schema.DownloadInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).download.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.DownloadCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DownloadCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DownloadCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DownloadCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.DownloadCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DownloadCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DownloadGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DownloadGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DownloadCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DownloadCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DownloadGetPayload<T>, Context>) => Promise<Prisma.DownloadGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.DownloadDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DownloadDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DownloadDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DownloadDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.DownloadDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DownloadDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DownloadGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DownloadGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DownloadDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DownloadDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DownloadGetPayload<T>, Context>) => Promise<Prisma.DownloadGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.DownloadFindFirstArgs, TData = Prisma.DownloadGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.DownloadFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.DownloadGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DownloadFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.DownloadFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.DownloadGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.DownloadGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.DownloadFindManyArgs, TData = Array<Prisma.DownloadGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.DownloadFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.DownloadGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DownloadFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.DownloadFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.DownloadGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.DownloadGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.DownloadFindUniqueArgs, TData = Prisma.DownloadGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.DownloadFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.DownloadGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DownloadFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.DownloadFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.DownloadGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.DownloadGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.DownloadUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DownloadUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DownloadUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DownloadUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.DownloadUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DownloadUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DownloadGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DownloadGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DownloadUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DownloadUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DownloadGetPayload<T>, Context>) => Promise<Prisma.DownloadGetPayload<T>>
            };

    };
}
