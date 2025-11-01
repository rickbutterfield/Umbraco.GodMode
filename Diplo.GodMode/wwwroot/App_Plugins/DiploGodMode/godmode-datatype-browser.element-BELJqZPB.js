import { UmbElementMixin as x } from "@umbraco-cms/backoffice/element-api";
import { LitElement as $, html as o, css as C, state as u, customElement as U } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute as f } from "@umbraco-cms/backoffice/resources";
import { s as S, G as y } from "./index-Car7Rj8s.js";
import { DirectionModel as b } from "@umbraco-cms/backoffice/external/backend-api";
var A = Object.defineProperty, I = Object.getOwnPropertyDescriptor, g = (e) => {
  throw TypeError(e);
}, l = (e, t, a, i) => {
  for (var d = i > 1 ? void 0 : i ? I(t, a) : t, h = e.length - 1, m; h >= 0; h--)
    (m = e[h]) && (d = (i ? m(t, a, d) : m(d)) || d);
  return i && d && A(t, a, d), d;
}, N = (e, t, a) => t.has(e) || g("Cannot " + a), G = (e, t, a) => t.has(e) ? g("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), n = (e, t, a) => (N(e, t, "access private method"), a), r, v, D, p, _, w, T, E, c;
let s = class extends x($) {
  constructor() {
    super(), G(this, r), this._tableConfig = {
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
    ], this._tableItems = [], this.data = [], this.filteredData = [], this.propertyEditors = [], this.searchName = "", this.selectedEditor = "", this.selectedDbType = "", this.isUsed = null, this.isLoading = !0, this.editorOptions = [], this.dbTypeOptions = [];
  }
  async connectedCallback() {
    super.connectedCallback(), n(this, r, D).call(this);
  }
  render() {
    return o`
            <umb-body-layout>
                <godmode-header name="DataType Browser" slot="header"></godmode-header>
                
                <uui-box headline="Search Filters">
                    <div class="grid">
                        <div>
                            <uui-label>Search:</uui-label>
                            <uui-input
                                placeholder="Filter data types"
                                .value=${this.searchName}
                                @input=${n(this, r, _)}>
                            </uui-input>
                        </div>

                        <div>
                            <uui-label>Editor:</uui-label>
                            <uui-select @change=${n(this, r, w)}>
                                <uui-select-option value="">Any</uui-select-option>
                                ${this.editorOptions.map((e) => o`
                                    <uui-select-option value="${e.value}">${e.name}</uui-select-option>
                                `)}
                            </uui-select>
                        </div>

                        <div>
                            <uui-label>DB Type:</uui-label>
                            <uui-select @change=${n(this, r, T)}>
                                <uui-select-option value="">Any</uui-select-option>
                                ${this.dbTypeOptions.map((e) => o`
                                    <uui-select-option value="${e.value}">${e.name}</uui-select-option>
                                `)}
                            </uui-select>
                        </div>

                        <div>
                            <uui-label>Is Used?</uui-label>
                            <uui-select @change=${n(this, r, E)}>
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

                ${!this.isLoading && this._tableItems.length > 0 ? o`
                    <uui-box>
                        <p><strong>${this.filteredData.length}</strong> / <strong>${this.data.length}</strong> data types</p>
                    </uui-box>
                    <uui-box style="--uui-box-default-padding: 0;">
                        <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${n(this, r, v)} />
                    </uui-box>
                ` : o``}

                ${!this.isLoading && this._tableItems.length === 0 && this.data.length > 0 ? o`
                    <uui-box>
                        <p>No data types match the current filters.</p>
                    </uui-box>
                ` : o``}

                ${this.isLoading ? o`` : o`
                    <uui-box>
                        <div class="alert">
                            <uui-icon name="icon-alert"></uui-icon>
                            <div>
                                <h4>Important!</h4>
                                <p>This only checks for datatypes that are used directly by a document type. Datatypes that are nested within another datatype (eg. within Block Editor, Grid or Nested Content) are not discoverable via the Umbraco API.</p>
                            </div>
                        </div>
                    </uui-box>
                `}
            </umb-body-layout>
        `;
  }
};
r = /* @__PURE__ */ new WeakSet();
v = function(e) {
  const t = e.target, a = t.orderingColumn, i = t.orderingDesc;
  this.filteredData = S(structuredClone(this.data), a, i ? b.DESCENDING : b.ASCENDING), this._tableItems = n(this, r, p).call(this, this.filteredData);
};
D = async function() {
  this.isLoading = !0;
  const { data: e } = await f(this, y.getUmbracoManagementApiV1GodModeGetDataTypes());
  if (e) {
    this.data = e, this.filteredData = structuredClone(this.data), this._tableItems = n(this, r, p).call(this, this.filteredData);
    const a = /* @__PURE__ */ new Set();
    e.forEach((i) => {
      i.dbType && a.add(i.dbType);
    }), this.dbTypeOptions = Array.from(a).map((i) => ({ name: i, value: i }));
  }
  const { data: t } = await f(this, y.getUmbracoManagementApiV1GodModeGetPropertyEditors());
  if (t) {
    this.propertyEditors = t;
    const a = /* @__PURE__ */ new Set();
    t.forEach((i) => {
      i.alias && a.add(i.alias);
    }), this.editorOptions = Array.from(a).map((i) => ({ name: i, value: i }));
  }
  this.isLoading = !1;
};
p = function(e) {
  return e.map((t) => {
    var a;
    return {
      id: ((a = t.id) == null ? void 0 : a.toString()) || "",
      data: [
        {
          columnAlias: "name",
          value: o`<strong>${t.name || ""}</strong>`
        },
        {
          columnAlias: "alias",
          value: t.alias || ""
        },
        {
          columnAlias: "dbType",
          value: o`<code>${t.dbType || ""}</code>`
        },
        {
          columnAlias: "isUsed",
          value: t.isUsed ? o`<uui-icon name="icon-check" style="color: green;"></uui-icon>` : o`<uui-icon name="icon-wrong" style="color: red;"></uui-icon>`
        },
        {
          columnAlias: "updateDate",
          value: t.updateDate ? new Date(t.updateDate).toLocaleString() : ""
        }
      ]
    };
  });
};
_ = function(e) {
  const t = e.target.value;
  this.searchName = t.toLowerCase(), n(this, r, c).call(this);
};
w = function(e) {
  this.selectedEditor = e.target.value, n(this, r, c).call(this);
};
T = function(e) {
  this.selectedDbType = e.target.value, n(this, r, c).call(this);
};
E = function(e) {
  const t = e.target.value;
  this.isUsed = t === "true" ? !0 : t === "false" ? !1 : null, n(this, r, c).call(this);
};
c = function() {
  this.filteredData = this.data.filter((e) => !(this.searchName && e.name && !e.name.toLowerCase().includes(this.searchName) || this.selectedEditor && e.alias && e.alias !== this.selectedEditor || this.selectedDbType && e.dbType && e.dbType !== this.selectedDbType || this.isUsed !== null && (this.isUsed && !e.isUsed || !this.isUsed && e.isUsed))), this._tableItems = n(this, r, p).call(this, this.filteredData);
};
s.styles = [
  C`
            .grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;
            }

            uui-box {
                margin-bottom: 20px;
            }

            .alert {
                display: flex;
                gap: 12px;
                padding: 12px;
                background: var(--uui-color-warning-emphasis);
                border-radius: 6px;
                align-items: flex-start;
            }

            .alert uui-icon {
                color: var(--uui-color-warning);
                flex-shrink: 0;
            }

            .alert h4 {
                margin: 0 0 8px 0;
            }

            .alert p {
                margin: 0;
            }
        `
];
l([
  u()
], s.prototype, "_tableConfig", 2);
l([
  u()
], s.prototype, "_tableColumns", 2);
l([
  u()
], s.prototype, "_tableItems", 2);
l([
  u()
], s.prototype, "data", 2);
l([
  u()
], s.prototype, "filteredData", 2);
l([
  u()
], s.prototype, "propertyEditors", 2);
l([
  u()
], s.prototype, "searchName", 2);
l([
  u()
], s.prototype, "selectedEditor", 2);
l([
  u()
], s.prototype, "selectedDbType", 2);
l([
  u()
], s.prototype, "isUsed", 2);
l([
  u()
], s.prototype, "isLoading", 2);
l([
  u()
], s.prototype, "editorOptions", 2);
l([
  u()
], s.prototype, "dbTypeOptions", 2);
s = l([
  U("godmode-datatype-browser")
], s);
const k = s;
export {
  s as GodModeDataTypeBrowserElement,
  k as default
};
//# sourceMappingURL=godmode-datatype-browser.element-BELJqZPB.js.map
