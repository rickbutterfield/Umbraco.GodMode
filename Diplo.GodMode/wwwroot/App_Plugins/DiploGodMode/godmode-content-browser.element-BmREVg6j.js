import { UmbElementMixin as S } from "@umbraco-cms/backoffice/element-api";
import { LitElement as N, html as o, css as x, state as n, customElement as G } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute as p } from "@umbraco-cms/backoffice/resources";
import { G as m, s as M } from "./index-Car7Rj8s.js";
import { DirectionModel as f } from "@umbraco-cms/backoffice/external/backend-api";
var E = Object.defineProperty, T = Object.getOwnPropertyDescriptor, b = (t) => {
  throw TypeError(t);
}, l = (t, e, u, h) => {
  for (var c = h > 1 ? void 0 : h ? T(e, u) : e, d = t.length - 1, g; d >= 0; d--)
    (g = t[d]) && (c = (h ? g(e, u, c) : g(c)) || c);
  return h && c && E(e, u, c), c;
}, U = (t, e, u) => e.has(t) || b("Cannot " + u), k = (t, e, u) => e.has(t) ? b("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, u), i = (t, e, u) => (U(t, e, "access private method"), u), a, y, _, r, v, $, P, w, I, A, C, L, D;
let s = class extends S(N) {
  constructor() {
    super(), k(this, a), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "Name",
        alias: "name",
        allowSorting: !0,
        width: "20%"
      },
      {
        name: "Alias",
        alias: "alias",
        allowSorting: !0,
        width: "12%"
      },
      {
        name: "Create Date",
        alias: "createDate",
        allowSorting: !0,
        width: "12%"
      },
      {
        name: "Creator",
        alias: "creatorName",
        allowSorting: !0,
        width: "10%"
      },
      {
        name: "Update Date",
        alias: "updateDate",
        allowSorting: !0,
        width: "12%"
      },
      {
        name: "Updater",
        alias: "updaterName",
        allowSorting: !0,
        width: "10%"
      },
      {
        name: "Culture",
        alias: "culture",
        allowSorting: !0,
        width: "8%"
      },
      {
        name: "Recycled",
        alias: "trashed",
        allowSorting: !0,
        width: "8%"
      },
      {
        name: "Id",
        alias: "id",
        allowSorting: !0,
        width: "8%"
      }
    ], this._tableItems = [], this.data = [], this.searchId = "", this.searchName = "", this.selectedAlias = "", this.selectedLanguageId = null, this.searchLevel = null, this.trashed = null, this.currentPage = 1, this.totalPages = 1, this.totalItems = 0, this.isLoading = !0, this.contentTypeAliases = [], this.languages = [];
  }
  async connectedCallback() {
    super.connectedCallback(), await i(this, a, y).call(this), i(this, a, r).call(this);
  }
  render() {
    var t;
    return o`
            <umb-body-layout>
                <godmode-header name="Content Browser" slot="header"></godmode-header>
                
                <uui-box headline="Search Filters">
                    <div class="grid">
                        <div>
                            <uui-label>Node Id:</uui-label>
                            <uui-input
                                placeholder="Id or UDI"
                                .value=${this.searchId}
                                @input=${i(this, a, $)}>
                            </uui-input>
                        </div>

                        <div>
                            <uui-label>Name:</uui-label>
                            <uui-input
                                placeholder="Search node names"
                                .value=${this.searchName}
                                @input=${i(this, a, P)}>
                            </uui-input>
                        </div>

                        <div>
                            <uui-label>Content Alias:</uui-label>
                            <uui-select @change=${i(this, a, w)}>
                                <uui-select-option value="">Any</uui-select-option>
                                ${this.contentTypeAliases.map((e) => o`
                                    <uui-select-option value="${e}">${e}</uui-select-option>
                                `)}
                            </uui-select>
                        </div>

                        <div>
                            <uui-label>Language:</uui-label>
                            <uui-select @change=${i(this, a, I)}>
                                <uui-select-option value="">Any</uui-select-option>
                                ${this.languages.map((e) => o`
                                    <uui-select-option value="${e.id}">${e.name}</uui-select-option>
                                `)}
                            </uui-select>
                        </div>

                        <div>
                            <uui-label>Tree Level:</uui-label>
                            <uui-input
                                type="number"
                                placeholder="Level"
                                .value=${((t = this.searchLevel) == null ? void 0 : t.toString()) || ""}
                                @input=${i(this, a, A)}>
                            </uui-input>
                        </div>

                        <div>
                            <uui-label>Recycled?</uui-label>
                            <uui-select @change=${i(this, a, C)}>
                                <uui-select-option value="">Any</uui-select-option>
                                <uui-select-option value="true">Yes</uui-select-option>
                                <uui-select-option value="false">No</uui-select-option>
                            </uui-select>
                        </div>
                    </div>
                </uui-box>

                ${this.isLoading ? o`
                    <uui-loader-bar></uui-loader-bar>
                ` : o``}

                ${!this.isLoading && this.totalItems > 0 ? o`
                    <uui-box>
                        <p><strong>${this.data.length}</strong> / <strong>${this.totalItems}</strong> items</p>
                    </uui-box>
                ` : o``}

                ${!this.isLoading && this._tableItems.length > 0 ? o`
                    <uui-box style="--uui-box-default-padding: 0;">
                        <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${i(this, a, _)} />
                    </uui-box>
                ` : o``}

                ${!this.isLoading && this.totalPages > 1 ? o`
                    <uui-box>
                        <div class="pagination">
                            <uui-button
                                label="Previous"
                                look="default"
                                ?disabled=${this.currentPage === 1}
                                @click=${i(this, a, D)}>
                                Previous
                            </uui-button>
                            <span>Page ${this.currentPage} of ${this.totalPages}</span>
                            <uui-button
                                label="Next"
                                look="default"
                                ?disabled=${this.currentPage === this.totalPages}
                                @click=${i(this, a, L)}>
                                Next
                            </uui-button>
                        </div>
                    </uui-box>
                ` : o``}
            </umb-body-layout>
        `;
  }
};
a = /* @__PURE__ */ new WeakSet();
y = async function() {
  const { data: t } = await p(this, m.getUmbracoManagementApiV1GodModeGetContentTypeAliases());
  t && (this.contentTypeAliases = t);
  const { data: e } = await p(this, m.getUmbracoManagementApiV1GodModeGetLanguages());
  e && (this.languages = e);
};
_ = function(t) {
  const e = t.target, u = e.orderingColumn, h = e.orderingDesc;
  this.data = M(structuredClone(this.data), u, h ? f.DESCENDING : f.ASCENDING), this._tableItems = i(this, a, v).call(this, this.data);
};
r = async function() {
  this.isLoading = !0;
  const t = {
    page: this.currentPage,
    pageSize: 50
  };
  this.searchId && (t.id = this.searchId), this.searchName && (t.name = this.searchName), this.selectedAlias && (t.alias = this.selectedAlias), this.selectedLanguageId !== null && (t.languageId = this.selectedLanguageId), this.searchLevel !== null && (t.level = this.searchLevel), this.trashed !== null && (t.trashed = this.trashed);
  const { data: e } = await p(this, m.getUmbracoManagementApiV1GodModeGetContentPaged({ query: t }));
  e && (this.data = e.items || [], this._tableItems = i(this, a, v).call(this, this.data), this.currentPage = e.currentPage || 1, this.totalPages = e.totalPages || 1, this.totalItems = e.totalItems || 0), this.isLoading = !1;
};
v = function(t) {
  return t.map((e) => {
    var u;
    return {
      id: ((u = e.id) == null ? void 0 : u.toString()) || "",
      data: [
        {
          columnAlias: "name",
          value: o`<strong>${e.name || ""}</strong>`
        },
        {
          columnAlias: "alias",
          value: o`<span class="${e.icon || "icon-document"}"></span> ${e.alias || ""}`
        },
        {
          columnAlias: "createDate",
          value: e.createDate ? new Date(e.createDate).toLocaleString() : ""
        },
        {
          columnAlias: "creatorName",
          value: e.creatorName || ""
        },
        {
          columnAlias: "updateDate",
          value: e.updateDate ? new Date(e.updateDate).toLocaleString() : ""
        },
        {
          columnAlias: "updaterName",
          value: e.updaterName || ""
        },
        {
          columnAlias: "culture",
          value: e.culture || ""
        },
        {
          columnAlias: "trashed",
          value: e.trashed ? o`<uui-icon name="icon-check" style="color: red;"></uui-icon>` : ""
        },
        {
          columnAlias: "id",
          value: o`<div><strong>${e.id || ""}</strong><br/><code style="font-size: 0.8em;">${e.udi || ""}</code></div>`
        }
      ]
    };
  });
};
$ = function(t) {
  this.searchId = t.target.value.trim(), this.currentPage = 1, i(this, a, r).call(this);
};
P = function(t) {
  this.searchName = t.target.value.trim(), this.currentPage = 1, i(this, a, r).call(this);
};
w = function(t) {
  this.selectedAlias = t.target.value, this.currentPage = 1, i(this, a, r).call(this);
};
I = function(t) {
  const e = t.target.value;
  this.selectedLanguageId = e ? parseInt(e) : null, this.currentPage = 1, i(this, a, r).call(this);
};
A = function(t) {
  const e = t.target.value.trim();
  this.searchLevel = e ? parseInt(e) : null, this.currentPage = 1, i(this, a, r).call(this);
};
C = function(t) {
  const e = t.target.value;
  this.trashed = e === "true" ? !0 : e === "false" ? !1 : null, this.currentPage = 1, i(this, a, r).call(this);
};
L = function() {
  this.currentPage < this.totalPages && (this.currentPage++, i(this, a, r).call(this));
};
D = function() {
  this.currentPage > 1 && (this.currentPage--, i(this, a, r).call(this));
};
s.styles = [
  x`
            .grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;
            }

            uui-box {
                margin-bottom: 20px;
            }

            .pagination {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 20px;
            }
        `
];
l([
  n()
], s.prototype, "_tableConfig", 2);
l([
  n()
], s.prototype, "_tableColumns", 2);
l([
  n()
], s.prototype, "_tableItems", 2);
l([
  n()
], s.prototype, "data", 2);
l([
  n()
], s.prototype, "searchId", 2);
l([
  n()
], s.prototype, "searchName", 2);
l([
  n()
], s.prototype, "selectedAlias", 2);
l([
  n()
], s.prototype, "selectedLanguageId", 2);
l([
  n()
], s.prototype, "searchLevel", 2);
l([
  n()
], s.prototype, "trashed", 2);
l([
  n()
], s.prototype, "currentPage", 2);
l([
  n()
], s.prototype, "totalPages", 2);
l([
  n()
], s.prototype, "totalItems", 2);
l([
  n()
], s.prototype, "isLoading", 2);
l([
  n()
], s.prototype, "contentTypeAliases", 2);
l([
  n()
], s.prototype, "languages", 2);
s = l([
  G("godmode-content-browser")
], s);
const R = s;
export {
  s as GodModeContentBrowserElement,
  R as default
};
//# sourceMappingURL=godmode-content-browser.element-BmREVg6j.js.map
