import { UmbElementMixin as S } from "@umbraco-cms/backoffice/element-api";
import { LitElement as T, html as l, css as C, state as n, customElement as D } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute as f } from "@umbraco-cms/backoffice/resources";
import { G as y, s as N } from "./index-Car7Rj8s.js";
import { DirectionModel as g } from "@umbraco-cms/backoffice/external/backend-api";
var E = Object.defineProperty, G = Object.getOwnPropertyDescriptor, b = (t) => {
  throw TypeError(t);
}, r = (t, e, s, u) => {
  for (var d = u > 1 ? void 0 : u ? G(e, s) : e, c = t.length - 1, p; c >= 0; c--)
    (p = t[c]) && (d = (u ? p(e, s, d) : p(d)) || d);
  return u && d && E(e, s, d), d;
}, A = (t, e, s) => e.has(t) || b("Cannot " + s), B = (t, e, s) => e.has(t) ? b("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), o = (t, e, s) => (A(t, e, "access private method"), s), a, v, _, h, P, m, M, I, x, $, w;
let i = class extends S(T) {
  constructor() {
    super(), B(this, a), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "Name",
        alias: "name",
        allowSorting: !0
      },
      {
        name: "Media",
        alias: "alias",
        allowSorting: !0
      },
      {
        name: "Type",
        alias: "type",
        allowSorting: !1
      },
      {
        name: "Size",
        alias: "size",
        allowSorting: !0
      },
      {
        name: "Update Date",
        alias: "updateDate",
        allowSorting: !0
      },
      {
        name: "Id",
        alias: "id",
        allowSorting: !0
      }
    ], this._tableItems = [], this.data = [], this.searchId = "", this.searchName = "", this.selectedMediaType = null, this.currentPage = 1, this.totalPages = 1, this.totalItems = 0, this.isLoading = !0, this.mediaTypes = [], this.mediaTypeOptions = [];
  }
  async connectedCallback() {
    super.connectedCallback(), await o(this, a, v).call(this), o(this, a, h).call(this);
  }
  render() {
    return l`
            <umb-body-layout>
                <godmode-header name="Media Browser" slot="header"></godmode-header>
                
                <uui-box headline="Search Filters">
                    <div class="grid">
                        <div>
                            <uui-label>Media Id:</uui-label>
                            <uui-input
                                placeholder="Search Id"
                                .value=${this.searchId}
                                @input=${o(this, a, M)}>
                            </uui-input>
                        </div>

                        <div>
                            <uui-label>Search:</uui-label>
                            <uui-input
                                placeholder="Filter media names"
                                .value=${this.searchName}
                                @input=${o(this, a, I)}>
                            </uui-input>
                        </div>

                        <div>
                            <uui-label>Media Type:</uui-label>
                            <uui-select
                                .options=${this.mediaTypeOptions}
                                @change=${o(this, a, x)}
                            >
                            </uui-select>
                        </div>
                    </div>
                </uui-box>

                ${this.isLoading ? l`
                    <uui-loader-bar></uui-loader-bar>
                ` : l``}

                ${!this.isLoading && this._tableItems.length > 0 ? l`
                    <uui-box style="--uui-box-default-padding: 0;">
                        <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${o(this, a, _)} />
                    </uui-box>
                ` : l``}

                ${!this.isLoading && this.totalPages > 1 ? l`
                    <uui-box>
                        <div class="pagination">
                            <uui-button
                                label="Previous"
                                look="default"
                                ?disabled=${this.currentPage === 1}
                                @click=${o(this, a, w)}>
                                Previous
                            </uui-button>
                            <span>Page ${this.currentPage} of ${this.totalPages}</span>
                            <uui-button
                                label="Next"
                                look="default"
                                ?disabled=${this.currentPage === this.totalPages}
                                @click=${o(this, a, $)}>
                                Next
                            </uui-button>
                        </div>
                    </uui-box>
                ` : l``}

                ${!this.isLoading && this._tableItems.length === 0 ? l`
                    <uui-box>
                        <p>No media was found for your selected criteria.</p>
                    </uui-box>
                ` : l``}
            </umb-body-layout>
        `;
  }
};
a = /* @__PURE__ */ new WeakSet();
v = async function() {
  const { data: t } = await f(this, y.getUmbracoManagementApiV1GodModeGetMediaTypes());
  t && (this.mediaTypes = t, this.mediaTypeOptions = this.mediaTypes.map((e) => ({ name: e.name, value: e.id.toString() })), this.mediaTypeOptions.unshift({ name: "Any", value: "", selected: !0 }));
};
_ = function(t) {
  const e = t.target, s = e.orderingColumn, u = e.orderingDesc;
  this.data = N(structuredClone(this.data), s, u ? g.DESCENDING : g.ASCENDING), this._tableItems = o(this, a, m).call(this, this.data);
};
h = async function() {
  this.isLoading = !0;
  const t = {
    page: this.currentPage,
    pageSize: 50
  };
  this.searchId && (t.id = parseInt(this.searchId)), this.searchName && (t.name = this.searchName), this.selectedMediaType !== null && (t.mediaTypeId = this.selectedMediaType);
  const { data: e } = await f(this, y.getUmbracoManagementApiV1GodModeGetMedia({ query: t }));
  e && (e.items ? (this.data = e.items || [], this.currentPage = e.currentPage || 1, this.totalPages = e.totalPages || 1, this.totalItems = e.totalItems || 0) : (this.data = [e], this.currentPage = 1, this.totalPages = 1, this.totalItems = 1), this._tableItems = o(this, a, m).call(this, this.data)), this.isLoading = !1;
};
P = function(t) {
  if (t === 0) return "0 Bytes";
  const e = 1024, s = ["Bytes", "KB", "MB", "GB"], u = Math.floor(Math.log(t) / Math.log(e));
  return Math.round(t / Math.pow(e, u) * 100) / 100 + " " + s[u];
};
m = function(t) {
  return t.map((e) => {
    var s;
    return {
      id: ((s = e.id) == null ? void 0 : s.toString()) || "",
      data: [
        {
          columnAlias: "name",
          value: l`<strong>${e.name || ""}</strong>`
        },
        {
          columnAlias: "alias",
          value: e.alias || ""
        },
        {
          columnAlias: "type",
          value: e.type || e.ext || ""
        },
        {
          columnAlias: "size",
          value: o(this, a, P).call(this, e.size || 0)
        },
        {
          columnAlias: "updateDate",
          value: e.updateDate ? new Date(e.updateDate).toLocaleString() : ""
        },
        {
          columnAlias: "id",
          value: l`<div><strong>${e.id || ""}</strong><br/><code style="font-size: 0.8em;">${e.udi || ""}</code></div>`
        }
      ]
    };
  });
};
M = function(t) {
  this.searchId = t.target.value.trim(), this.currentPage = 1, o(this, a, h).call(this);
};
I = function(t) {
  this.searchName = t.target.value.trim(), this.currentPage = 1, o(this, a, h).call(this);
};
x = function(t) {
  const e = t.target.value;
  this.selectedMediaType = e ? parseInt(e) : null, this.currentPage = 1, o(this, a, h).call(this);
};
$ = function() {
  this.currentPage < this.totalPages && (this.currentPage++, o(this, a, h).call(this));
};
w = function() {
  this.currentPage > 1 && (this.currentPage--, o(this, a, h).call(this));
};
i.styles = [
  C`
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
r([
  n()
], i.prototype, "_tableConfig", 2);
r([
  n()
], i.prototype, "_tableColumns", 2);
r([
  n()
], i.prototype, "_tableItems", 2);
r([
  n()
], i.prototype, "data", 2);
r([
  n()
], i.prototype, "searchId", 2);
r([
  n()
], i.prototype, "searchName", 2);
r([
  n()
], i.prototype, "selectedMediaType", 2);
r([
  n()
], i.prototype, "currentPage", 2);
r([
  n()
], i.prototype, "totalPages", 2);
r([
  n()
], i.prototype, "totalItems", 2);
r([
  n()
], i.prototype, "isLoading", 2);
r([
  n()
], i.prototype, "mediaTypes", 2);
r([
  n()
], i.prototype, "mediaTypeOptions", 2);
i = r([
  D("godmode-media-browser")
], i);
const F = i;
export {
  i as GodModeMediaBrowserElement,
  F as default
};
//# sourceMappingURL=godmode-media-browser.element-DaavoUox.js.map
