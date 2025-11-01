import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbTreeChildrenOfRequestArgs, UmbTreeRootItemsRequestArgs, UmbTreeServerDataSourceBase } from "@umbraco-cms/backoffice/tree";
import { GodModeTreeItemModel } from "./types";
import { GOD_MODE_TREE_ENTITY_TYPE, GOD_MODE_TREE_FOLDER_ENTITY_TYPE, GOD_MODE_TREE_ROOT_ENTITY_TYPE } from "../entity";
import { GodModeTreeItemPresentationModel } from "../types";
import { UmbTargetPagedModel, UmbDataSourceResponse } from "@umbraco-cms/backoffice/repository";
import { tryExecute } from "@umbraco-cms/backoffice/resources";
import { GodModeService, GodModeConfig } from "../api";

let pages = [
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
];

let childPages = [
	{
		hasChildren: false,
		name: "Surface Controllers",
		path: "reflectionBrowser/surface",
		isFolder: false,
		icon: "icon-planet"
	},
	{
		hasChildren: false,
		name: "API Controllers",
		path: "reflectionBrowser/api",
		isFolder: false,
		icon: "icon-rocket"
	},
	{
		hasChildren: false,
		name: "Render Controllers",
		path: "reflectionBrowser/render",
		isFolder: false,
		icon: "icon-satellite-dish"
	},
	{
		hasChildren: false,
		name: "Content Models",
		path: "reflectionBrowser/models",
		isFolder: false,
		icon: "icon-binarycode"
	},
	{
		hasChildren: false,
		name: "Composers",
		path: "reflectionBrowser/composers",
		isFolder: false,
		icon: "icon-music"
	},
	{
		hasChildren: false,
		name: "Value Converters",
		path: "reflectionBrowser/converters",
		isFolder: false,
		icon: "icon-wand"
	},
	{
		hasChildren: false,
		name: "View Components",
		path: "reflectionBrowser/components",
		isFolder: false,
		icon: "icon-code"
	},
	{
		hasChildren: false,
		name: "Tag Helpers",
		path: "reflectionBrowser/taghelpers",
		isFolder: false,
		icon: "icon-tags"
	},
	{
		hasChildren: false,
		name: "Content Finders",
		path: "reflectionBrowser/finders",
		isFolder: false,
		icon: "icon-directions-alt"
	},
	{
		hasChildren: false,
		name: "URL Providers",
		path: "reflectionBrowser/urlproviders",
		isFolder: false,
		icon: "icon-link"
	},
	{
		hasChildren: false,
		name: "Interface Browser",
		path: "typeBrowser",
		isFolder: false,
		icon: "icon-molecular-network"
	}
]

export class GodModeTreeDataSource extends UmbTreeServerDataSourceBase<
	GodModeTreeItemPresentationModel,
	GodModeTreeItemModel
> {
	private config: GodModeConfig | undefined = undefined;

	constructor(host: UmbControllerHost) {
        super(host, {
            getRootItems,
            getChildrenOf,
            getAncestorsOf,
            mapper
		});

		this.#getConfig();
	}

	async #getConfig() {
		const { data } = await tryExecute(this, GodModeService.getConfig());
		this.config = data;

		if (this.config) {
			pages = pages.filter((page) => {
				const filtered = this.config?.featuresToHide?.includes(page.name) || this.config?.featuresToHide?.includes(page.path);
				return !filtered;
			})
		}
	}
}

const getRootItems = async (_args: UmbTreeRootItemsRequestArgs): Promise<UmbDataSourceResponse<UmbTargetPagedModel<GodModeTreeItemPresentationModel>>> => {
	return {
		data: {
			total: pages.length,
			items: pages
		}
	};
};

const getChildrenOf = async (args: UmbTreeChildrenOfRequestArgs): Promise<UmbDataSourceResponse<UmbTargetPagedModel<GodModeTreeItemPresentationModel>>> => {
	if (args.parent.unique === null) {
		return await getRootItems(args);
	}
	else {
		return {
			data: {
				total: childPages.length,
				items: childPages
			}
		};
	}
};

const getAncestorsOf = async () => {
	throw new Error("Ancestors is not available.");
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
