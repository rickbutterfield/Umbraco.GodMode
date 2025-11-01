import { UmbElementMixin as D } from "@umbraco-cms/backoffice/element-api";
import { LitElement as N, html as r, css as x, state as o, customElement as O } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute as p } from "@umbraco-cms/backoffice/resources";
import { G as m, s as E } from "./index-D2VaFLfx.js";
import { DirectionModel as f } from "@umbraco-cms/backoffice/external/backend-api";
var T = Object.defineProperty, G = Object.getOwnPropertyDescriptor, b = (t) => {
  throw TypeError(t);
}, n = (t, e, l, h) => {
  for (var c = h > 1 ? void 0 : h ? G(e, l) : e, d = t.length - 1, g; d >= 0; d--)
    (g = t[d]) && (c = (h ? g(e, l, c) : g(c)) || c);
  return h && c && T(e, l, c), c;
}, M = (t, e, l) => e.has(t) || b("Cannot " + l), k = (t, e, l) => e.has(t) ? b("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, l), i = (t, e, l) => (M(t, e, "access private method"), l), a, y, _, u, v, P, I, A, $, C, L, w, S;
let s = class extends D(N) {
  constructor() {
    super(), k(this, a), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "Name",
        alias: "name",
        allowSorting: !0
      },
      {
        name: "Alias",
        alias: "alias",
        allowSorting: !0
      },
      {
        name: "Create Date",
        alias: "createDate",
        allowSorting: !0
      },
      {
        name: "Creator",
        alias: "creatorName",
        allowSorting: !0
      },
      {
        name: "Update Date",
        alias: "updateDate",
        allowSorting: !0
      },
      {
        name: "Updater",
        alias: "updaterName",
        allowSorting: !0
      },
      {
        name: "Culture",
        alias: "culture",
        allowSorting: !0
      },
      {
        name: "Recycled",
        alias: "trashed",
        allowSorting: !0
      },
      {
        name: "Id",
        alias: "id",
        allowSorting: !0
      }
    ], this._tableItems = [], this.data = [], this.searchId = "", this.searchName = "", this.selectedAlias = "", this.selectedLanguageId = null, this.searchLevel = null, this.trashed = null, this.currentPage = 1, this.totalPages = 1, this.totalItems = 0, this.isLoading = !0, this.contentTypeAliases = [], this.contentTypeAliasOptions = [], this.languages = [], this.languageOptions = [], this.recycledOptions = [
      { name: "Any", value: "", selected: !0 },
      { name: "Yes", value: "true" },
      { name: "No", value: "false" }
    ];
  }
  async connectedCallback() {
    super.connectedCallback(), await i(this, a, y).call(this), i(this, a, u).call(this);
  }
  render() {
    var t;
    return r`
            <umb-body-layout>
                <godmode-header name="Content Browser" slot="header"></godmode-header>
                
                <uui-box headline="Search Filters">
                    <div class="grid">
                        <div>
                            <uui-label>Node Id:</uui-label>
                            <uui-input
                                placeholder="Id or UDI"
                                .value=${this.searchId}
                                @input=${i(this, a, P)}>
                            </uui-input>
                        </div>

                        <div>
                            <uui-label>Name:</uui-label>
                            <uui-input
                                placeholder="Search node names"
                                .value=${this.searchName}
                                @input=${i(this, a, I)}>
                            </uui-input>
                        </div>

                        <div>
                            <uui-label>Content Alias:</uui-label>
                            <uui-select
                                .options=${this.contentTypeAliasOptions}
                                @change=${i(this, a, A)}>
                            </uui-select>
                        </div>

                        <div>
                            <uui-label>Language:</uui-label>
                            <uui-select
                                .options=${this.languageOptions}
                                @change=${i(this, a, $)}>
                            </uui-select>
                        </div>

                        <div>
                            <uui-label>Tree Level:</uui-label>
                            <uui-input
                                type="number"
                                placeholder="Level"
                                .value=${((t = this.searchLevel) == null ? void 0 : t.toString()) || ""}
                                @input=${i(this, a, C)}>
                            </uui-input>
                        </div>

                        <div>
                            <uui-label>Recycled?</uui-label>
                            <uui-select
                                .options=${this.recycledOptions}
                                @change=${i(this, a, L)}>
                            </uui-select>
                        </div>
                    </div>
                </uui-box>

                ${this.isLoading ? r`
                    <uui-loader-bar></uui-loader-bar>
                ` : r``}

                ${!this.isLoading && this._tableItems.length > 0 ? r`
                    <uui-box style="--uui-box-default-padding: 0;">
                        <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${i(this, a, _)} />
                    </uui-box>
                ` : r``}

                ${!this.isLoading && this.totalPages > 1 ? r`
                    <uui-box>
                        <div class="pagination">
                            <uui-button
                                label="Previous"
                                look="default"
                                ?disabled=${this.currentPage === 1}
                                @click=${i(this, a, S)}>
                                Previous
                            </uui-button>
                            <span>Page ${this.currentPage} of ${this.totalPages}</span>
                            <uui-button
                                label="Next"
                                look="default"
                                ?disabled=${this.currentPage === this.totalPages}
                                @click=${i(this, a, w)}>
                                Next
                            </uui-button>
                        </div>
                    </uui-box>
                ` : r``}
            </umb-body-layout>
        `;
  }
};
a = /* @__PURE__ */ new WeakSet();
y = async function() {
  const { data: t } = await p(this, m.getContentTypeAliases());
  t && (this.contentTypeAliases = t, this.contentTypeAliasOptions = t.map((l) => ({ name: l, value: l })), this.contentTypeAliasOptions.unshift({ name: "Any", value: "", selected: !0 }));
  const { data: e } = await p(this, m.getLanguages());
  e && (this.languages = e, this.languageOptions = e.map((l) => ({ name: l.name, value: l.id.toString() })), this.languageOptions.unshift({ name: "Any", value: "", selected: !0 }));
};
_ = function(t) {
  const e = t.target, l = e.orderingColumn, h = e.orderingDesc;
  this.data = E(structuredClone(this.data), l, h ? f.DESCENDING : f.ASCENDING), this._tableItems = i(this, a, v).call(this, this.data);
};
u = async function() {
  this.isLoading = !0;
  const t = {
    page: this.currentPage,
    pageSize: 50
  };
  this.searchId && (t.id = this.searchId), this.searchName && (t.name = this.searchName), this.selectedAlias && (t.alias = this.selectedAlias), this.selectedLanguageId !== null && (t.languageId = this.selectedLanguageId), this.searchLevel !== null && (t.level = this.searchLevel), this.trashed !== null && (t.trashed = this.trashed);
  const { data: e } = await p(this, m.getContentPaged({ query: t }));
  e && (this.data = e.items || [], this._tableItems = i(this, a, v).call(this, this.data), this.currentPage = e.currentPage || 1, this.totalPages = e.totalPages || 1, this.totalItems = e.totalItems || 0), this.isLoading = !1;
};
v = function(t) {
  return t.map((e) => {
    var l;
    return {
      id: ((l = e.id) == null ? void 0 : l.toString()) || "",
      data: [
        {
          columnAlias: "name",
          value: r`<strong>${e.name || ""}</strong>`
        },
        {
          columnAlias: "alias",
          value: r`<span class="${e.icon || "icon-document"}"></span> ${e.alias || ""}`
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
          value: e.trashed ? r`<uui-icon name="icon-check" style="color: red;"></uui-icon>` : ""
        },
        {
          columnAlias: "id",
          value: r`<div><strong>${e.id || ""}</strong><br/><code style="font-size: 0.8em;">${e.udi || ""}</code></div>`
        }
      ]
    };
  });
};
P = function(t) {
  this.searchId = t.target.value.trim(), this.currentPage = 1, i(this, a, u).call(this);
};
I = function(t) {
  this.searchName = t.target.value.trim(), this.currentPage = 1, i(this, a, u).call(this);
};
A = function(t) {
  this.selectedAlias = t.target.value, this.currentPage = 1, i(this, a, u).call(this);
};
$ = function(t) {
  const e = t.target.value;
  this.selectedLanguageId = e ? parseInt(e) : null, this.currentPage = 1, i(this, a, u).call(this);
};
C = function(t) {
  const e = t.target.value.trim();
  this.searchLevel = e ? parseInt(e) : null, this.currentPage = 1, i(this, a, u).call(this);
};
L = function(t) {
  const e = t.target.value;
  this.trashed = e === "true" ? !0 : e === "false" ? !1 : null, this.currentPage = 1, i(this, a, u).call(this);
};
w = function() {
  this.currentPage < this.totalPages && (this.currentPage++, i(this, a, u).call(this));
};
S = function() {
  this.currentPage > 1 && (this.currentPage--, i(this, a, u).call(this));
};
s.styles = [
  x`
             .grid {
                  display: grid;
                  grid-template-columns: repeat(3, 1fr);
                  gap: 20px;

                  div {
                      display: flex;
                      flex-direction: column;
                      align-items: flex-start;
                  }
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
n([
  o()
], s.prototype, "_tableConfig", 2);
n([
  o()
], s.prototype, "_tableColumns", 2);
n([
  o()
], s.prototype, "_tableItems", 2);
n([
  o()
], s.prototype, "data", 2);
n([
  o()
], s.prototype, "searchId", 2);
n([
  o()
], s.prototype, "searchName", 2);
n([
  o()
], s.prototype, "selectedAlias", 2);
n([
  o()
], s.prototype, "selectedLanguageId", 2);
n([
  o()
], s.prototype, "searchLevel", 2);
n([
  o()
], s.prototype, "trashed", 2);
n([
  o()
], s.prototype, "currentPage", 2);
n([
  o()
], s.prototype, "totalPages", 2);
n([
  o()
], s.prototype, "totalItems", 2);
n([
  o()
], s.prototype, "isLoading", 2);
n([
  o()
], s.prototype, "contentTypeAliases", 2);
n([
  o()
], s.prototype, "contentTypeAliasOptions", 2);
n([
  o()
], s.prototype, "languages", 2);
n([
  o()
], s.prototype, "languageOptions", 2);
s = n([
  O("godmode-content-browser")
], s);
const W = s;
export {
  s as GodModeContentBrowserElement,
  W as default
};
//# sourceMappingURL=godmode-content-browser.element-CqrpHAGK.js.map
