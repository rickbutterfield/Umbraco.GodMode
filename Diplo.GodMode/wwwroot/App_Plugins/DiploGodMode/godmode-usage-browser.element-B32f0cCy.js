import { UmbElementMixin as w } from "@umbraco-cms/backoffice/element-api";
import { LitElement as C, html as a, css as $, state as l, customElement as A } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute as x } from "@umbraco-cms/backoffice/resources";
import { s as S, G as L } from "./index-D76lIRat.js";
import { DirectionModel as f } from "@umbraco-cms/backoffice/external/backend-api";
var E = Object.defineProperty, I = Object.getOwnPropertyDescriptor, m = (t) => {
  throw TypeError(t);
}, n = (t, e, i, c) => {
  for (var u = c > 1 ? void 0 : c ? I(e, i) : e, p = t.length - 1, g; p >= 0; p--)
    (g = t[p]) && (u = (c ? g(e, i, u) : g(u)) || u);
  return c && u && E(e, i, u), u;
}, G = (t, e, i) => e.has(t) || m("Cannot " + i), M = (t, e, i) => e.has(t) ? m("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), r = (t, e, i) => (G(t, e, "access private method"), i), o, b, y, v, _, D, d, h;
let s = class extends w(C) {
  constructor() {
    super(), M(this, o), this._tableConfig = {
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
    ], this._tableItems = [], this.data = [], this.filteredData = [], this.searchAlias = "", this.searchDescription = "", this.selectedType = "", this.isLoading = !0, this.typeOptions = [];
  }
  async connectedCallback() {
    super.connectedCallback(), r(this, o, y).call(this);
  }
  render() {
    return a`
            <umb-body-layout>
                <godmode-header name="Usage Browser" slot="header"></godmode-header>
                
                <uui-box headline="Search Filters">
                    <div class="grid">
                        <div>
                            <uui-label>Alias:</uui-label>
                            <uui-input
                                placeholder="Search content-type aliases"
                                .value=${this.searchAlias}
                                @input=${r(this, o, v)}>
                            </uui-input>
                        </div>

                        <div>
                            <uui-label>Description:</uui-label>
                            <uui-input
                                placeholder="Search content-type descriptions"
                                .value=${this.searchDescription}
                                @input=${r(this, o, _)}>
                            </uui-input>
                        </div>

                        <div>
                            <uui-label>Type:</uui-label>
                            <uui-select @change=${r(this, o, D)}>
                                <uui-select-option value="">Any</uui-select-option>
                                ${this.typeOptions.map((t) => a`
                                    <uui-select-option value="${t}">${t}</uui-select-option>
                                `)}
                            </uui-select>
                        </div>
                    </div>
                </uui-box>

                ${this.isLoading ? a`
                    <uui-loader-bar></uui-loader-bar>
                ` : a``}

                ${!this.isLoading && this.data.length > 0 ? a`
                    <uui-box>
                        <p><strong>${this.filteredData.length}</strong> / <strong>${this.data.length}</strong> items</p>
                    </uui-box>
                ` : a``}

                ${!this.isLoading && this._tableItems.length > 0 ? a`
                    <uui-box style="--uui-box-default-padding: 0;">
                        <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${r(this, o, b)} />
                    </uui-box>
                ` : a``}

                ${!this.isLoading && this._tableItems.length === 0 && this.data.length > 0 ? a`
                    <uui-box>
                        <p>No usage data matches the current filters.</p>
                    </uui-box>
                ` : a``}

                ${!this.isLoading && this.data.length === 0 ? a`
                    <uui-box>
                        <p>No usage data available.</p>
                    </uui-box>
                ` : a``}
            </umb-body-layout>
        `;
  }
};
o = /* @__PURE__ */ new WeakSet();
b = function(t) {
  const e = t.target, i = e.orderingColumn, c = e.orderingDesc;
  this.filteredData = S(structuredClone(this.filteredData), i, c ? f.DESCENDING : f.ASCENDING), this._tableItems = r(this, o, h).call(this, this.filteredData);
};
y = async function() {
  this.isLoading = !0;
  const { data: t } = await x(this, L.getUmbracoManagementApiV1GodModeGetContentUsageData());
  if (t) {
    this.data = t;
    const e = /* @__PURE__ */ new Set();
    t.forEach((i) => {
      i.type && e.add(i.type);
    }), this.typeOptions = Array.from(e), this.filteredData = structuredClone(this.data), this._tableItems = r(this, o, h).call(this, this.filteredData);
  }
  this.isLoading = !1;
};
v = function(t) {
  this.searchAlias = t.target.value.toLowerCase(), r(this, o, d).call(this);
};
_ = function(t) {
  this.searchDescription = t.target.value.toLowerCase(), r(this, o, d).call(this);
};
D = function(t) {
  this.selectedType = t.target.value, r(this, o, d).call(this);
};
d = function() {
  this.filteredData = this.data.filter((t) => !(this.searchAlias && t.alias && !t.alias.toLowerCase().includes(this.searchAlias) || this.searchDescription && t.description && !t.description.toLowerCase().includes(this.searchDescription) || this.selectedType && t.type && t.type !== this.selectedType)), this._tableItems = r(this, o, h).call(this, this.filteredData);
};
h = function(t) {
  return t.map((e) => {
    var i;
    return {
      id: ((i = e.id) == null ? void 0 : i.toString()) || "",
      data: [
        {
          columnAlias: "type",
          value: a`<strong>${e.type || ""}</strong>`
        },
        {
          columnAlias: "alias",
          value: e.alias || ""
        },
        {
          columnAlias: "description",
          value: e.description || ""
        },
        {
          columnAlias: "nodeCount",
          value: a`<span class="node-count">${e.nodeCount || 0}</span>`
        },
        {
          columnAlias: "icon",
          value: a`<uui-icon name="${e.icon || "icon-document"}"></uui-icon>`
        }
      ]
    };
  });
};
s.styles = [
  $`
            .grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;
            }

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
  l()
], s.prototype, "_tableConfig", 2);
n([
  l()
], s.prototype, "_tableColumns", 2);
n([
  l()
], s.prototype, "_tableItems", 2);
n([
  l()
], s.prototype, "data", 2);
n([
  l()
], s.prototype, "filteredData", 2);
n([
  l()
], s.prototype, "searchAlias", 2);
n([
  l()
], s.prototype, "searchDescription", 2);
n([
  l()
], s.prototype, "selectedType", 2);
n([
  l()
], s.prototype, "isLoading", 2);
n([
  l()
], s.prototype, "typeOptions", 2);
s = n([
  A("godmode-usage-browser")
], s);
const P = s;
export {
  s as GodModeUsageBrowserElement,
  P as default
};
//# sourceMappingURL=godmode-usage-browser.element-B32f0cCy.js.map
