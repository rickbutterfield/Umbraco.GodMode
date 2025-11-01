using Diplo.GodMode.Attributes;
using Microsoft.AspNetCore.Authorization;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Api.Management.Controllers;
using Umbraco.Cms.Web.Common.Authorization;

namespace Diplo.GodMode.Controllers
{
    [Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
    [GodModeVersionedRoute("")]
    [MapToApi("god-mode")]
    public class GodModeApiControllerBase : ManagementApiControllerBase { }
}
