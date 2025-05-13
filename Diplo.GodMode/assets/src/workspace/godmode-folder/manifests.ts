import { ManifestWorkspace } from '@umbraco-cms/backoffice/workspace';

const workspace: ManifestWorkspace = {
  type: 'workspace',
  alias: 'Umb.Workspace.GodModeFolder',
  name: 'GodMode Folder Workspace',
  element: () => import('./godmode-folder-workspace.element'),
  meta: {
    entityType: 'godmode-folder',
  },
};

export const manifests: Array<UmbExtensionManifest> = [workspace];
