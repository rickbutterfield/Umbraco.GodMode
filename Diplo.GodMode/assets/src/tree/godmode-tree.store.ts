import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbUniqueTreeStore } from "@umbraco-cms/backoffice/tree";

export class GodModeTreeStore extends UmbUniqueTreeStore {
    constructor(host: UmbControllerHost) {
        super(host, GOD_MODE_TREE_STORE_CONTEXT.toString());
    }
}

export default GodModeTreeStore;

export const GOD_MODE_TREE_STORE_CONTEXT = new UmbContextToken<GodModeTreeStore>('GodModeTreeStore');