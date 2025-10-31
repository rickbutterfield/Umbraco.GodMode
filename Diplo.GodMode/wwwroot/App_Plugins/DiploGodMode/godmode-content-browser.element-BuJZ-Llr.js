import { UmbElementMixin as w } from "@umbraco-cms/backoffice/element-api";
import { LitElement as C, html as s, css as y, state as r, customElement as D } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute as S } from "@umbraco-cms/backoffice/resources";
import { s as I, a as N } from "./index-CJ2F2uoa.js";
import { DirectionModel as p } from "@umbraco-cms/backoffice/external/backend-api";
var P = Object.defineProperty, $ = Object.getOwnPropertyDescriptor, g = (e) => {
  throw TypeError(e);
}, i = (e, t, a, h) => {
  for (var n = h > 1 ? void 0 : h ? $(t, a) : t, c = e.length - 1, m; c >= 0; c--)
    (m = e[c]) && (n = (h ? m(t, a, n) : m(n)) || n);
  return h && n && P(t, a, n), n;
}, x = (e, t, a) => t.has(e) || g("Cannot " + a), L = (e, t, a) => t.has(e) ? g("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), u = (e, t, a) => (x(e, t, "access private method"), a), l, f, b, d, _, v;
let o = class extends w(C) {
  constructor() {
    super(), L(this, l), this._tableConfig = {
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
        width: "15%"
      },
      {
        name: "Icon",
        alias: "icon",
        allowSorting: !1,
        width: "8%"
      },
      {
        name: "Level",
        alias: "level",
        allowSorting: !0,
        width: "7%"
      },
      {
        name: "Creator",
        alias: "creatorName",
        allowSorting: !0,
        width: "15%"
      },
      {
        name: "Updated",
        alias: "updateDate",
        allowSorting: !0,
        width: "15%"
      },
      {
        name: "Trashed",
        alias: "trashed",
        allowSorting: !0,
        width: "10%"
      }
    ], this._tableItems = [], this.data = [], this.filteredData = [], this.searchName = "", this.currentPage = 1, this.totalPages = 1, this.totalItems = 0, this.isLoading = !0;
  }
  async connectedCallback() {
    super.connectedCallback(), u(this, l, b).call(this);
  }
  render() {
    return s`
            <umb-body-layout>
                <godmode-header name="Content Browser" slot="header"></godmode-header>
                
                <uui-box>
                    <uui-label>Search:</uui-label>
                    <uui-input
                        placeholder="Filter by name or alias"
                        .value=${this.searchName}
                        @input=${u(this, l, _)}>
                    </uui-input>
                </uui-box>

                ${this.isLoading ? s`
                    <uui-loader-bar></uui-loader-bar>
                ` : s``}

                ${!this.isLoading && this.totalItems > 0 ? s`
                    <uui-box>
                        <p>Showing page ${this.currentPage} of ${this.totalPages} (${this.totalItems} total items)</p>
                    </uui-box>
                ` : s``}

                ${!this.isLoading && this._tableItems.length > 0 ? s`
                    <uui-box style="--uui-box-default-padding: 0;">
                        <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${u(this, l, f)} />
                    </uui-box>
                ` : s``}
            </umb-body-layout>
        `;
  }
};
l = /* @__PURE__ */ new WeakSet();
f = function(e) {
  const t = e.target, a = t.orderingColumn, h = t.orderingDesc;
  this.filteredData = I(structuredClone(this.data), a, h ? p.DESCENDING : p.ASCENDING), this._tableItems = u(this, l, d).call(this, this.filteredData);
};
b = async function() {
  this.isLoading = !0;
  const { data: e } = await S(this, N.getUmbracoManagementApiV1GodModeGetContentPaged({
    query: {
      page: this.currentPage,
      pageSize: 50
    }
  }));
  e && (this.data = e.items || [], this.filteredData = structuredClone(this.data), this._tableItems = u(this, l, d).call(this, this.filteredData), this.currentPage = e.currentPage || 1, this.totalPages = e.totalPages || 1, this.totalItems = e.totalItems || 0), this.isLoading = !1;
};
d = function(e) {
  return e.map((t) => {
    var a;
    return {
      id: ((a = t.id) == null ? void 0 : a.toString()) || "",
      data: [
        {
          columnAlias: "name",
          value: s`<strong>${t.name || ""}</strong>`
        },
        {
          columnAlias: "alias",
          value: t.alias || ""
        },
        {
          columnAlias: "icon",
          value: s`<uui-icon name="${t.icon || "icon-document"}"></uui-icon>`
        },
        {
          columnAlias: "level",
          value: t.level || 0
        },
        {
          columnAlias: "creatorName",
          value: t.creatorName || ""
        },
        {
          columnAlias: "updateDate",
          value: t.updateDate ? new Date(t.updateDate).toLocaleString() : ""
        },
        {
          columnAlias: "trashed",
          value: t.trashed ? s`<uui-icon name="icon-trash" style="color: red;"></uui-icon>` : ""
        }
      ]
    };
  });
};
_ = function(e) {
  const t = e.target.value;
  this.searchName = t.toLowerCase(), u(this, l, v).call(this);
};
v = function() {
  this.filteredData = this.data.filter((e) => {
    var t;
    return this.searchName && e.name ? e.name.toLowerCase().includes(this.searchName) || ((t = e.alias) == null ? void 0 : t.toLowerCase().includes(this.searchName)) : !0;
  }), this._tableItems = u(this, l, d).call(this, this.filteredData);
};
o.styles = [
  y`
            uui-box {
                margin-bottom: 20px;
            }
        `
];
i([
  r()
], o.prototype, "_tableConfig", 2);
i([
  r()
], o.prototype, "_tableColumns", 2);
i([
  r()
], o.prototype, "_tableItems", 2);
i([
  r()
], o.prototype, "data", 2);
i([
  r()
], o.prototype, "filteredData", 2);
i([
  r()
], o.prototype, "searchName", 2);
i([
  r()
], o.prototype, "currentPage", 2);
i([
  r()
], o.prototype, "totalPages", 2);
i([
  r()
], o.prototype, "totalItems", 2);
i([
  r()
], o.prototype, "isLoading", 2);
o = i([
  D("godmode-content-browser")
], o);
const O = o;
export {
  o as GodModeContentBrowserElement,
  O as default
};
//# sourceMappingURL=godmode-content-browser.element-BuJZ-Llr.js.map
