import { UmbElementMixin as M } from "@umbraco-cms/backoffice/element-api";
import { LitElement as O, html as v, css as P, state as r, customElement as V } from "@umbraco-cms/backoffice/external/lit";
import { tryExecuteAndNotify as B } from "@umbraco-cms/backoffice/resources";
import { s as H, G as T } from "./index-PYLMTfOZ.js";
import { DirectionModel as $ } from "@umbraco-cms/backoffice/external/backend-api";
var U = Object.defineProperty, R = Object.getOwnPropertyDescriptor, n = (t, e, l, c) => {
  for (var i = c > 1 ? void 0 : c ? R(e, l) : e, d = t.length - 1, m; d >= 0; d--)
    (m = t[d]) && (i = (c ? m(e, l, i) : m(i)) || i);
  return c && i && U(e, l, i), i;
}, j = (t, e, l) => {
  if (!e.has(t))
    throw TypeError("Cannot " + l);
}, h = (t, e, l) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, l);
}, s = (t, e, l) => (j(t, e, "access private method"), l), b, C, N, x, p, f, g, L, _, A, y, k, S, E, w, W, D, G, o, u;
let a = class extends M(O) {
  constructor() {
    super(), h(this, b), h(this, N), h(this, p), h(this, g), h(this, _), h(this, y), h(this, S), h(this, w), h(this, D), h(this, o), this._tableConfig = {
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
    super.connectedCallback(), s(this, N, x).call(this);
  }
  render() {
    return v`
            <umb-body-layout>
                <godmode-header name="DI Services Browser" slot="header"></godmode-header>
                <uui-box>
                    <div class="grid">
                        <div>
                            <uui-label>Names:</uui-label>
                            <uui-input
                                placeholder="Search names"
                                .value=${this.searchName}
                                @input=${s(this, g, L)}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label>Implemented:</uui-label>
                            <uui-input
                                placeholder="Search implemented"
                                .value=${this.searchImplemented}
                                @input=${s(this, _, A)}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label>Lifetime:</uui-label>
                            <uui-select
                                .options=${this.lifetimes}
                                .value=${this.selectedLifetime}
                                @change=${s(this, y, k)}>
                            </uui-select>
                        </div>
                        <div>
                            <uui-label>Namespace:</uui-label>
                            <uui-select
                                .options=${this.namespaces}
                                .value=${this.selectedNamespace}
                                @change=${s(this, S, E)}>
                            </uui-select>
                        </div>
                        <div>
                            <uui-label>Implemented NS:</uui-label>
                            <uui-select
                                .options=${this.implementedNamespaces}
                                .value=${this.selectedImplementedNamespace}
                                @change=${s(this, w, W)}>
                            </uui-select>
                        </div>
                        <div>
                            <uui-label>Visibility:</uui-label>
                            <umb-input-toggle
                                .checked=${this.visibility}
                                ?showLabels=${!0}
                                labelOn="Public"
                                labelOff="Any"
                                @change=${s(this, D, G)}>
                            </umb-input-toggle>
                        </div>
                    </div>
                </uui-box>

                ${this._tableItems.length !== 0 ? v`
                    <uui-box style="--uui-box-default-padding: 0;">
                        <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${s(this, b, C)} />
                    </uui-box>
                ` : v``}
            </umb-body-layout>
        `;
  }
};
b = /* @__PURE__ */ new WeakSet();
C = function(t) {
  const e = t.target, l = e.orderingColumn, c = e.orderingDesc;
  this.filteredData = H(structuredClone(this.data), l, c ? $.DESCENDING : $.ASCENDING), this._tableItems = s(this, p, f).call(this, this.filteredData);
};
N = /* @__PURE__ */ new WeakSet();
x = async function() {
  const { data: t } = await B(this, T.getUmbracoManagementApiV1GodModeGetRegisteredServices());
  if (t) {
    this.data = t, this.filteredData = structuredClone(this.data), this._tableItems = s(this, p, f).call(this, this.filteredData);
    let e = [...new Set(this.data.map((i) => i.lifetime))];
    this.lifetimes = e.map((i) => ({ name: i, value: i })), this.lifetimes.unshift({ name: "Any", value: "", selected: !0 });
    let l = [...new Set(this.data.map((i) => i.namespace))];
    this.namespaces = l.map((i) => ({ name: i, value: i })), this.namespaces.unshift({ name: "Any", value: "", selected: !0 });
    let c = [...new Set(this.data.map((i) => i.implementNamespace))];
    this.implementedNamespaces = c.map((i) => ({ name: i, value: i })), this.implementedNamespaces.unshift({ name: "Any", value: "", selected: !0 });
  }
};
p = /* @__PURE__ */ new WeakSet();
f = function(t) {
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
g = /* @__PURE__ */ new WeakSet();
L = function(t) {
  const e = t.target.value;
  this.searchName = e, s(this, o, u).call(this);
};
_ = /* @__PURE__ */ new WeakSet();
A = function(t) {
  const e = t.target.value;
  this.searchImplemented = e, s(this, o, u).call(this);
};
y = /* @__PURE__ */ new WeakSet();
k = function(t) {
  const e = t.target.value;
  this.selectedLifetime = e, s(this, o, u).call(this);
};
S = /* @__PURE__ */ new WeakSet();
E = function(t) {
  const e = t.target.value;
  this.selectedNamespace = e, s(this, o, u).call(this);
};
w = /* @__PURE__ */ new WeakSet();
W = function(t) {
  const e = t.target.value;
  this.selectedImplementedNamespace = e, s(this, o, u).call(this);
};
D = /* @__PURE__ */ new WeakSet();
G = function(t) {
  const e = t.target.checked;
  this.visibility = e, s(this, o, u).call(this);
};
o = /* @__PURE__ */ new WeakSet();
u = function() {
  var t, e, l, c, i, d;
  this.filteredData = structuredClone(this.data), this.searchName !== "" && (this.filteredData = (t = this.filteredData) == null ? void 0 : t.filter((m) => m.name.toLowerCase().includes(this.searchName))), this.searchImplemented !== "" && (this.filteredData = (e = this.filteredData) == null ? void 0 : e.filter((m) => {
    var I;
    return (I = m.implementName) == null ? void 0 : I.toLowerCase().includes(this.searchImplemented);
  })), this.selectedLifetime !== "" && (this.filteredData = (l = this.filteredData) == null ? void 0 : l.filter((m) => m.lifetime === this.selectedLifetime)), this.selectedNamespace !== "" && (this.filteredData = (c = this.filteredData) == null ? void 0 : c.filter((m) => m.namespace === this.selectedNamespace)), this.selectedImplementedNamespace !== "" && (this.filteredData = (i = this.filteredData) == null ? void 0 : i.filter((m) => m.implementNamespace === this.selectedImplementedNamespace)), this.filteredData = (d = this.filteredData) == null ? void 0 : d.filter((m) => m.isPublic === this.visibility), this.filteredData ? this._tableItems = s(this, p, f).call(this, this.filteredData) : this._tableItems = [];
};
a.styles = [
  P`
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
n([
  r()
], a.prototype, "_tableConfig", 2);
n([
  r()
], a.prototype, "_tableColumns", 2);
n([
  r()
], a.prototype, "_tableItems", 2);
n([
  r()
], a.prototype, "data", 2);
n([
  r()
], a.prototype, "filteredData", 2);
n([
  r()
], a.prototype, "searchName", 2);
n([
  r()
], a.prototype, "searchImplemented", 2);
n([
  r()
], a.prototype, "namespaces", 2);
n([
  r()
], a.prototype, "selectedNamespace", 2);
n([
  r()
], a.prototype, "implementedNamespaces", 2);
n([
  r()
], a.prototype, "selectedImplementedNamespace", 2);
n([
  r()
], a.prototype, "lifetimes", 2);
n([
  r()
], a.prototype, "selectedLifetime", 2);
n([
  r()
], a.prototype, "visibility", 2);
a = n([
  V("godmode-services-browser")
], a);
const Q = a;
export {
  a as GodModeServicesBrowserElement,
  Q as default
};
//# sourceMappingURL=godmode-services-browser.element-CKZfR4u8.js.map
