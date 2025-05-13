import { ManifestMenuItem } from "@umbraco-cms/backoffice/menu";

export const manifests: Array<UmbExtensionManifest> = [
    {
        type: 'menuItem',
        kind: 'tree',
        alias: 'Umb.MenuItem.GodMode',
        name: 'God Mode Menu Item',
        weight: 100,
        meta: {
            label: 'God Mode',
            icon: 'icon-sience',
            entityType: 'godmode-root',
            treeAlias: 'Umb.Tree.GodMode',
            menus: ['Umb.Menu.AdvancedSettings'],
        }
    }
];