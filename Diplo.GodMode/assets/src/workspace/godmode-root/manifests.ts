import type { ManifestTypes, ManifestWorkspace } from '@umbraco-cms/backoffice/extension-registry';

const workspace: ManifestWorkspace = {
	type: 'workspace',
	alias: 'Umb.Workspace.GodModeRoot',
	name: 'GodMode Root Workspace',
	element: () => import('./godmode-root-workspace.element'),
	meta: {
		entityType: 'godmode-root',
	},
};

export const manifests: Array<ManifestTypes> = [workspace];
