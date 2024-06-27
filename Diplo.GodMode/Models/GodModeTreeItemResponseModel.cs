using Umbraco.Cms.Api.Management.ViewModels.Tree;

namespace Diplo.GodMode.Models
{
    public class GodModeTreeItemResponseModel : FolderTreeItemResponseModel
    {
        public string? EditorUiAlias { get; set; } = string.Empty;

        public string Icon { get; set; } = string.Empty;
    }
}
