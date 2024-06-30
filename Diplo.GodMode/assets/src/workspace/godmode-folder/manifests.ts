import type { ManifestTypes, ManifestWorkspace } from '@umbraco-cms/backoffice/extension-registry';

const workspace: ManifestWorkspace = {
  type: 'workspace',
  alias: 'Umb.Workspace.GodModeFolder',
  name: 'GodMode Folder Workspace',
  element: () => import('./godmode-folder-workspace.element'),
  meta: {
    entityType: 'godmode-folder',
  },
};

export const manifests: Array<ManifestTypes> = [workspace];
