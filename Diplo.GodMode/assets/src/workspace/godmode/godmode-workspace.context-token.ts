import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UmbWorkspaceContext } from "@umbraco-cms/backoffice/workspace";
import { GodModeWorkspaceContext } from "./godmode-workspace.context";

export const GODMODE_WORKSPACE_CONTEXT = new UmbContextToken<
    UmbWorkspaceContext,
    GodModeWorkspaceContext
>(
    "UmbWorkspaceContext",
    undefined,
    (context): context is GodModeWorkspaceContext =>
        context.getEntityType?.() === "godmode"
)