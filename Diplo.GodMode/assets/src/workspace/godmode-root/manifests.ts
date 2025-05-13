import { ManifestWorkspace } from '@umbraco-cms/backoffice/workspace';

const workspace: ManifestWorkspace = {
	type: 'workspace',
	alias: 'Umb.Workspace.GodModeRoot',
	name: 'GodMode Root Workspace',
	element: () => import('./godmode-root-workspace.element'),
	meta: {
		entityType: 'godmode-root',
	},
};

export const manifests: Array<UmbExtensionManifest> = [workspace];
