import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbDefaultWorkspaceContext, UmbWorkspaceRouteManager } from "@umbraco-cms/backoffice/workspace";

export class GodModeWorkspaceContext extends UmbDefaultWorkspaceContext {
    readonly routes = new UmbWorkspaceRouteManager(this);

    constructor(host: UmbControllerHost) {
        super(host);

        this.routes.setRoutes([
            {
                path: 'edit/docTypeBrowser',
                component: () => import('./views/godmode-doctype-browser.element')
            },
            {
                path: 'edit/utilityBrowser',
                component: () => import('./views/godmode-utility-browser.element')
            }
        ])
    }
}

export { GodModeWorkspaceContext as api };