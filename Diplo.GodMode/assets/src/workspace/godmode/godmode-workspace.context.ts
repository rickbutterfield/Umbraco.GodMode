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
        path: 'edit/templateBrowser',
        component: () => import('./views/godmode-template-browser.element')
      },
      {
        path: 'edit/partialBrowser',
        component: () => import('./views/godmode-partial-browser.element')
      },
      {
        path: 'edit/dataTypeBrowser',
        component: () => import('./views/godmode-datatype-browser.element')
      },
      {
        path: 'edit/contentBrowser',
        component: () => import('./views/godmode-content-browser.element')
      },
      {
        path: 'edit/usageBrowser',
        component: () => import('./views/godmode-usage-browser.element')
      },
      {
        path: 'edit/mediaBrowser',
        component: () => import('./views/godmode-media-browser.element')
      },
      {
        path: 'edit/memberBrowser',
        component: () => import('./views/godmode-member-browser.element')
      },
      {
        path: 'edit/tagBrowser',
        component: () => import('./views/godmode-tag-browser.element')
      },
      {
        path: 'edit/serviceBrowser',
        component: () => import('./views/godmode-services-browser.element')
      },
      {
        path: 'edit/diagnosticBrowser',
        component: () => import('./views/godmode-diagnostic-browser.element')
      },
      {
        path: 'edit/utilityBrowser',
        component: () => import('./views/godmode-utility-browser.element')
      },
      {
        path: 'edit/reflectionBrowser/:unique',
        component: GodModeReflectionBrowserElement,
        setup: async (component, info) => {
          const unique = info.match.params.unique;
          (component as GodModeReflectionBrowserElement).type = unique;
        }
      },
      {
        path: 'edit/typeBrowser',
        component: () => import('./views/godmode-interface-browser.element')
      }
    ])
  }
}

export { GodModeWorkspaceContext as api };