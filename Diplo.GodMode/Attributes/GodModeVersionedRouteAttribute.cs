using Umbraco.Cms.Web.Common.Routing;

namespace Diplo.GodMode.Attributes
{
    public class GodModeVersionedRouteAttribute : BackOfficeRouteAttribute
    {
        public GodModeVersionedRouteAttribute(string template)
            : base($"/god-mode/api/v{{version:apiVersion}}/{template.TrimStart('/')}")
        { }
    }
}
