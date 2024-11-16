/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import createTemplateRouter from "./Template.router";
import createImageRouter from "./Image.router";
import createArticleRouter from "./Article.router";
import createDownloadRouter from "./Download.router";
import createUserRouter from "./User.router";
import createAccountRouter from "./Account.router";
import createSessionRouter from "./Session.router";
import { ClientType as TemplateClientType } from "./Template.router";
import { ClientType as ImageClientType } from "./Image.router";
import { ClientType as ArticleClientType } from "./Article.router";
import { ClientType as DownloadClientType } from "./Download.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as AccountClientType } from "./Account.router";
import { ClientType as SessionClientType } from "./Session.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        template: createTemplateRouter(router, procedure),
        image: createImageRouter(router, procedure),
        article: createArticleRouter(router, procedure),
        download: createDownloadRouter(router, procedure),
        user: createUserRouter(router, procedure),
        account: createAccountRouter(router, procedure),
        session: createSessionRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    template: TemplateClientType<AppRouter>;
    image: ImageClientType<AppRouter>;
    article: ArticleClientType<AppRouter>;
    download: DownloadClientType<AppRouter>;
    user: UserClientType<AppRouter>;
    account: AccountClientType<AppRouter>;
    session: SessionClientType<AppRouter>;
}
