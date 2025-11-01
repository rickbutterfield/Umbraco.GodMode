import { UmbElementMixin as S } from "@umbraco-cms/backoffice/element-api";
import { LitElement as T, html as n, css as C, state as l, customElement as D } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute as f } from "@umbraco-cms/backoffice/resources";
import { G as y, s as N } from "./index-D2VaFLfx.js";
import { DirectionModel as g } from "@umbraco-cms/backoffice/external/backend-api";
var E = Object.defineProperty, B = Object.getOwnPropertyDescriptor, b = (e) => {
  throw TypeError(e);
}, r = (e, t, s, u) => {
  for (var d = u > 1 ? void 0 : u ? B(t, s) : t, c = e.length - 1, p; c >= 0; c--)
    (p = e[c]) && (d = (u ? p(t, s, d) : p(d)) || d);
  return u && d && E(t, s, d), d;
}, L = (e, t, s) => t.has(e) || b("Cannot " + s), A = (e, t, s) => t.has(e) ? b("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), o = (e, t, s) => (L(e, t, "access private method"), s), a, v, _, h, P, m, M, I, x, $, w;
let i = class extends S(T) {
  constructor() {
    super(), A(this, a), this._tableConfig = {
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
    return n`
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

                ${this.isLoading ? n`
                    <uui-loader-bar></uui-loader-bar>
                ` : n``}

                ${!this.isLoading && this._tableItems.length > 0 ? n`
                    <uui-box style="--uui-box-default-padding: 0;">
                        <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${o(this, a, _)} />
                    </uui-box>
                ` : n``}

                ${!this.isLoading && this.totalPages > 1 ? n`
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
                ` : n``}

                ${!this.isLoading && this._tableItems.length === 0 ? n`
                    <uui-box>
                        <p>No media was found for your selected criteria.</p>
                    </uui-box>
                ` : n``}
            </umb-body-layout>
        `;
  }
};
a = /* @__PURE__ */ new WeakSet();
v = async function() {
  const { data: e } = await f(this, y.getMediaTypes());
  e && (this.mediaTypes = e, this.mediaTypeOptions = this.mediaTypes.map((t) => ({ name: t.name, value: t.id.toString() })), this.mediaTypeOptions.unshift({ name: "Any", value: "", selected: !0 }));
};
_ = function(e) {
  const t = e.target, s = t.orderingColumn, u = t.orderingDesc;
  this.data = N(structuredClone(this.data), s, u ? g.DESCENDING : g.ASCENDING), this._tableItems = o(this, a, m).call(this, this.data);
};
h = async function() {
  this.isLoading = !0;
  const e = {
    page: this.currentPage,
    pageSize: 50
  };
  this.searchId && (e.id = parseInt(this.searchId)), this.searchName && (e.name = this.searchName), this.selectedMediaType !== null && (e.mediaTypeId = this.selectedMediaType);
  const { data: t } = await f(this, y.getMedia({ query: e }));
  t && (t.items ? (this.data = t.items || [], this.currentPage = t.currentPage || 1, this.totalPages = t.totalPages || 1, this.totalItems = t.totalItems || 0) : (this.data = [t], this.currentPage = 1, this.totalPages = 1, this.totalItems = 1), this._tableItems = o(this, a, m).call(this, this.data)), this.isLoading = !1;
};
P = function(e) {
  if (e === 0) return "0 Bytes";
  const t = 1024, s = ["Bytes", "KB", "MB", "GB"], u = Math.floor(Math.log(e) / Math.log(t));
  return Math.round(e / Math.pow(t, u) * 100) / 100 + " " + s[u];
};
m = function(e) {
  return e.map((t) => {
    var s;
    return {
      id: ((s = t.id) == null ? void 0 : s.toString()) || "",
      data: [
        {
          columnAlias: "name",
          value: n`<strong>${t.name || ""}</strong>`
        },
        {
          columnAlias: "alias",
          value: t.alias || ""
        },
        {
          columnAlias: "type",
          value: t.type || t.ext || ""
        },
        {
          columnAlias: "size",
          value: o(this, a, P).call(this, t.size || 0)
        },
        {
          columnAlias: "updateDate",
          value: t.updateDate ? new Date(t.updateDate).toLocaleString() : ""
        },
        {
          columnAlias: "id",
          value: n`<div><strong>${t.id || ""}</strong><br/><code style="font-size: 0.8em;">${t.udi || ""}</code></div>`
        }
      ]
    };
  });
};
M = function(e) {
  this.searchId = e.target.value.trim(), this.currentPage = 1, o(this, a, h).call(this);
};
I = function(e) {
  this.searchName = e.target.value.trim(), this.currentPage = 1, o(this, a, h).call(this);
};
x = function(e) {
  const t = e.target.value;
  this.selectedMediaType = t ? parseInt(t) : null, this.currentPage = 1, o(this, a, h).call(this);
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
  l()
], i.prototype, "_tableConfig", 2);
r([
  l()
], i.prototype, "_tableColumns", 2);
r([
  l()
], i.prototype, "_tableItems", 2);
r([
  l()
], i.prototype, "data", 2);
r([
  l()
], i.prototype, "searchId", 2);
r([
  l()
], i.prototype, "searchName", 2);
r([
  l()
], i.prototype, "selectedMediaType", 2);
r([
  l()
], i.prototype, "currentPage", 2);
r([
  l()
], i.prototype, "totalPages", 2);
r([
  l()
], i.prototype, "totalItems", 2);
r([
  l()
], i.prototype, "isLoading", 2);
r([
  l()
], i.prototype, "mediaTypes", 2);
r([
  l()
], i.prototype, "mediaTypeOptions", 2);
i = r([
  D("godmode-media-browser")
], i);
const U = i;
export {
  i as GodModeMediaBrowserElement,
  U as default
};
//# sourceMappingURL=godmode-media-browser.element-Cgr8HVLl.js.map
