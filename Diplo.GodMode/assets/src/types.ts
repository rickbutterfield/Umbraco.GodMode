export type GodModeTreeItemPresentationModel = {
    hasChildren: boolean
    name: string
    path: string
    parent?: GodModeTreeItemPresentationModel | null
    isFolder: boolean,
    icon?: string
};

export type GodModePage = {
    name: string,
    url: string,
    description: string
}