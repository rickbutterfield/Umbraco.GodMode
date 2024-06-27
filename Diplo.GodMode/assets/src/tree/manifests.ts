import { ManifestRepository, ManifestTree, ManifestTreeItem, ManifestTreeStore, ManifestTypes } from "@umbraco-cms/backoffice/extension-registry";
import { GOD_MODE_TREE_STORE_ALIAS, GOD_MODE_TREE_REPOSITORY_ALIAS } from "../constants";

const treeRepository: ManifestRepository = {
	type: 'repository',
	alias: GOD_MODE_TREE_REPOSITORY_ALIAS,
	name: 'God Mode Tree Repository',
	api: () => import('./godmode-tree.repository'),
};

const treeStore: ManifestTreeStore = {
	type: 'treeStore',
	alias: GOD_MODE_TREE_STORE_ALIAS,
	name: 'God Mode Tree Store',
	api: () => import('./godmode-tree.store'),
};

const tree: ManifestTree = {
	type: 'tree',
	kind: 'default',
	alias: "Umb.Tree.GodMode",
	name: 'God Mode Tree',
	meta: {
		repositoryAlias: "Umb.Repository.GodMode.Tree",
	}
};

const treeItem: ManifestTreeItem = {
	type: 'treeItem',
	kind: 'default',
	alias: 'Umb.TreeItem.GodMode',
	name: 'God Mode Tree Item',
	forEntityTypes: ['godmode-root', 'godmode', 'godmode-folder'],
};

export const manifests: Array<ManifestTypes> = [
	treeRepository,
	treeStore,
	tree,
	treeItem
];