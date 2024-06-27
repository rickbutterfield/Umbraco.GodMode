import { ManifestTypes, ManifestWorkspaceView, ManifestWorkspaces } from '@umbraco-cms/backoffice/extension-registry';

const workspace: ManifestWorkspaces = {
	type: 'workspace',
	kind: 'routable',
	alias: 'Umb.Workspace.GodMode',
	name: 'God Mode Workspace',
	api: () => import('./godmode-workspace.context'),
	meta: {		
		entityType: 'godmode',
	},
};

const workspaceView: ManifestWorkspaceView = {
	type: 'workspaceView',
	alias: 'Umb.WorkspaceView.GodMode.View',
	name: 'God Mode Workspace View',
	element: () => import('./godmode-workspace-editor.element'),
	weight: 90,
	meta: {
		label: 'View',
		pathname: 'browse',
		icon: 'edit'
	},
	conditions: [
		{
			alias: 'Umb.Condition.WorkspaceAlias',
			match: workspace.alias
		}
	]
};

export const manifests: Array<ManifestTypes> = [
	workspace,
	workspaceView
];