import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbTreeAncestorsOfRequestArgs, UmbTreeChildrenOfRequestArgs, UmbTreeRootItemsRequestArgs, UmbTreeServerDataSourceBase } from "@umbraco-cms/backoffice/tree";
import { GodModeTreeItemModel } from "./types";
import { GOD_MODE_TREE_ENTITY_TYPE, GOD_MODE_TREE_FOLDER_ENTITY_TYPE, GOD_MODE_TREE_ROOT_ENTITY_TYPE } from "../entity";
import { GodModeTreeItemPresentationModel } from "../types";
import { UmbPagedModel } from "@umbraco-cms/backoffice/repository";

export class GodModeTreeDataSource extends UmbTreeServerDataSourceBase<GodModeTreeItemPresentationModel, GodModeTreeItemModel> {
    constructor(host: UmbControllerHost) {
        super(host, {
            getRootItems,
            getChildrenOf,
            getAncestorsOf,
            mapper
		});
    }
}

const getRootItems = async (_args: UmbTreeRootItemsRequestArgs) => {
	// eslint-disable-next-line local-rules/no-direct-api-import
	let pages: UmbPagedModel<GodModeTreeItemPresentationModel> = {
		total: 13,
		items: [
			{
				hasChildren: false,
				path: 'docTypeBrowser',
				name: 'DocType Browser',
				icon: 'icon-item-arrangement',
				parent: null,
				isFolder: false
			},
			{
				hasChildren: false,
				path: 'templateBrowser',
				name: 'Template Browser',
				icon: 'icon-newspaper-alt',
				parent: null,
				isFolder: false
			},
			{
				hasChildren: false,
				path: 'partialBrowser',
				name: 'Partial Browser',
				icon: 'icon-article',
				parent: null,
				isFolder: false
			},
			{
				hasChildren: false,
				path: 'dataTypeBrowser',
				name: 'DataType Browser',
				icon: 'icon-autofill',
				parent: null,
				isFolder: false
			},
			{
				hasChildren: false,
				path: 'contentBrowser',
				name: 'Content Browser',
				icon: 'icon-umb-content',
				parent: null,
				isFolder: false
			},
			{
				hasChildren: false,
				path: 'usageBrowser',
				name: 'Usage Browser',
				icon: 'icon-chart-curve',
				parent: null,
				isFolder: false
			},
			{
				hasChildren: false,
				path: 'mediaBrowser',
				name: 'Media Browser',
				icon: 'icon-picture',
				parent: null,
				isFolder: false
			},
			{
				hasChildren: false,
				path: 'memberBrowser',
				name: 'Member Browser',
				icon: 'icon-umb-members',
				parent: null,
				isFolder: false
			},
			{
				hasChildren: false,
				path: 'tagBrowser',
				name: 'Tag Browser',
				icon: 'icon-tags',
				parent: null,
				isFolder: false
			},
			{
				hasChildren: true,
				path: 'types',
				name: 'Types',
				parent: null,
				isFolder: true
			},
			{
				hasChildren: false,
				path: 'serviceBrowser',
				name: 'Services',
				icon: 'icon-console',
				parent: null,
				isFolder: false
			},
			{
				hasChildren: false,
				path: 'diagnosticBrowser',
				name: 'Diagnostics',
				icon: 'icon-settings',
				parent: null,
				isFolder: false
			},
			{
				hasChildren: false,
				path: 'utilityBrowser',
				name: 'Utilities',
				icon: 'icon-wrench',
				parent: null,
				isFolder: false
			}
		]
	};

	return pages;
};

const getChildrenOf = async (args: UmbTreeChildrenOfRequestArgs) => {
	if (args.parent.unique === null) {
		return await getRootItems(args);
	}
	else {
		const data: UmbPagedModel<GodModeTreeItemPresentationModel> = {
			total: 0,
			items: [
				{
					hasChildren: false,
					name: "Surface Controllers",
					path: "surface",
					isFolder: false,
					icon: "icon-planet"
				},
				{
					hasChildren: false,
					name: "API Controllers",
					path: "api",
					isFolder: false,
					icon: "icon-rocket"
				},
				{
					hasChildren: false,
					name: "Render Controllers",
					path: "render",
					isFolder: false,
					icon: "icon-satellite-dish"
				},
				{
					hasChildren: false,
					name: "Content Models",
					path: "models",
					isFolder: false,
					icon: "icon-binarycode"
				},
				{
					hasChildren: false,
					name: "Composers",
					path: "composers",
					isFolder: false,
					icon: "icon-music"
				},
				{
					hasChildren: false,
					name: "Value Converters",
					path: "converters",
					isFolder: false,
					icon: "icon-wand"
				},
				{
					hasChildren: false,
					name: "View Components",
					path: "components",
					isFolder: false,
					icon: "icon-code"
				},
				{
					hasChildren: false,
					name: "Tag Helpers",
					path: "taghelpers",
					isFolder: false,
					icon: "icon-tags"
				},
				{
					hasChildren: false,
					name: "Content Finders",
					path: "finders",
					isFolder: false,
					icon: "icon-directions-alt"
				},
				{
					hasChildren: false,
					name: "URL Providers",
					path: "urlproviders",
					isFolder: false,
					icon: "icon-link"
				},
				{
					hasChildren: false,
					name: "Interface Browser",
					path: "browse",
					isFolder: false,
					icon: "icon-molecular-network"
				}
			]
		};
		return data;
	}
};

const getAncestorsOf = async (_args: UmbTreeAncestorsOfRequestArgs) => {
	const data: GodModeTreeItemPresentationModel[] = [];
	return data;
}

const mapper = (item: GodModeTreeItemPresentationModel): GodModeTreeItemModel => {
	return {
		unique: item.path,
		parent: {
			unique: item.parent ? item.parent.path : null,
			entityType: item.parent ? GOD_MODE_TREE_ENTITY_TYPE : GOD_MODE_TREE_ROOT_ENTITY_TYPE,
		},
		name: item.name,
		icon: item.icon,
		entityType: item.isFolder ? GOD_MODE_TREE_FOLDER_ENTITY_TYPE : GOD_MODE_TREE_ENTITY_TYPE,
		isFolder: item.isFolder,
		hasChildren: item.hasChildren
	};
};
