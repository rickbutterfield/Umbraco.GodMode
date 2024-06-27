import type { ManifestTypes } from '@umbraco-cms/backoffice/extension-registry';

export const manifests: Array<ManifestTypes> = [
    {
        type: 'menuItem',
        kind: 'tree',
        alias: 'Umb.MenuItem.GodMode',
        name: 'God Mode Menu Item',
        weight: 100,
        meta: {
            label: 'God Mode',
            icon: 'icon-sience',
            entityType: 'godmode',
            treeAlias: 'Umb.Tree.GodMode',
            menus: ['Umb.Menu.AdvancedSettings'],
        }
    }
];