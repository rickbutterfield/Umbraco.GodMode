import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbApi } from "@umbraco-cms/backoffice/extension-api";
import { UmbTreeRepositoryBase } from "@umbraco-cms/backoffice/tree";
import { GodModeTreeItemModel, GodModeTreeRootModel } from "./types";
import { GOD_MODE_TREE_STORE_CONTEXT } from "./godmode-tree.store";
import { GodModeTreeDataSource } from "./godmode-tree.data-source";

export class GodModeTreeRepository
    extends UmbTreeRepositoryBase<GodModeTreeItemModel, GodModeTreeRootModel>
    implements UmbApi
{
    constructor(host: UmbControllerHost) {
        super(host, GodModeTreeDataSource, GOD_MODE_TREE_STORE_CONTEXT);
    }

    async requestTreeRoot() {
        const data: GodModeTreeRootModel = {
            unique: null,
            entityType: "godmode-root",
            name: "God Mode",
            icon: 'icon-sience',
            hasChildren: true,
            isFolder: false
        };

        return { data };
    }
}

export { GodModeTreeRepository as api };