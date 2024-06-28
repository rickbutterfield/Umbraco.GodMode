import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbDefaultWorkspaceContext, UmbWorkspaceRouteManager } from "@umbraco-cms/backoffice/workspace";
import GodModeReflectionBrowserElement from "../../elements/godmode-reflection-browser.element";

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
            },
            {
                path: 'edit/diagnosticBrowser',
                component: () => import('./views/godmode-diagnostic-browser.element')
            },
            {
                path: 'edit/reflectionBrowser/:unique',
                component: GodModeReflectionBrowserElement,
                setup: async (component, info) => {
                    const unique = info.match.params.unique;
                    (component as GodModeReflectionBrowserElement).type = unique;
                }
            }
        ])
    }
}

export { GodModeWorkspaceContext as api };