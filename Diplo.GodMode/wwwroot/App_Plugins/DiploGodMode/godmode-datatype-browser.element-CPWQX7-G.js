import { UmbElementMixin as D } from "@umbraco-cms/backoffice/element-api";
import { LitElement as w, html as o, css as v, state as u, customElement as C } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute as S } from "@umbraco-cms/backoffice/resources";
import { s as E, a as N } from "./index-CJ2F2uoa.js";
import { DirectionModel as p } from "@umbraco-cms/backoffice/external/backend-api";
var x = Object.defineProperty, I = Object.getOwnPropertyDescriptor, f = (t) => {
  throw TypeError(t);
}, r = (t, e, a, d) => {
  for (var n = d > 1 ? void 0 : d ? I(e, a) : e, h = t.length - 1, m; h >= 0; h--)
    (m = t[h]) && (n = (d ? m(e, a, n) : m(n)) || n);
  return d && n && x(e, a, n), n;
}, L = (t, e, a) => e.has(t) || f("Cannot " + a), T = (t, e, a) => e.has(t) ? f("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), l = (t, e, a) => (L(t, e, "access private method"), a), s, b, g, c, _, y;
let i = class extends D(w) {
  constructor() {
    super(), T(this, s), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "Name",
        alias: "name",
        allowSorting: !0,
        width: "25%"
      },
      {
        name: "Alias",
        alias: "alias",
        allowSorting: !0,
        width: "25%"
      },
      {
        name: "DB Type",
        alias: "dbType",
        allowSorting: !0,
        width: "15%"
      },
      {
        name: "Used",
        alias: "isUsed",
        allowSorting: !0,
        width: "10%"
      },
      {
        name: "Updated",
        alias: "updateDate",
        allowSorting: !0,
        width: "25%"
      }
    ], this._tableItems = [], this.data = [], this.filteredData = [], this.searchName = "", this.isLoading = !0;
  }
  async connectedCallback() {
    super.connectedCallback(), l(this, s, g).call(this);
  }
  render() {
    return o`
            <umb-body-layout>
                <godmode-header name="DataType Browser" slot="header"></godmode-header>
                
                <uui-box>
                    <uui-label>Search:</uui-label>
                    <uui-input
                        placeholder="Filter by name"
                        .value=${this.searchName}
                        @input=${l(this, s, _)}>
                    </uui-input>
                </uui-box>

                ${this.isLoading ? o`
                    <uui-loader-bar></uui-loader-bar>
                ` : o``}

                ${!this.isLoading && this._tableItems.length > 0 ? o`
                    <uui-box style="--uui-box-default-padding: 0;">
                        <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${l(this, s, b)} />
                    </uui-box>
                ` : o``}
            </umb-body-layout>
        `;
  }
};
s = /* @__PURE__ */ new WeakSet();
b = function(t) {
  const e = t.target, a = e.orderingColumn, d = e.orderingDesc;
  this.filteredData = E(structuredClone(this.data), a, d ? p.DESCENDING : p.ASCENDING), this._tableItems = l(this, s, c).call(this, this.filteredData);
};
g = async function() {
  this.isLoading = !0;
  const { data: t } = await S(this, N.getUmbracoManagementApiV1GodModeGetDataTypes());
  t && (this.data = t, this.filteredData = structuredClone(this.data), this._tableItems = l(this, s, c).call(this, this.filteredData)), this.isLoading = !1;
};
c = function(t) {
  return t.map((e) => {
    var a;
    return {
      id: ((a = e.id) == null ? void 0 : a.toString()) || "",
      data: [
        {
          columnAlias: "name",
          value: o`<strong>${e.name || ""}</strong>`
        },
        {
          columnAlias: "alias",
          value: e.alias || ""
        },
        {
          columnAlias: "dbType",
          value: e.dbType || ""
        },
        {
          columnAlias: "isUsed",
          value: e.isUsed ? o`<uui-icon name="icon-check" style="color: green;"></uui-icon>` : o`<uui-icon name="icon-wrong" style="color: red;"></uui-icon>`
        },
        {
          columnAlias: "updateDate",
          value: e.updateDate ? new Date(e.updateDate).toLocaleString() : ""
        }
      ]
    };
  });
};
_ = function(t) {
  const e = t.target.value;
  this.searchName = e.toLowerCase(), l(this, s, y).call(this);
};
y = function() {
  this.filteredData = this.data.filter((t) => this.searchName && t.name ? t.name.toLowerCase().includes(this.searchName) : !0), this._tableItems = l(this, s, c).call(this, this.filteredData);
};
i.styles = [
  v`
            uui-box {
                margin-bottom: 20px;
            }
        `
];
r([
  u()
], i.prototype, "_tableConfig", 2);
r([
  u()
], i.prototype, "_tableColumns", 2);
r([
  u()
], i.prototype, "_tableItems", 2);
r([
  u()
], i.prototype, "data", 2);
r([
  u()
], i.prototype, "filteredData", 2);
r([
  u()
], i.prototype, "searchName", 2);
r([
  u()
], i.prototype, "isLoading", 2);
i = r([
  C("godmode-datatype-browser")
], i);
const B = i;
export {
  i as GodModeDataTypeBrowserElement,
  B as default
};
//# sourceMappingURL=godmode-datatype-browser.element-CPWQX7-G.js.map
