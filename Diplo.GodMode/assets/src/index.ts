import { UmbEntryPointOnInit } from '@umbraco-cms/backoffice/extension-api';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { client } from './api/client.gen';

export { GOD_MODE_TREE_ALIAS, GOD_MODE_TREE_REPOSITORY_ALIAS, GOD_MODE_TREE_STORE_ALIAS } from './constants';
export * from './elements/godmode-header.element';
export * from './elements/godmode-reflection-browser.element';

import { manifests as workspaceManifests } from './workspace/manifests';
import { manifests as menuManifests } from './menu/manifests';
import { manifests as treeManifests } from './tree/manifests';

export const onInit: UmbEntryPointOnInit = (host, extensionRegistry) => {

    extensionRegistry.registerMany([
        ...workspaceManifests,
        ...menuManifests,
        ...treeManifests
    ]);

    host.consumeContext(UMB_AUTH_CONTEXT, async (authContext) => {
        if (!authContext) return;

        const config = authContext.getOpenApiConfiguration();

        client.setConfig({
            baseUrl: config.base,
            auth: async () => await authContext.getLatestToken(),
            credentials: config.credentials,
        });

        client.interceptors.request.use(async (request, _options) => {
            const token = await config.token();
            request.headers.set('Authorization', `Bearer ${token}`);
            return request;
        });
    });
};
