import { UmbEntryPointOnInit } from '@umbraco-cms/backoffice/extension-api';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { OpenAPI } from './api/core/OpenAPI.ts';

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

    host.consumeContext(UMB_AUTH_CONTEXT, async (auth) => {
        if (!auth) return;

        const umbOpenApi = auth.getOpenApiConfiguration();
        OpenAPI.BASE = umbOpenApi.base;
        OpenAPI.TOKEN = umbOpenApi.token;
        OpenAPI.WITH_CREDENTIALS = umbOpenApi.withCredentials;
        OpenAPI.CREDENTIALS = umbOpenApi.credentials;
    });
};
