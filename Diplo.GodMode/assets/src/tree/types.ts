import type { UmbTreeItemModel, UmbTreeRootModel } from '@umbraco-cms/backoffice/tree';
import { GodModeTreeEntityType, GodModeTreeFolderEntityType, GodModeTreeRootEntityType } from '../entity';

export interface GodModeTreeItemModel extends UmbTreeItemModel {
	entityType: GodModeTreeEntityType | GodModeTreeFolderEntityType;
}

export interface GodModeTreeRootModel extends UmbTreeRootModel {
	entityType: GodModeTreeRootEntityType;
}
