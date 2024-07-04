import { html as r, css as $, state as n, customElement as C } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as S } from "@umbraco-cms/backoffice/lit-element";
import { s as D, D as I, G as g } from "./index-C2dn3IU5.js";
import { tryExecuteAndNotify as v } from "@umbraco-cms/backoffice/resources";
var G = Object.defineProperty, M = Object.getOwnPropertyDescriptor, a = (t, e, s, l) => {
  for (var o = l > 1 ? void 0 : l ? M(e, s) : e, p = t.length - 1, h; p >= 0; p--)
    (h = t[p]) && (o = (l ? h(e, s, o) : h(o)) || o);
  return l && o && G(e, s, o), o;
}, E = (t, e, s) => {
  if (!e.has(t))
    throw TypeError("Cannot " + s);
}, u = (t, e, s) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, s);
}, c = (t, e, s) => (E(t, e, "access private method"), s), f, O, d, A, b, w, y, x, m, _;
let i = class extends S {
  constructor() {
    super(), u(this, f), u(this, d), u(this, b), u(this, y), u(this, m), this._tableConfig = {
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
    ], this._tableItems = [], this.assemblies = [], this.assemblyOptions = [], this.currentAssembly = void 0, this.currentAssemblyOption = "", this.interfaces = [], this.interfaceOptions = [], this.currentInterface = void 0, this.currentInterfaceOption = "", this.types = [], c(this, d, A).call(this);
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
                      @change=${c(this, b, w)}
                      .value=${this.currentAssemblyOption}>
                  </uui-select>
              </div>
              ${this.currentAssemblyOption !== "" ? r`
                  <div>
                      <uui-label for="search-interface">Interface:</uui-label>
                      <uui-select
                          id="search-interface"
                          .options=${this.interfaceOptions}
                          @change=${c(this, y, x)}
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
                            <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${c(this, f, O)} />
                        </uui-box>
                    ` : r``}
                </uui-box>
              ` : r``}
          `}
      </umb-body-layout>
    `;
  }
};
f = /* @__PURE__ */ new WeakSet();
O = function(t) {
  const e = t.target, s = e.orderingColumn, l = e.orderingDesc;
  this.types = D(this.types, s, l ? I.DESCENDING : I.ASCENDING), this._tableItems = c(this, m, _).call(this, this.types);
};
d = /* @__PURE__ */ new WeakSet();
A = async function() {
  const { data: t } = await v(this, g.getUmbracoManagementApiV1GodModeGetAssemblies());
  t && (this.assemblies = t, this.assemblyOptions = this.assemblies.map((e) => ({ name: e.name, value: e.name })), this.assemblyOptions.unshift({ name: "Please select", value: "" }));
};
b = /* @__PURE__ */ new WeakSet();
w = async function(t) {
  if (this.currentAssemblyOption = t.target.value, this.currentAssemblyOption !== "") {
    this.currentAssembly = this.assemblies.find((s) => s.name === this.currentAssemblyOption);
    const { data: e } = await v(this, g.getUmbracoManagementApiV1GodModeGetInterfacesFrom({ assembly: this.currentAssemblyOption }));
    e && (this.interfaces = e, this.interfaceOptions = this.interfaces.map((s) => ({ name: s.name, value: s.name })), this.interfaceOptions.unshift({ name: "Please select", value: "" }));
  } else
    this.currentAssembly = void 0, this.currentInterface = void 0, this.currentInterfaceOption = "", this.interfaces = [], this.interfaceOptions = [];
};
y = /* @__PURE__ */ new WeakSet();
x = async function(t) {
  if (this.currentInterfaceOption = t.target.value, this.currentInterfaceOption !== "") {
    if (this.currentInterface = this.interfaces.find((e) => e.name === this.currentInterfaceOption), this.currentInterface) {
      const { data: e } = await v(this, g.getUmbracoManagementApiV1GodModeGetTypesAssignableFrom({ baseType: this.currentInterface.loadableName }));
      e && (this.types = e, this._tableItems = c(this, m, _).call(this, this.types));
    }
  } else
    this.currentInterface = void 0, this.types = [];
};
m = /* @__PURE__ */ new WeakSet();
_ = function(t) {
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
  $`
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
  C("godmode-interface-browser")
], i);
const B = i;
export {
  i as GodModeInterfaceBrowserElement,
  B as default
};
//# sourceMappingURL=godmode-interface-browser.element-Don4b7T6.js.map
