import { html as r, css as O, state as n, customElement as A } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as w } from "@umbraco-cms/backoffice/lit-element";
import { s as x, D as b, a as h } from "./index-CJ2F2uoa.js";
import { tryExecute as f } from "@umbraco-cms/backoffice/resources";
var $ = Object.defineProperty, C = Object.getOwnPropertyDescriptor, y = (t) => {
  throw TypeError(t);
}, a = (t, e, s, c) => {
  for (var l = c > 1 ? void 0 : c ? C(e, s) : e, m = t.length - 1, p; m >= 0; m--)
    (p = t[m]) && (l = (c ? p(e, s, l) : p(l)) || l);
  return c && l && $(e, s, l), l;
}, M = (t, e, s) => e.has(t) || y("Cannot " + s), G = (t, e, s) => e.has(t) ? y("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), u = (t, e, s) => (M(t, e, "access private method"), s), o, g, v, I, _, d;
let i = class extends w {
  constructor() {
    super(), G(this, o), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "Implemented By",
        alias: "name",
        allowSorting: !0
      },
      {
        name: "Namespace",
        alias: "namespace",
        allowSorting: !0
      },
      {
        name: "Module",
        alias: "module",
        allowSorting: !0
      },
      {
        name: "Base Type",
        alias: "baseType",
        allowSorting: !0
      }
    ], this._tableItems = [], this.assemblies = [], this.assemblyOptions = [], this.currentAssembly = void 0, this.currentAssemblyOption = "", this.interfaces = [], this.interfaceOptions = [], this.currentInterface = void 0, this.currentInterfaceOption = "", this.types = [], u(this, o, v).call(this);
  }
  render() {
    var t;
    return r`
      <umb-body-layout>
        <godmode-header name="Interface Browser" slot="header"></godmode-header>

        <uui-box>
          <div class="grid">
              <div>
                  <uui-label for="search-assembly">Assembly:</uui-label>
                  <uui-select
                      id="search-assembly"
                      .options=${this.assemblyOptions}
                      @change=${u(this, o, I)}
                      .value=${this.currentAssemblyOption}>
                  </uui-select>
              </div>
              ${this.currentAssemblyOption !== "" ? r`
                  <div>
                      <uui-label for="search-interface">Interface:</uui-label>
                      <uui-select
                          id="search-interface"
                          .options=${this.interfaceOptions}
                          @change=${u(this, o, _)}
                          .value=${this.currentInterfaceOption}>
                      </uui-select>
                  </div>
              ` : r``}
          </div>
        </uui-box>

        ${this.currentAssemblyOption === "" ? r`
            <uui-box>Please select an Assembly (above) and then the Interface you wish to browse. You will then see all types that implement the Interface.</uui-box>
          ` : r`
            <h5>${(t = this.currentAssembly) == null ? void 0 : t.value}</h5>

            ${this.types.length !== 0 ? r`
                <uui-box style="--uui-box-default-padding: 0;">
                  ${this._tableItems.length !== 0 ? r`
                        <uui-box style="--uui-box-default-padding: 0;">
                            <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${u(this, o, g)} />
                        </uui-box>
                    ` : r``}
                </uui-box>
              ` : r``}
          `}
      </umb-body-layout>
    `;
  }
};
o = /* @__PURE__ */ new WeakSet();
g = function(t) {
  const e = t.target, s = e.orderingColumn, c = e.orderingDesc;
  this.types = x(this.types, s, c ? b.DESCENDING : b.ASCENDING), this._tableItems = u(this, o, d).call(this, this.types);
};
v = async function() {
  const { data: t } = await f(this, h.getUmbracoManagementApiV1GodModeGetAssemblies());
  t && (this.assemblies = t, this.assemblyOptions = this.assemblies.map((e) => ({ name: e.name, value: e.name })), this.assemblyOptions.unshift({ name: "Please select", value: "" }));
};
I = async function(t) {
  if (this.currentAssemblyOption = t.target.value, this.currentAssemblyOption !== "") {
    this.currentAssembly = this.assemblies.find((s) => s.name === this.currentAssemblyOption);
    const { data: e } = await f(this, h.getUmbracoManagementApiV1GodModeGetInterfacesFrom({ query: { assembly: this.currentAssemblyOption } }));
    e && (this.interfaces = e, this.interfaceOptions = this.interfaces.map((s) => ({ name: s.name, value: s.name })), this.interfaceOptions.unshift({ name: "Please select", value: "" }));
  } else
    this.currentAssembly = void 0, this.currentInterface = void 0, this.currentInterfaceOption = "", this.interfaces = [], this.interfaceOptions = [];
};
_ = async function(t) {
  if (this.currentInterfaceOption = t.target.value, this.currentInterfaceOption !== "") {
    if (this.currentInterface = this.interfaces.find((e) => e.name === this.currentInterfaceOption), this.currentInterface) {
      const { data: e } = await f(this, h.getUmbracoManagementApiV1GodModeGetTypesAssignableFrom({ query: { baseType: this.currentInterface.loadableName } }));
      e && (this.types = e, this._tableItems = u(this, o, d).call(this, this.types));
    }
  } else
    this.currentInterface = void 0, this.types = [];
};
d = function(t) {
  return t.map((e) => ({
    id: e.name,
    data: [
      {
        columnAlias: "name",
        value: e.name
      },
      {
        columnAlias: "namespace",
        value: e.namespace
      },
      {
        columnAlias: "module",
        value: e.module
      },
      {
        columnAlias: "baseType",
        value: e.baseType
      }
    ]
  }));
};
i.styles = [
  O`
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
  n()
], i.prototype, "_tableConfig", 2);
a([
  n()
], i.prototype, "_tableColumns", 2);
a([
  n()
], i.prototype, "_tableItems", 2);
a([
  n()
], i.prototype, "assemblies", 2);
a([
  n()
], i.prototype, "assemblyOptions", 2);
a([
  n()
], i.prototype, "currentAssembly", 2);
a([
  n()
], i.prototype, "currentAssemblyOption", 2);
a([
  n()
], i.prototype, "interfaces", 2);
a([
  n()
], i.prototype, "interfaceOptions", 2);
a([
  n()
], i.prototype, "currentInterface", 2);
a([
  n()
], i.prototype, "currentInterfaceOption", 2);
a([
  n()
], i.prototype, "types", 2);
i = a([
  A("godmode-interface-browser")
], i);
const P = i;
export {
  i as GodModeInterfaceBrowserElement,
  P as default
};
//# sourceMappingURL=godmode-interface-browser.element-BO6ivdFa.js.map
