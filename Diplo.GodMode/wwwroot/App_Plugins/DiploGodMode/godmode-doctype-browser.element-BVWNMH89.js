import { UmbElementMixin as C } from "@umbraco-cms/backoffice/element-api";
import { LitElement as w, html as n, css as v, state as c, customElement as D } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute as S } from "@umbraco-cms/backoffice/resources";
import { s as N, a as E } from "./index-CJ2F2uoa.js";
import { DirectionModel as p } from "@umbraco-cms/backoffice/external/backend-api";
var x = Object.defineProperty, I = Object.getOwnPropertyDescriptor, f = (e) => {
  throw TypeError(e);
}, l = (e, t, a, s) => {
  for (var i = s > 1 ? void 0 : s ? I(t, a) : t, d = e.length - 1, m; d >= 0; d--)
    (m = e[d]) && (i = (s ? m(t, a, i) : m(i)) || i);
  return s && i && x(t, a, i), i;
}, $ = (e, t, a) => t.has(e) || f("Cannot " + a), A = (e, t, a) => t.has(e) ? f("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), u = (e, t, a) => ($(e, t, "access private method"), a), r, g, b, h, _, y;
let o = class extends C(w) {
  constructor() {
    super(), A(this, r), this._tableConfig = {
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
        width: "20%"
      },
      {
        name: "Description",
        alias: "description",
        allowSorting: !0,
        width: "25%"
      },
      {
        name: "Icon",
        alias: "icon",
        allowSorting: !1,
        width: "10%"
      },
      {
        name: "Properties",
        alias: "propertyCount",
        allowSorting: !0,
        width: "10%"
      },
      {
        name: "Compositions",
        alias: "hasCompositions",
        allowSorting: !0,
        width: "15%"
      }
    ], this._tableItems = [], this.data = [], this.filteredData = [], this.searchName = "", this.isLoading = !0;
  }
  async connectedCallback() {
    super.connectedCallback(), u(this, r, b).call(this);
  }
  render() {
    return n`
            <umb-body-layout>
                <godmode-header name="Document Type Browser" slot="header"></godmode-header>
                
                <uui-box>
                    <uui-label>Search:</uui-label>
                    <uui-input
                        placeholder="Filter by name or alias"
                        .value=${this.searchName}
                        @input=${u(this, r, _)}>
                    </uui-input>
                </uui-box>

                ${this.isLoading ? n`
                    <uui-loader-bar></uui-loader-bar>
                ` : n``}

                ${!this.isLoading && this._tableItems.length > 0 ? n`
                    <uui-box style="--uui-box-default-padding: 0;">
                        <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${u(this, r, g)} />
                    </uui-box>
                ` : n``}
            </umb-body-layout>
        `;
  }
};
r = /* @__PURE__ */ new WeakSet();
g = function(e) {
  const t = e.target, a = t.orderingColumn, s = t.orderingDesc;
  this.filteredData = N(structuredClone(this.data), a, s ? p.DESCENDING : p.ASCENDING), this._tableItems = u(this, r, h).call(this, this.filteredData);
};
b = async function() {
  this.isLoading = !0;
  const { data: e } = await S(this, E.getUmbracoManagementApiV1GodModeGetContentTypeMap());
  e && (this.data = e, this.filteredData = structuredClone(this.data), this._tableItems = u(this, r, h).call(this, this.filteredData)), this.isLoading = !1;
};
h = function(e) {
  return e.map((t) => {
    var s, i, d;
    const a = (((s = t.properties) == null ? void 0 : s.length) || 0) + (((i = t.compositionProperties) == null ? void 0 : i.length) || 0);
    return {
      id: ((d = t.id) == null ? void 0 : d.toString()) || "",
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
          columnAlias: "description",
          value: t.description || ""
        },
        {
          columnAlias: "icon",
          value: n`<uui-icon name="${t.icon || "icon-document"}"></uui-icon>`
        },
        {
          columnAlias: "propertyCount",
          value: a
        },
        {
          columnAlias: "hasCompositions",
          value: t.hasCompositions ? n`<uui-icon name="icon-check" style="color: green;"></uui-icon>` : ""
        }
      ]
    };
  });
};
_ = function(e) {
  const t = e.target.value;
  this.searchName = t.toLowerCase(), u(this, r, y).call(this);
};
y = function() {
  this.filteredData = this.data.filter((e) => {
    var t;
    return this.searchName && e.name ? e.name.toLowerCase().includes(this.searchName) || ((t = e.alias) == null ? void 0 : t.toLowerCase().includes(this.searchName)) : !0;
  }), this._tableItems = u(this, r, h).call(this, this.filteredData);
};
o.styles = [
  v`
            uui-box {
                margin-bottom: 20px;
            }
        `
];
l([
  c()
], o.prototype, "_tableConfig", 2);
l([
  c()
], o.prototype, "_tableColumns", 2);
l([
  c()
], o.prototype, "_tableItems", 2);
l([
  c()
], o.prototype, "data", 2);
l([
  c()
], o.prototype, "filteredData", 2);
l([
  c()
], o.prototype, "searchName", 2);
l([
  c()
], o.prototype, "isLoading", 2);
o = l([
  D("godmode-doctype-browser")
], o);
const B = o;
export {
  o as GodModeDocTypeBrowserElement,
  B as default
};
//# sourceMappingURL=godmode-doctype-browser.element-BVWNMH89.js.map
