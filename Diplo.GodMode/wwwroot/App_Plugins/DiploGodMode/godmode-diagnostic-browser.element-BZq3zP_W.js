import { html as c, repeat as b, css as V, state as n, customElement as x } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as $ } from "@umbraco-cms/backoffice/lit-element";
import { G as C } from "./services.gen-CEv4CA0_.js";
import { tryExecuteAndNotify as K } from "@umbraco-cms/backoffice/resources";
var E = Object.defineProperty, D = Object.getOwnPropertyDescriptor, o = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? D(e, i) : e, d = t.length - 1, f; d >= 0; d--)
    (f = t[d]) && (r = (s ? f(e, i, r) : f(r)) || r);
  return s && r && E(e, i, r), r;
}, k = (t, e, i) => {
  if (!e.has(t))
    throw TypeError("Cannot " + i);
}, l = (t, e, i) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, i);
}, u = (t, e, i) => (k(t, e, "access private method"), i), p, S, g, G, v, w, h, y, m, _;
let a = class extends $ {
  constructor() {
    super(), l(this, p), l(this, g), l(this, v), l(this, h), l(this, m), this.diagnostics = [], this.currentGroup = void 0, this.currentGroupId = "", this.searchKey = "", this.searchValue = "", this.configurationGroups = [], this.loadDiagnostics();
  }
  async loadDiagnostics() {
    var e;
    const { data: t } = await K(this, C.getUmbracoManagementApiV1GodModeGetEnvironmentDiagnostics());
    if (t) {
      this.diagnostics = t;
      const i = t.map((s) => ({ name: s.title, value: s.id.toString(), selected: s.id === 0 }));
      i.unshift({ name: "Select", value: "", selected: !1 }), this.configurationGroups = i, this.currentGroup = this.diagnostics[0], this.currentGroupId = (e = this.diagnostics[0]) == null ? void 0 : e.id.toString(), this.filteredSections = this.currentGroup.sections;
    }
  }
  render() {
    return c`
            <umb-body-layout>
                <godmode-header name="Diagnostics" slot="header"></godmode-header>

                <uui-box>
                    <div class="grid">
                        <div>
                            <uui-label for="search-key">Search Names:</uui-label>
                            <uui-input
                                id="search-key"
                                .value=${this.searchKey}
                                @input=${u(this, g, G)}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label for="search-value">Search Values:</uui-label>
                            <uui-input
                                id="search-value"
                                .value=${this.searchValue}
                                @input=${u(this, v, w)}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label for="search-section">Configuration Group:</uui-label>
                            <uui-select
                                id="search-section"
                                .options=${this.configurationGroups}
                                @change=${u(this, p, S)}
                                .value=${this.currentGroupId}>
                            </uui-select>
                        </div>
                    </div>
                </uui-box>

                ${b(
      this.filteredSections,
      (t) => t.heading,
      (t) => t.diagnostics.length !== 0 ? c`
                            <uui-box headline=${t.heading}>
                                <uui-table>
                                    <uui-table-head>
                                        <uui-table-head-cell style="width: 30%">Key</uui-table-head-cell>
                                        <uui-table-head-cell style="width: 70%">Value</uui-table-head-cell>
                                    </uui-table-head>

                                    ${b(
        t.diagnostics,
        (e) => e.key,
        (e) => c`
                                            <uui-table-row>
                                                <uui-table-cell>${e.key}</uui-table-cell>
                                                <uui-table-cell>${e.value}</uui-table-cell>
                                            </uui-table-row>
                                        `
      )}
                                </uui-table>
                            </uui-box>
                        ` : c``
    )}
            </umb-body-layout>
        `;
  }
};
p = /* @__PURE__ */ new WeakSet();
S = function(t) {
  const e = this.diagnostics.find((i) => i.id.toString() == t.target.value);
  e && (this.currentGroup = e, this.currentGroupId = e.id.toString(), this.filteredSections = e.sections);
};
g = /* @__PURE__ */ new WeakSet();
G = function(t) {
  const e = t.target.value;
  this.searchKey = e, u(this, h, y).call(this);
};
v = /* @__PURE__ */ new WeakSet();
w = function(t) {
  const e = t.target.value;
  this.searchValue = e, u(this, h, y).call(this);
};
h = /* @__PURE__ */ new WeakSet();
y = function() {
  var t, e, i;
  this.searchKey !== "" || this.searchValue !== "" ? (this.filteredSections = structuredClone((t = this.currentGroup) == null ? void 0 : t.sections), (e = this.filteredSections) == null || e.forEach((s) => {
    s.diagnostics = s.diagnostics.filter((r) => u(this, m, _).call(this, r));
  })) : this.filteredSections = (i = this.currentGroup) == null ? void 0 : i.sections;
};
m = /* @__PURE__ */ new WeakSet();
_ = function(t) {
  let e = !1;
  return this.searchKey !== "" && (e = t.key.toLowerCase().includes(this.searchKey.toLowerCase())), this.searchValue !== "" && (e = t.value.toLowerCase().includes(this.searchValue.toLowerCase())), e;
};
a.styles = [
  V`
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
o([
  n()
], a.prototype, "diagnostics", 2);
o([
  n()
], a.prototype, "currentGroup", 2);
o([
  n()
], a.prototype, "filteredSections", 2);
o([
  n()
], a.prototype, "currentGroupId", 2);
o([
  n()
], a.prototype, "searchKey", 2);
o([
  n()
], a.prototype, "searchValue", 2);
a = o([
  x("godmode-diagnostic-browser")
], a);
const O = a;
export {
  a as GodModeDiagnosticBrowserElement,
  O as default
};
//# sourceMappingURL=godmode-diagnostic-browser.element-BZq3zP_W.js.map
