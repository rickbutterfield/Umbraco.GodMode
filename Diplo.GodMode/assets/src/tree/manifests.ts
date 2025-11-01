import { GOD_MODE_TREE_ALIAS, GOD_MODE_TREE_REPOSITORY_ALIAS, GOD_MODE_TREE_STORE_ALIAS } from "../constants";
export { GodModeTreeDataSource } from './godmode-tree.data-source';
export { GOD_MODE_TREE_STORE_CONTEXT } from './godmode-tree.store';

export const manifests: Array<UmbExtensionManifest> = [
    {
        type: 'repository',
        alias: GOD_MODE_TREE_REPOSITORY_ALIAS,
        name: 'God Mode Tree Repository',
        api: () => import('./godmode-tree.repository'),
    },
    {
        type: 'tree',
        kind: 'default',
        alias: GOD_MODE_TREE_ALIAS,
        name: 'God Mode Tree',
        meta: {
            repositoryAlias: "Umb.Repository.GodMode.Tree",
        },
    },
	{
        type: 'treeItem',
        kind: 'default',
        alias: 'Umb.TreeItem.GodMode',
        name: 'God Mode Tree Item',
        forEntityTypes: ['godmode-root', 'godmode', 'godmode-folder'],
    }
];