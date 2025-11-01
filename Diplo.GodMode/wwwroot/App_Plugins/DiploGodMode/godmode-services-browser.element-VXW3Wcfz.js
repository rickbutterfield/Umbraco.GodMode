import { UmbElementMixin as C } from "@umbraco-cms/backoffice/element-api";
import { LitElement as $, html as p, css as x, state as c, customElement as L } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute as A } from "@umbraco-cms/backoffice/resources";
import { s as E, G } from "./index--MEPM8tO.js";
import { DirectionModel as v } from "@umbraco-cms/backoffice/external/backend-api";
var M = Object.defineProperty, O = Object.getOwnPropertyDescriptor, b = (t) => {
  throw TypeError(t);
}, r = (t, e, m, o) => {
  for (var i = o > 1 ? void 0 : o ? O(e, m) : e, d = t.length - 1, n; d >= 0; d--)
    (n = t[d]) && (i = (o ? n(e, m, i) : n(i)) || i);
  return o && i && M(e, m, i), i;
}, P = (t, e, m) => e.has(t) || b("Cannot " + m), B = (t, e, m) => e.has(t) ? b("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, m), l = (t, e, m) => (P(t, e, "access private method"), m), a, g, N, h, y, _, D, I, w, S, u;
let s = class extends C($) {
  constructor() {
    super(), B(this, a), this._tableConfig = {
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
        name: "Namespace",
        alias: "namespace",
        allowSorting: !0,
        width: "20%"
      },
      {
        name: "Implemented By",
        alias: "implementName",
        allowSorting: !0,
        width: "25%"
      },
      {
        name: "Implemented Namespace",
        alias: "implementNamespace",
        allowSorting: !0,
        width: "20%"
      },
      {
        name: "Lifetime",
        alias: "lifetime",
        allowSorting: !0,
        width: "10%"
      }
    ], this._tableItems = [], this.data = [], this.filteredData = [], this.searchName = "", this.searchImplemented = "", this.namespaces = [], this.selectedNamespace = "", this.implementedNamespaces = [], this.selectedImplementedNamespace = "", this.lifetimes = [], this.selectedLifetime = "", this.visibility = !1;
  }
  async connectedCallback() {
    super.connectedCallback(), l(this, a, N).call(this);
  }
  render() {
    return p`
            <umb-body-layout>
                <godmode-header name="DI Services Browser" slot="header"></godmode-header>
                <uui-box>
                    <div class="grid">
                        <div>
                            <uui-label>Names:</uui-label>
                            <uui-input
                                placeholder="Search names"
                                .value=${this.searchName}
                                @input=${l(this, a, y)}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label>Implemented:</uui-label>
                            <uui-input
                                placeholder="Search implemented"
                                .value=${this.searchImplemented}
                                @input=${l(this, a, _)}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label>Lifetime:</uui-label>
                            <uui-select
                                .options=${this.lifetimes}
                                .value=${this.selectedLifetime}
                                @change=${l(this, a, D)}>
                            </uui-select>
                        </div>
                        <div>
                            <uui-label>Namespace:</uui-label>
                            <uui-select
                                .options=${this.namespaces}
                                .value=${this.selectedNamespace}
                                @change=${l(this, a, I)}>
                            </uui-select>
                        </div>
                        <div>
                            <uui-label>Implemented NS:</uui-label>
                            <uui-select
                                .options=${this.implementedNamespaces}
                                .value=${this.selectedImplementedNamespace}
                                @change=${l(this, a, w)}>
                            </uui-select>
                        </div>
                        <div>
                            <uui-label>Visibility:</uui-label>
                            <umb-input-toggle
                                .checked=${this.visibility}
                                ?showLabels=${!0}
                                labelOn="Public"
                                labelOff="Any"
                                @change=${l(this, a, S)}>
                            </umb-input-toggle>
                        </div>
                    </div>
                </uui-box>

                ${this._tableItems.length !== 0 ? p`
                    <uui-box style="--uui-box-default-padding: 0;">
                        <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${l(this, a, g)} />
                    </uui-box>
                ` : p``}
            </umb-body-layout>
        `;
  }
};
a = /* @__PURE__ */ new WeakSet();
g = function(t) {
  const e = t.target, m = e.orderingColumn, o = e.orderingDesc;
  this.filteredData = E(structuredClone(this.data), m, o ? v.DESCENDING : v.ASCENDING), this._tableItems = l(this, a, h).call(this, this.filteredData);
};
N = async function() {
  const { data: t } = await A(this, G.getUmbracoManagementApiV1GodModeGetRegisteredServices());
  if (t) {
    this.data = t, this.filteredData = structuredClone(this.data), this._tableItems = l(this, a, h).call(this, this.filteredData);
    let e = [...new Set(this.data.map((i) => i.lifetime))];
    this.lifetimes = e.map((i) => ({ name: i, value: i })), this.lifetimes.unshift({ name: "Any", value: "", selected: !0 });
    let m = [...new Set(this.data.map((i) => i.namespace))];
    this.namespaces = m.map((i) => ({ name: i, value: i })), this.namespaces.unshift({ name: "Any", value: "", selected: !0 });
    let o = [...new Set(this.data.map((i) => i.implementNamespace))];
    this.implementedNamespaces = o.map((i) => ({ name: i, value: i })), this.implementedNamespaces.unshift({ name: "Any", value: "", selected: !0 });
  }
};
h = function(t) {
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
        columnAlias: "implementName",
        value: e.implementName
      },
      {
        columnAlias: "implementNamespace",
        value: e.implementNamespace
      },
      {
        columnAlias: "lifetime",
        value: e.lifetime
      }
    ]
  }));
};
y = function(t) {
  const e = t.target.value;
  this.searchName = e, l(this, a, u).call(this);
};
_ = function(t) {
  const e = t.target.value;
  this.searchImplemented = e, l(this, a, u).call(this);
};
D = function(t) {
  const e = t.target.value;
  this.selectedLifetime = e, l(this, a, u).call(this);
};
I = function(t) {
  const e = t.target.value;
  this.selectedNamespace = e, l(this, a, u).call(this);
};
w = function(t) {
  const e = t.target.value;
  this.selectedImplementedNamespace = e, l(this, a, u).call(this);
};
S = function(t) {
  const e = t.target.checked;
  this.visibility = e, l(this, a, u).call(this);
};
u = function() {
  var t, e, m, o, i, d;
  this.filteredData = structuredClone(this.data), this.searchName !== "" && (this.filteredData = (t = this.filteredData) == null ? void 0 : t.filter((n) => n.name.toLowerCase().includes(this.searchName.toLowerCase()))), this.searchImplemented !== "" && (this.filteredData = (e = this.filteredData) == null ? void 0 : e.filter((n) => {
    var f;
    return (f = n.implementName) == null ? void 0 : f.toLowerCase().includes(this.searchImplemented.toLowerCase());
  })), this.selectedLifetime !== "" && (this.filteredData = (m = this.filteredData) == null ? void 0 : m.filter((n) => n.lifetime === this.selectedLifetime)), this.selectedNamespace !== "" && (this.filteredData = (o = this.filteredData) == null ? void 0 : o.filter((n) => n.namespace === this.selectedNamespace)), this.selectedImplementedNamespace !== "" && (this.filteredData = (i = this.filteredData) == null ? void 0 : i.filter((n) => n.implementNamespace === this.selectedImplementedNamespace)), this.filteredData = (d = this.filteredData) == null ? void 0 : d.filter((n) => n.isPublic === this.visibility), this.filteredData ? this._tableItems = l(this, a, h).call(this, this.filteredData) : this._tableItems = [];
};
s.styles = [
  x`
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

            .inline-flex {
                display: inline-flex;
                align-items: center;

                uui-icon {
                    margin-right: 6px;
                }
            }
        `
];
r([
  c()
], s.prototype, "_tableConfig", 2);
r([
  c()
], s.prototype, "_tableColumns", 2);
r([
  c()
], s.prototype, "_tableItems", 2);
r([
  c()
], s.prototype, "data", 2);
r([
  c()
], s.prototype, "filteredData", 2);
r([
  c()
], s.prototype, "searchName", 2);
r([
  c()
], s.prototype, "searchImplemented", 2);
r([
  c()
], s.prototype, "namespaces", 2);
r([
  c()
], s.prototype, "selectedNamespace", 2);
r([
  c()
], s.prototype, "implementedNamespaces", 2);
r([
  c()
], s.prototype, "selectedImplementedNamespace", 2);
r([
  c()
], s.prototype, "lifetimes", 2);
r([
  c()
], s.prototype, "selectedLifetime", 2);
r([
  c()
], s.prototype, "visibility", 2);
s = r([
  L("godmode-services-browser")
], s);
const R = s;
export {
  s as GodModeServicesBrowserElement,
  R as default
};
//# sourceMappingURL=godmode-services-browser.element-VXW3Wcfz.js.map
