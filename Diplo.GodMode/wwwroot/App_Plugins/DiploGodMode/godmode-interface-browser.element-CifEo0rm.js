import { html as n, repeat as $, css as A, state as r, customElement as w } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as _ } from "@umbraco-cms/backoffice/lit-element";
import { D as d, s as D, G as f } from "./index-DIYzpCy4.js";
import { tryExecuteAndNotify as g } from "@umbraco-cms/backoffice/resources";
var x = Object.defineProperty, B = Object.getOwnPropertyDescriptor, a = (t, e, i, l) => {
  for (var o = l > 1 ? void 0 : l ? B(e, i) : e, u = t.length - 1, c; u >= 0; u--)
    (c = t[u]) && (o = (l ? c(e, i, o) : c(o)) || o);
  return l && o && x(e, i, o), o;
}, M = (t, e, i) => {
  if (!e.has(t))
    throw TypeError("Cannot " + i);
}, h = (t, e, i) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, i);
}, p = (t, e, i) => (M(t, e, "access private method"), i), b, v, m, O, y, I;
let s = class extends _ {
  constructor() {
    super(), h(this, b), h(this, m), h(this, y), this.assemblies = [], this.assemblyOptions = [], this.currentAssembly = void 0, this.currentAssemblyOption = "", this.interfaces = [], this.interfaceOptions = [], this.currentInterface = void 0, this.currentInterfaceOption = "", this.types = [], this.sortingDesc = !1, this.orderDirection = d.ASCENDING, this.orderBy = "name", p(this, b, v).call(this);
  }
  _sortingHandler(t) {
    this.sortingDesc = this.orderBy === t ? !this.sortingDesc : !1, this.orderBy = t, this.orderDirection = this.sortingDesc ? d.DESCENDING : d.ASCENDING, this.types && (this.types = D(this.types, t, this.orderDirection));
  }
  render() {
    var t;
    return n`
      <umb-body-layout>
        <godmode-header name="Interface Browser" slot="header"></godmode-header>

        <uui-box>
          <div class="grid">
              <div>
                  <uui-label for="search-assembly">Assembly:</uui-label>
                  <uui-select
                      id="search-assembly"
                      .options=${this.assemblyOptions}
                      @change=${p(this, m, O)}
                      .value=${this.currentAssemblyOption}>
                  </uui-select>
              </div>
              ${this.currentAssemblyOption !== "" ? n`
                  <div>
                      <uui-label for="search-interface">Interface:</uui-label>
                      <uui-select
                          id="search-interface"
                          .options=${this.interfaceOptions}
                          @change=${p(this, y, I)}
                          .value=${this.currentInterfaceOption}>
                      </uui-select>
                  </div>
              ` : n``}
          </div>
        </uui-box>

        ${this.currentAssemblyOption === "" ? n`
            <uui-box>Please select an Assembly (above) and then the Interface you wish to browse. You will then see all types that implement the Interface.</uui-box>
          ` : n`
            <h5>${(t = this.currentAssembly) == null ? void 0 : t.value}</h5>

            ${this.types.length !== 0 ? n`
                <uui-box style="--uui-box-default-padding: 0;">
                  <uui-table>
                      <uui-table-head>
                          <uui-table-head-cell style="--uui-table-cell-padding: 0">
                            <button
                            label="Implemented By"
                            style="font-weight: 700; padding: var(--uui-size-4) var(--uui-size-5);"
                            @click=${() => this._sortingHandler("name")}>
                                Implemented By
                                <uui-symbol-sort
                                  ?active=${this.orderBy === "name"}
                                  ?descending=${this.sortingDesc}>
                                </uui-symbol-sort>
                              </button>
                            </uui-table-head-cell>
                          <uui-table-head-cell style="--uui-table-cell-padding: 0">
                            <button
                                label="Namespace"
                                style="font-weight: 700; padding: var(--uui-size-4) var(--uui-size-5);"
                                @click=${() => this._sortingHandler("namespace")}>
                                Namespace
                                <uui-symbol-sort
                                  ?active=${this.orderBy === "namespace"}
                                  ?descending=${this.sortingDesc}>
                                </uui-symbol-sort>
                              </button>
                          </uui-table-head-cell>
                          <uui-table-head-cell style="--uui-table-cell-padding: 0">
                            <button
                                label="Module"
                                style="font-weight: 700; padding: var(--uui-size-4) var(--uui-size-5);"
                                @click=${() => this._sortingHandler("module")}>
                                Module
                                <uui-symbol-sort
                                  ?active=${this.orderBy === "module"}
                                  ?descending=${this.sortingDesc}>
                                </uui-symbol-sort>
                              </button>
                          </uui-table-head-cell>
                          <uui-table-head-cell style="--uui-table-cell-padding: 0">
                            <button
                                label="Base Type"
                                style="font-weight: 700; padding: var(--uui-size-4) var(--uui-size-5);"
                                @click=${() => this._sortingHandler("baseType")}>
                                Base Type
                                <uui-symbol-sort
                                  ?active=${this.orderBy === "baseType"}
                                  ?descending=${this.sortingDesc}>
                                </uui-symbol-sort>
                              </button>
                          </uui-table-head-cell>
                      </uui-table-head>

                      ${$(
      this.types,
      (e) => e.name,
      (e) => n`
                              <uui-table-row>
                                  <uui-table-cell>${e.name}</uui-table-cell>
                                  <uui-table-cell>${e.namespace}</uui-table-cell>
                                  <uui-table-cell><code>${e.module}</code></uui-table-cell>
                                  <uui-table-cell>${e.baseType}</uui-table-cell>
                              </uui-table-row>
                          `
    )}
                  </uui-table>
                </uui-box>
              ` : n``}
          `}
      </umb-body-layout>
    `;
  }
};
b = /* @__PURE__ */ new WeakSet();
v = async function() {
  const { data: t } = await g(this, f.getUmbracoManagementApiV1GodModeGetAssemblies());
  t && (this.assemblies = t, this.assemblyOptions = this.assemblies.map((e) => ({ name: e.name, value: e.name })), this.assemblyOptions.unshift({ name: "Please select", value: "" }));
};
m = /* @__PURE__ */ new WeakSet();
O = async function(t) {
  if (this.currentAssemblyOption = t.target.value, this.currentAssemblyOption !== "") {
    this.currentAssembly = this.assemblies.find((i) => i.name === this.currentAssemblyOption);
    const { data: e } = await g(this, f.getUmbracoManagementApiV1GodModeGetInterfacesFrom({ assembly: this.currentAssemblyOption }));
    e && (this.interfaces = e, this.interfaceOptions = this.interfaces.map((i) => ({ name: i.name, value: i.name })), this.interfaceOptions.unshift({ name: "Please select", value: "" }));
  } else
    this.currentAssembly = void 0, this.currentInterface = void 0, this.currentInterfaceOption = "", this.interfaces = [], this.interfaceOptions = [];
};
y = /* @__PURE__ */ new WeakSet();
I = async function(t) {
  if (this.currentInterfaceOption = t.target.value, this.currentInterfaceOption !== "") {
    if (this.currentInterface = this.interfaces.find((e) => e.name === this.currentInterfaceOption), this.currentInterface) {
      const { data: e } = await g(this, f.getUmbracoManagementApiV1GodModeGetTypesAssignableFrom({ baseType: this.currentInterface.loadableName }));
      e && (this.types = e);
    }
  } else
    this.currentInterface = void 0, this.types = [];
};
s.styles = [
  A`
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

        uui-table-head-cell button {
            padding: var(--uui-size-4) var(--uui-size-5);
            background-color: transparent;
            color: inherit;
            border: none;
            cursor: pointer;
            font-family: var(--uui-font-family);
            font-weight: inherit;
            font-size: inherit;
            display: inline-flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
        }
    `
];
a([
  r()
], s.prototype, "assemblies", 2);
a([
  r()
], s.prototype, "assemblyOptions", 2);
a([
  r()
], s.prototype, "currentAssembly", 2);
a([
  r()
], s.prototype, "currentAssemblyOption", 2);
a([
  r()
], s.prototype, "interfaces", 2);
a([
  r()
], s.prototype, "interfaceOptions", 2);
a([
  r()
], s.prototype, "currentInterface", 2);
a([
  r()
], s.prototype, "currentInterfaceOption", 2);
a([
  r()
], s.prototype, "types", 2);
a([
  r()
], s.prototype, "sortingDesc", 2);
a([
  r()
], s.prototype, "orderDirection", 2);
a([
  r()
], s.prototype, "orderBy", 2);
s = a([
  w("godmode-interface-browser")
], s);
const N = s;
export {
  s as GodModeInterfaceBrowserElement,
  N as default
};
//# sourceMappingURL=godmode-interface-browser.element-CifEo0rm.js.map
