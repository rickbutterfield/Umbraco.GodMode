using Diplo.GodMode.Helpers;
using Diplo.GodMode.Models;
using Diplo.GodMode.Services;
using Diplo.GodMode.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Umbraco.Cms.Web.Common.Authorization;
using NPoco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.Configuration.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Web.Common.Controllers;
using Umbraco.Cms.Web.Website.Controllers;
using Umbraco.Extensions;
using Asp.Versioning;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Umbraco.Cms.Api.Management.Routing;
using Umbraco.Cms.Api.Management.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace Diplo.GodMode.Controllers
{
    /// <summary>
    /// API Controller for returning JSON to the GodMode views in /App_Plugins/
    /// </summary>
    [ApiVersion("1.0")]
    [VersionedApiBackOfficeRoute(GodModeConfig.ApiAlias)]
    [ApiExplorerSettings(GroupName = GodModeConfig.Name)]
    [Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
    public class GodModeApiController : ManagementApiControllerBase
    {
        private readonly IUmbracoDataService dataService;
        private readonly IUmbracoDatabaseService dataBaseService;
        private readonly IDiagnosticService diagnosticService;
        private readonly IUtilitiesService utilitiesService;
        private readonly IHostApplicationLifetime applicationLifetime;
        private readonly NuCacheSettings nuCacheSettings;
        private readonly RegisteredServiceCollection registeredServiceCollection;
        private readonly IOptions<GodModeConfig> godModeConfig;

        public GodModeApiController(IUmbracoDataService dataService, IUmbracoDatabaseService dataBaseService, IDiagnosticService diagnosticService, IUtilitiesService utilitiesService, IHostApplicationLifetime applicationLifetime, IOptions<NuCacheSettings> nuCacheSettings, RegisteredServiceCollection registeredServiceCollection, IOptions<GodModeConfig> godModeConfig)
        {
            this.dataService = dataService;
            this.dataBaseService = dataBaseService;
            this.diagnosticService = diagnosticService;
            this.utilitiesService = utilitiesService;
            this.applicationLifetime = applicationLifetime;
            this.nuCacheSettings = nuCacheSettings.Value;
            this.registeredServiceCollection = registeredServiceCollection;
            this.godModeConfig = godModeConfig;
        }

        /// <summary>
        /// Gets a mapping of content types (doc types)
        /// </summary>
        [HttpGet("GetContentTypeMap")]
        [ProducesResponseType(typeof(IEnumerable<ContentTypeMap>), 200)]
        public IEnumerable<ContentTypeMap> GetContentTypeMap()
        {
            return dataService.GetContentTypeMap();
        }

        /// <summary>
        /// Gets all property groups
        /// </summary>
        [HttpGet("GetPropertyGroups")]
        public IEnumerable<string> GetPropertyGroups()
        {
            return dataService.GetPropertyGroups();
        }

        /// <summary>
        /// Gets all compositions
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetCompositions")]
        public IEnumerable<ContentTypeData> GetCompositions()
        {
            return dataService.GetCompositions();
        }

        /// <summary>
        /// Gets all data types
        /// </summary>
        [HttpGet("GetDataTypes")]
        public IEnumerable<DataTypeMap> GetDataTypes()
        {
            return dataService.GetDataTypes();
        }

        /// <summary>
        /// Gets all property editors
        /// </summary>
        [HttpGet("GetPropertyEditors")]
        public IEnumerable<DataTypeMap> GetPropertyEditors()
        {
            return dataService.GetPropertyEditors();
        }

        /// <summary>
        /// Gets all data types, including the status of whether they are being used
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetDataTypesStatus")]
        public IEnumerable<DataTypeMap> GetDataTypesStatus()
        {
            return dataService.GetDataTypesStatus();
        }

        /// <summary>
        /// Gets all templates
        /// </summary>
        [HttpGet("GetTemplates")]
        public IEnumerable<TemplateModel> GetTemplates()
        {
            return dataService.GetTemplates();
        }

        /// <summary>
        /// Gets all media paged
        /// </summary>
        [HttpGet("GetMedia")]
        [ProducesResponseType(typeof(MediaMap), 200)]
        public Page<MediaMap> GetMedia(long page = 1, int pageSize = 3, string name = null, int? id = null, int? mediaTypeId = null, string orderBy = "Id", string orderByDir = "ASC")
        {
            return dataService.GetMediaPaged(page, pageSize, name, id, mediaTypeId, orderBy, orderByDir);
        }

        [HttpGet("GetMediaTypes")]
        public IEnumerable<ItemBase> GetMediaTypes()
        {
            return dataService.GetMediaTypes();
        }

        [HttpGet("GetLanguages")]
        public IEnumerable<Lang> GetLanguages()
        {
            return dataBaseService.GetLanguages();
        }

        /// <summary>
        /// Gets all content paged
        /// </summary>
        /// <param name="page">The current page</param>
        /// <param name="pageSize">The items per page</param>
        /// <param name="criteria"></param>
        [HttpGet("GetContentPaged")]
        public Page<ContentItem> GetContentPaged(long page = 1, long pageSize = 50, string name = null, string alias = null, int? creatorId = null, string id = null, int? level = null, bool? trashed = null, int? updaterId = null, int? languageId = null, string orderBy = "N.id")
        {
            var criteria = new ContentCriteria
            {
                Name = name,
                Alias = alias,
                CreatorId = creatorId,
                Id = id,
                Level = level,
                Trashed = trashed,
                UpdaterId = updaterId,
                LanguageId = languageId
            };

            return dataBaseService.GetContent(page, pageSize, criteria, orderBy);
        }

        /// <summary>
        /// Gets all content-type aliases
        /// </summary>
        [HttpGet("GetContentTypeAliases")]
        public IEnumerable<string> GetContentTypeAliases()
        {
            return dataBaseService.GetContentTypeAliases();
        }

        [HttpGet("GetStandardContentTypeAliases")]
        public IEnumerable<string> GetStandardContentTypeAliases()
        {
            return dataBaseService.GetContentTypeAliases(isElement: false);
        }

        /// <summary>
        /// Gets all Surface Controllers
        /// </summary>
        [HttpGet("GetSurfaceControllers")]
        public IEnumerable<TypeMap> GetSurfaceControllers()
        {
            var data = ReflectionHelper.GetTypeMapFrom(typeof(SurfaceController));
            return data;
        }

        /// <summary>
        /// Gets all API Controllers
        /// </summary>
        [HttpGet("GetApiControllers")]
        public IEnumerable<TypeMap> GetApiControllers()
        {
            return ReflectionHelper.GetTypeMapFrom(typeof(UmbracoApiControllerBase));
        }

        /// <summary>
        /// Gets all Render MVC Controllers
        /// </summary>
        [HttpGet("GetRenderMvcControllers")]
        public IEnumerable<TypeMap> GetRenderMvcControllers()
        {
            return ReflectionHelper.GetTypeMapFrom(typeof(IRenderController));
        }

        /// <summary>
        /// Gets all PublishedContent Models
        /// </summary>
        [HttpGet("GetPublishedContentModels")]
        public IEnumerable<TypeMap> GetPublishedContentModels()
        {
            return ReflectionHelper.GetTypeMapFrom(typeof(PublishedContentModel));
        }

        /// <summary>
        /// Gets all property value converters
        /// </summary>
        [HttpGet("GetPropertyValueConverters")]
        public IEnumerable<TypeMap> GetPropertyValueConverters()
        {
            return ReflectionHelper.GetTypeMapFrom(typeof(IPropertyValueConverter));
        }

        /// <summary>
        /// Gets all Composers
        /// </summary>
        [HttpGet("GetComposers")]
        public IEnumerable<TypeMap> GetComposers()
        {
            return ReflectionHelper.GetTypeMapFrom(typeof(IComposer));
        }

        /// <summary>
        /// Gets all View Components
        /// </summary>
        [HttpGet("GetViewComponents")]
        public IEnumerable<TypeMap> GetViewComponents()
        {
            return ReflectionHelper.GetTypeMapFrom(typeof(ViewComponent));
        }

        /// <summary>
        /// Gets all Content Finders
        /// </summary>
        [HttpGet("GetContentFinders")]
        public IEnumerable<TypeMap> GetContentFinders()
        {
            return ReflectionHelper.GetTypeMapFrom(typeof(IContentFinder));
        }

        /// <summary>
        /// Gets all URL Providers
        /// </summary>
        [HttpGet("GetUrlProviders")]
        public IEnumerable<TypeMap> GetUrlProviders()
        {
            return ReflectionHelper.GetTypeMapFrom(typeof(IUrlProvider));
        }

        /// <summary>
        /// Gets all Tag Helpers
        /// </summary>
        [HttpGet("GetTagHelpers")]
        public IEnumerable<TypeMap> GetTagHelpers()
        {
            return ReflectionHelper.GetTypeMapFrom(typeof(ITagHelper)).Where(x => !x.Name.StartsWith("__Generated"));
        }

        /// <summary>
        /// Gets registered services
        /// </summary>
        [HttpGet("GetRegisteredServices")]
        public IEnumerable<RegisteredService> GetRegisteredServices()
        {
            return this.registeredServiceCollection.Services.Value;
        }

        /// <summary>
        /// Gets a type mapping of types assignable from a type passed as a string
        /// </summary>
        [HttpGet("GetTypesAssignableFrom")]
        public IEnumerable<TypeMap> GetTypesAssignableFrom(string baseType)
        {
            return ReflectionHelper.GetTypeMapFrom(Type.GetType(baseType));
        }

        /// <summary>
        /// Gets diagnostics and settings info
        /// </summary>
        [HttpGet("GetEnvironmentDiagnostics")]
        public IEnumerable<DiagnosticGroup> GetEnvironmentDiagnostics()
        {
            return diagnosticService.GetDiagnosticGroups();
        }

        /// <summary>
        /// Get all assemblies that seem to be Umbraco assemblies
        /// </summary>
        [HttpGet("GetUmbracoAssemblies")]
        public IEnumerable<NameValue> GetUmbracoAssemblies()
        {
            return ReflectionHelper.GetUmbracoAssemblies().Select(a => new NameValue(a.GetName().Name, a.FullName)).OrderBy(x => x.Name);
        }

        /// <summary>
        /// Get all assemblies that aren't Microsoft ones
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetNonMsAssemblies")]
        public IEnumerable<NameValue> GetNonMsAssemblies()
        {
            return ReflectionHelper.GetAssemblies().Where(a => !a.IsDynamic && !a.FullName.StartsWith("Microsoft.") && !a.FullName.StartsWith("System")).Select(a => new NameValue(a.GetName().Name, a.FullName)).OrderBy(x => x.Name);
        }

        /// <summary>
        /// Get all assemblies
        /// </summary>
        [HttpGet("GetAssemblies")]
        public IEnumerable<NameValue> GetAssemblies()
        {
            return ReflectionHelper.GetAssemblies(a => !a.IsDynamic).Select(a => new NameValue(a.GetName().Name, a.FullName)).OrderBy(x => x.Name);
        }

        /// <summary>
        /// Get all assemblies that contain at least one interface
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetAssembliesWithInterfaces")]
        public IEnumerable<NameValue> GetAssembliesWithInterfaces()
        {
            return ReflectionHelper.GetAssemblies(a => !a.IsDynamic && a.GetLoadableTypes().Any(t => t.IsInterface && !t.IsGenericTypeDefinition && t.IsPublic)).Select(a => new NameValue(a.GetName().Name, a.FullName)).OrderBy(x => x.Name);
        }

        /// <summary>
        /// Get all interfaces from a named assembly
        /// </summary>
        /// <param name="assembly">The qualified assmebly name</param>
        [HttpGet("GetInterfacesFrom")]
        public IEnumerable<TypeMap> GetInterfacesFrom(string assembly)
        {
            return ReflectionHelper.GetNonGenericInterfaces(Assembly.Load(assembly)).OrderBy(i => i.Name) ?? Enumerable.Empty<TypeMap>();
        }

        /// <summary>
        /// Gets all types from a name assembly
        /// </summary>
        /// <param name="assembly">The qualified assmebly name</param>
        [HttpGet("GetTypesFrom")]
        public IEnumerable<TypeMap> GetTypesFrom(string assembly)
        {
            return ReflectionHelper.GetNonGenericTypes(Assembly.Load(assembly)).OrderBy(i => i.Name) ?? Enumerable.Empty<TypeMap>();
        }

        /// <summary>
        /// Gets the URL of a single page for each unique template on the site
        /// </summary>
        /// <returns>A list of URLs</returns>
        [HttpGet("GetTemplateUrlsToPing")]
        public IEnumerable<string> GetTemplateUrlsToPing()
        {
            return dataBaseService.GetTemplateUrlsToPing();
        }

        /// <summary>
        /// Gets all site URLs for a given culture
        /// </summary>
        /// <returns>A list of URLs</returns>
        [HttpGet("GetUrlsToPing")]
        public IEnumerable<string> GetUrlsToPing(string culture)
        {
            return utilitiesService.GetAllUrls(culture);
        }

        /// <summary>
        /// Gets the GodMode configuration
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetConfig")]
        public GodModeConfig GetConfig()
        {
            return godModeConfig.Value;
        }

        /// <summary>
        /// Attemps to fix template masters
        /// </summary>
        /// <returns>A count</returns>
        [HttpPost("FixTemplateMasters")]
        [ProducesResponseType(typeof(int), 200)]
        public int FixTemplateMasters()
        {
            return dataService.FixTemplateMasters();
        }

        /// <summary>
        /// Gets a list of content types and a count of their usage
        /// </summary>
        /// <param name="id">Optional Id of the content type to filter by</param>
        /// <param name="orderBy">Optional order by parameter</param>
        /// <returns>A list of content usage</returns>
        [HttpGet("GetContentUsageData")]
        public IEnumerable<UsageModel> GetContentUsageData(int? id = null, string orderBy = null)
        {
            return dataBaseService.GetContentUsageData(id, orderBy);
        }

        /// <summary>
        /// Gets all tags and the content tagged by the tag
        /// </summary>
        /// <returns>A dictionary of tagliciousness</returns>
        [HttpGet("GetTagMapping")]
        public IEnumerable<TagMapping> GetTagMapping()
        {
            return dataService.GetTagMapping();
        }

        /// <summary>
        /// Clears the internal Umbraco cache's
        /// </summary>
        /// <param name="cache">The cache name to clear</param>
        [HttpPost("ClearUmbracoCache")]
        [ProducesResponseType(typeof(ServerResponse), 200)]
        public ServerResponse ClearUmbracoCache(string cache)
        {
            return utilitiesService.ClearUmbracoCacheFor(cache);
        }

        /// <summary>
        /// Clears the Media Cache
        /// </summary>
        [HttpPost("PurgeMediaCache")]
        [ProducesResponseType(typeof(ServerResponse), 200)]
        public async Task<ServerResponse> PurgeMediaCache()
        {
            return await utilitiesService.ClearMediaFileCacheAsync();
        }

        /// <summary>
        /// Restarts the application
        /// </summary>
        [HttpPost("RestartAppPool")]
        [ProducesResponseType(typeof(ServerResponse), 200)]
        public ServerResponse RestartAppPool()
        {
            try
            {
                applicationLifetime?.StopApplication();

                return new ServerResponse("Restarting the application - hold tight...", ServerResponseType.Success);
            }
            catch (Exception ex)
            {
                return new ServerResponse("Error restarting the application: " + ex.Message, ServerResponseType.Error);
            }
        }

        [HttpGet("GetMembersPaged")]
        [ProducesResponseType(typeof(MemberModel), 200)]
        public Page<MemberModel> GetMembersPaged(long page = 1, long pageSize = 50, int? groupId = null, string search = null, string orderBy = "MN.text")
        {
            return this.dataBaseService.GetMembers(page, pageSize, groupId, search, orderBy);
        }

        [HttpGet("GetMemberGroups")]
        public IEnumerable<MemberGroupModel> GetMemberGroups()
        {
            return this.dataBaseService.GetMemberGroups();
        }

        [HttpGet("GetNuCacheItem")]
        public NuCacheItem GetNuCacheItem(int id)
        {
            return this.dataBaseService.GetNuCacheItem(id);
        }

        [HttpGet("GetNuCacheType")]
        public string GetNuCacheType()
        {
            return this.nuCacheSettings.NuCacheSerializerType.ToString();
        }

        [HttpPost("DeleteTag")]
        [ProducesResponseType(typeof(ServerResponse), 200)]
        public bool DeleteTag(int id)
        {
            return this.dataBaseService.DeleteTag(id);
        }

        [HttpGet("GetOrphanedTags")]
        public List<Models.Tag> GetOrphanedTags()
        {
            return this.dataBaseService.GetOrphanedTags();
        }

        [HttpPost("CopyDataType")]
        [ProducesResponseType(typeof(ServerResponse), 200)]
        public ServerResponse CopyDataType(int id)
        {
            return this.dataService.CopyDataType(id);
        }

    }
}