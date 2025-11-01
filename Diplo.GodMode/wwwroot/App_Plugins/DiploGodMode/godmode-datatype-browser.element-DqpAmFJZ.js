import { UmbElementMixin as E } from "@umbraco-cms/backoffice/element-api";
import { LitElement as C, html as n, css as U, state as l, customElement as $ } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute as m } from "@umbraco-cms/backoffice/resources";
import { s as S, G as y } from "./index-D2VaFLfx.js";
import { DirectionModel as b } from "@umbraco-cms/backoffice/external/backend-api";
var O = Object.defineProperty, I = Object.getOwnPropertyDescriptor, g = (e) => {
  throw TypeError(e);
}, r = (e, t, a, i) => {
  for (var u = i > 1 ? void 0 : i ? I(t, a) : t, c = e.length - 1, f; c >= 0; c--)
    (f = e[c]) && (u = (i ? f(t, a, u) : f(u)) || u);
  return i && u && O(t, a, u), u;
}, N = (e, t, a) => t.has(e) || g("Cannot " + a), A = (e, t, a) => t.has(e) ? g("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), d = (e, t, a) => (N(e, t, "access private method"), a), o, v, _, h, D, T, w, x, p;
let s = class extends E(C) {
  constructor() {
    super(), A(this, o), this._tableConfig = {
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
        name: "DB Type",
        alias: "dbType",
        allowSorting: !0
      },
      {
        name: "Used",
        alias: "isUsed",
        allowSorting: !0
      },
      {
        name: "Updated",
        alias: "updateDate",
        allowSorting: !0
      }
    ], this._tableItems = [], this.data = [], this.filteredData = [], this.propertyEditors = [], this.searchName = "", this.selectedEditor = "", this.selectedDbType = "", this.isUsed = null, this.isUsedOptions = [
      { name: "Any", value: "", selected: !0 },
      { name: "Yes", value: "true" },
      { name: "No", value: "false" }
    ], this.isLoading = !0, this.editorOptions = [], this.dbTypeOptions = [];
  }
  async connectedCallback() {
    super.connectedCallback(), d(this, o, _).call(this);
  }
  render() {
    return n`
            <umb-body-layout>
                <godmode-header name="DataType Browser" slot="header"></godmode-header>
                
                <uui-box headline="Search Filters">
                    <div class="grid">
                        <div>
                            <uui-label>Search:</uui-label>
                            <uui-input
                                placeholder="Filter data types"
                                .value=${this.searchName}
                                @input=${d(this, o, D)}>
                            </uui-input>
                        </div>

                        <div>
                            <uui-label>Editor:</uui-label>
                            <uui-select .options=${this.editorOptions} @change=${d(this, o, T)}>
                            </uui-select>
                        </div>

                        <div>
                            <uui-label>DB Type:</uui-label>
                            <uui-select .options=${this.dbTypeOptions} @change=${d(this, o, w)}>
                            </uui-select>
                        </div>

                        <div>
                            <uui-label>Is Used?</uui-label>
                            <uui-select .options=${this.isUsedOptions} @change=${d(this, o, x)}>
                            </uui-select>
                        </div>
                    </div>
                </uui-box>

                ${this.isLoading ? n`
                    <uui-loader-bar></uui-loader-bar>
                ` : n``}

                ${!this.isLoading && this._tableItems.length > 0 ? n`
                    <uui-box style="--uui-box-default-padding: 0;">
                        <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${d(this, o, v)} />
                    </uui-box>
                ` : n``}

                ${!this.isLoading && this._tableItems.length === 0 && this.data.length > 0 ? n`
                    <uui-box>
                        <p>No data types match the current filters.</p>
                    </uui-box>
                ` : n``}

                ${this.isLoading ? n`` : n`
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
o = /* @__PURE__ */ new WeakSet();
v = function(e) {
  const t = e.target, a = t.orderingColumn, i = t.orderingDesc;
  this.filteredData = S(structuredClone(this.data), a, i ? b.DESCENDING : b.ASCENDING), this._tableItems = d(this, o, h).call(this, this.filteredData);
};
_ = async function() {
  this.isLoading = !0;
  const { data: e } = await m(this, y.getDataTypes());
  if (e) {
    this.data = e, this.filteredData = structuredClone(this.data), this._tableItems = d(this, o, h).call(this, this.filteredData);
    const a = /* @__PURE__ */ new Set();
    e.forEach((i) => {
      i.dbType && a.add(i.dbType);
    }), this.dbTypeOptions = Array.from(a).map((i) => ({ name: i, value: i })), this.dbTypeOptions.unshift({ name: "Any", value: "" });
  }
  const { data: t } = await m(this, y.getPropertyEditors());
  if (t) {
    this.propertyEditors = t;
    const a = /* @__PURE__ */ new Set();
    t.forEach((i) => {
      i.alias && a.add(i.alias);
    }), this.editorOptions = Array.from(a).map((i) => ({ name: i, value: i })), this.editorOptions.unshift({ name: "Any", value: "" });
  }
  this.isLoading = !1;
};
h = function(e) {
  return e.map((t) => {
    var a;
    return {
      id: ((a = t.id) == null ? void 0 : a.toString()) || "",
      data: [
        {
          columnAlias: "name",
          value: n`<strong>${t.name || ""}</strong>`
        },
        {
          columnAlias: "alias",
          value: t.alias
        },
        {
          columnAlias: "dbType",
          value: n`<code>${t.dbType}</code>`
        },
        {
          columnAlias: "isUsed",
          value: t.isUsed ? n`<uui-icon name="icon-check" style="color: green;"></uui-icon>` : n`<uui-icon name="icon-wrong" style="color: red;"></uui-icon>`
        },
        {
          columnAlias: "updateDate",
          value: t.updateDate ? new Date(t.updateDate).toLocaleString() : ""
        }
      ]
    };
  });
};
D = function(e) {
  const t = e.target.value;
  this.searchName = t.toLowerCase(), d(this, o, p).call(this);
};
T = function(e) {
  this.selectedEditor = e.target.value, d(this, o, p).call(this);
};
w = function(e) {
  this.selectedDbType = e.target.value, d(this, o, p).call(this);
};
x = function(e) {
  const t = e.target.value;
  this.isUsed = t === "true" ? !0 : t === "false" ? !1 : null, d(this, o, p).call(this);
};
p = function() {
  this.filteredData = this.data.filter((e) => !(this.searchName && e.name && !e.name.toLowerCase().includes(this.searchName) || this.selectedEditor && e.alias && e.alias !== this.selectedEditor || this.selectedDbType && e.dbType && e.dbType !== this.selectedDbType || this.isUsed !== null && (this.isUsed && !e.isUsed || !this.isUsed && e.isUsed))), this._tableItems = d(this, o, h).call(this, this.filteredData);
};
s.styles = [
  U`
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
r([
  l()
], s.prototype, "_tableConfig", 2);
r([
  l()
], s.prototype, "_tableColumns", 2);
r([
  l()
], s.prototype, "_tableItems", 2);
r([
  l()
], s.prototype, "data", 2);
r([
  l()
], s.prototype, "filteredData", 2);
r([
  l()
], s.prototype, "propertyEditors", 2);
r([
  l()
], s.prototype, "searchName", 2);
r([
  l()
], s.prototype, "selectedEditor", 2);
r([
  l()
], s.prototype, "selectedDbType", 2);
r([
  l()
], s.prototype, "isUsed", 2);
r([
  l()
], s.prototype, "isUsedOptions", 2);
r([
  l()
], s.prototype, "isLoading", 2);
r([
  l()
], s.prototype, "editorOptions", 2);
r([
  l()
], s.prototype, "dbTypeOptions", 2);
s = r([
  $("godmode-datatype-browser")
], s);
const k = s;
export {
  s as GodModeDataTypeBrowserElement,
  k as default
};
//# sourceMappingURL=godmode-datatype-browser.element-DqpAmFJZ.js.map
