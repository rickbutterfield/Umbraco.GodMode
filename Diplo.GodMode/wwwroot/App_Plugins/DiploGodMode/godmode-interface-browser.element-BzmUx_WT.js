import { html as n, repeat as A, css as I, state as r, customElement as w } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as _ } from "@umbraco-cms/backoffice/lit-element";
import { G as f } from "./index-x45slcvs.js";
import { tryExecuteAndNotify as y } from "@umbraco-cms/backoffice/resources";
var $ = Object.defineProperty, x = Object.getOwnPropertyDescriptor, i = (t, e, s, o) => {
  for (var l = o > 1 ? void 0 : o ? x(e, s) : e, u = t.length - 1, c; u >= 0; u--)
    (c = t[u]) && (l = (o ? c(e, s, l) : c(l)) || l);
  return o && l && $(e, s, l), l;
}, M = (t, e, s) => {
  if (!e.has(t))
    throw TypeError("Cannot " + s);
}, h = (t, e, s) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, s);
}, p = (t, e, s) => (M(t, e, "access private method"), s), m, v, b, O, d, g;
let a = class extends _ {
  constructor() {
    super(), h(this, m), h(this, b), h(this, d), this.assemblies = [], this.assemblyOptions = [], this.currentAssembly = void 0, this.currentAssemblyOption = "", this.interfaces = [], this.interfaceOptions = [], this.currentInterface = void 0, this.currentInterfaceOption = "", this.types = [], p(this, m, v).call(this);
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
                      @change=${p(this, b, O)}
                      .value=${this.currentAssemblyOption}>
                  </uui-select>
              </div>
              ${this.currentAssemblyOption !== "" ? n`
                  <div>
                      <uui-label for="search-interface">Interface:</uui-label>
                      <uui-select
                          id="search-interface"
                          .options=${this.interfaceOptions}
                          @change=${p(this, d, g)}
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
                <uui-box>
                  <uui-table>
                      <uui-table-head>
                          <uui-table-head-cell>Implemented By</uui-table-head-cell>
                          <uui-table-head-cell>Namespace</uui-table-head-cell>
                          <uui-table-head-cell>Module</uui-table-head-cell>
                          <uui-table-head-cell>Base Type</uui-table-head-cell>
                      </uui-table-head>

                      ${A(
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
m = /* @__PURE__ */ new WeakSet();
v = async function() {
  const { data: t } = await y(this, f.getUmbracoManagementApiV1GodModeGetAssemblies());
  t && (this.assemblies = t, this.assemblyOptions = this.assemblies.map((e) => ({ name: e.name, value: e.name })), this.assemblyOptions.unshift({ name: "Please select", value: "" }));
};
b = /* @__PURE__ */ new WeakSet();
O = async function(t) {
  if (this.currentAssemblyOption = t.target.value, this.currentAssemblyOption !== "") {
    this.currentAssembly = this.assemblies.find((s) => s.name === this.currentAssemblyOption);
    const { data: e } = await y(this, f.getUmbracoManagementApiV1GodModeGetInterfacesFrom({ assembly: this.currentAssemblyOption }));
    e && (this.interfaces = e, this.interfaceOptions = this.interfaces.map((s) => ({ name: s.name, value: s.name })), this.interfaceOptions.unshift({ name: "Please select", value: "" }));
  } else
    this.currentAssembly = void 0, this.currentInterface = void 0, this.currentInterfaceOption = "", this.interfaces = [], this.interfaceOptions = [];
};
d = /* @__PURE__ */ new WeakSet();
g = async function(t) {
  if (this.currentInterfaceOption = t.target.value, this.currentInterfaceOption !== "") {
    if (this.currentInterface = this.interfaces.find((e) => e.name === this.currentInterfaceOption), this.currentInterface) {
      const { data: e } = await y(this, f.getUmbracoManagementApiV1GodModeGetTypesAssignableFrom({ baseType: this.currentInterface.loadableName }));
      e && (this.types = e);
    }
  } else
    this.currentInterface = void 0, this.types = [];
};
a.styles = [
  I`
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
    `
];
i([
  r()
], a.prototype, "assemblies", 2);
i([
  r()
], a.prototype, "assemblyOptions", 2);
i([
  r()
], a.prototype, "currentAssembly", 2);
i([
  r()
], a.prototype, "currentAssemblyOption", 2);
i([
  r()
], a.prototype, "interfaces", 2);
i([
  r()
], a.prototype, "interfaceOptions", 2);
i([
  r()
], a.prototype, "currentInterface", 2);
i([
  r()
], a.prototype, "currentInterfaceOption", 2);
i([
  r()
], a.prototype, "types", 2);
a = i([
  w("godmode-interface-browser")
], a);
const B = a;
export {
  a as GodModeInterfaceBrowserElement,
  B as default
};
//# sourceMappingURL=godmode-interface-browser.element-BzmUx_WT.js.map
