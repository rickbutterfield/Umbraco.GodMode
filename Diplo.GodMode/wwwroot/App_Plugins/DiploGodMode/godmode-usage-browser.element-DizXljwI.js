import { UmbElementMixin as _ } from "@umbraco-cms/backoffice/element-api";
import { LitElement as v, html as o, css as C, state as d, customElement as w } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute as y } from "@umbraco-cms/backoffice/resources";
import { s as D, G as E } from "./index-Car7Rj8s.js";
import { DirectionModel as p } from "@umbraco-cms/backoffice/external/backend-api";
var S = Object.defineProperty, x = Object.getOwnPropertyDescriptor, g = (e) => {
  throw TypeError(e);
}, n = (e, t, a, r) => {
  for (var s = r > 1 ? void 0 : r ? x(t, a) : t, c = e.length - 1, h; c >= 0; c--)
    (h = e[c]) && (s = (r ? h(t, a, s) : h(s)) || s);
  return r && s && S(t, a, s), s;
}, I = (e, t, a) => t.has(e) || g("Cannot " + a), $ = (e, t, a) => t.has(e) ? g("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), u = (e, t, a) => (I(e, t, "access private method"), a), l, b, f, m;
let i = class extends _(v) {
  constructor() {
    super(), $(this, l), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "Type",
        alias: "type",
        allowSorting: !0,
        width: "20%"
      },
      {
        name: "Alias",
        alias: "alias",
        allowSorting: !0,
        width: "25%"
      },
      {
        name: "Description",
        alias: "description",
        allowSorting: !0,
        width: "35%"
      },
      {
        name: "Count",
        alias: "nodeCount",
        allowSorting: !0,
        width: "10%"
      },
      {
        name: "Icon",
        alias: "icon",
        allowSorting: !1,
        width: "10%"
      }
    ], this._tableItems = [], this.data = [], this.filteredData = [], this.isLoading = !0;
  }
  async connectedCallback() {
    super.connectedCallback(), u(this, l, f).call(this);
  }
  render() {
    return o`
            <umb-body-layout>
                <godmode-header name="Usage Browser" slot="header"></godmode-header>
                
                ${this.isLoading ? o`
                    <uui-loader-bar></uui-loader-bar>
                ` : o``}

                ${!this.isLoading && this._tableItems.length > 0 ? o`
                    <uui-box style="--uui-box-default-padding: 0;">
                        <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${u(this, l, b)} />
                    </uui-box>
                ` : o``}

                ${!this.isLoading && this._tableItems.length === 0 ? o`
                    <uui-box>
                        <p>No usage data available.</p>
                    </uui-box>
                ` : o``}
            </umb-body-layout>
        `;
  }
};
l = /* @__PURE__ */ new WeakSet();
b = function(e) {
  const t = e.target, a = t.orderingColumn, r = t.orderingDesc;
  this.filteredData = D(structuredClone(this.data), a, r ? p.DESCENDING : p.ASCENDING), this._tableItems = u(this, l, m).call(this, this.filteredData);
};
f = async function() {
  this.isLoading = !0;
  const { data: e } = await y(this, E.getUmbracoManagementApiV1GodModeGetContentUsageData());
  e && (this.data = e, this.filteredData = structuredClone(this.data), this._tableItems = u(this, l, m).call(this, this.filteredData)), this.isLoading = !1;
};
m = function(e) {
  return e.map((t) => {
    var a;
    return {
      id: ((a = t.id) == null ? void 0 : a.toString()) || "",
      data: [
        {
          columnAlias: "type",
          value: o`<strong>${t.type || ""}</strong>`
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
          columnAlias: "nodeCount",
          value: o`<span class="node-count">${t.nodeCount || 0}</span>`
        },
        {
          columnAlias: "icon",
          value: o`<uui-icon name="${t.icon || "icon-document"}"></uui-icon>`
        }
      ]
    };
  });
};
i.styles = [
  C`
            uui-box {
                margin-bottom: 20px;
            }

            .node-count {
                font-weight: bold;
                color: var(--uui-color-emphasis);
            }
        `
];
n([
  d()
], i.prototype, "_tableConfig", 2);
n([
  d()
], i.prototype, "_tableColumns", 2);
n([
  d()
], i.prototype, "_tableItems", 2);
n([
  d()
], i.prototype, "data", 2);
n([
  d()
], i.prototype, "filteredData", 2);
n([
  d()
], i.prototype, "isLoading", 2);
i = n([
  w("godmode-usage-browser")
], i);
const N = i;
export {
  i as GodModeUsageBrowserElement,
  N as default
};
//# sourceMappingURL=godmode-usage-browser.element-DizXljwI.js.map
