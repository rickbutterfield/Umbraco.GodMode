import { html as l, when as $, repeat as w, css as x, state as c, customElement as K } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as k } from "@umbraco-cms/backoffice/lit-element";
import { G as E } from "./index-PYLMTfOZ.js";
import { tryExecuteAndNotify as L } from "@umbraco-cms/backoffice/resources";
var D = Object.defineProperty, W = Object.getOwnPropertyDescriptor, u = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? W(e, i) : e, d = t.length - 1, f; d >= 0; d--)
    (f = t[d]) && (r = (s ? f(e, i, r) : f(r)) || r);
  return s && r && D(e, i, r), r;
}, M = (t, e, i) => {
  if (!e.has(t))
    throw TypeError("Cannot " + i);
}, n = (t, e, i) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, i);
}, o = (t, e, i) => (M(t, e, "access private method"), i), p, S, v, G, g, _, y, V, h, b, m, C;
let a = class extends k {
  constructor() {
    super(), n(this, p), n(this, v), n(this, g), n(this, y), n(this, h), n(this, m), this.diagnostics = [], this.currentGroup = void 0, this.filteredSections = [], this.currentGroupId = "", this.searchKey = "", this.searchValue = "", this.configurationGroups = [], o(this, p, S).call(this);
  }
  render() {
    return l`
            <umb-body-layout>
                <godmode-header name="Diagnostics" slot="header"></godmode-header>

                <uui-box>
                    <div class="grid">
                        <div>
                            <uui-label for="search-key">Search Names:</uui-label>
                            <uui-input
                                id="search-key"
                                placeholder="Filter by name"
                                .value=${this.searchKey}
                                @input=${o(this, g, _)}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label for="search-value">Search Values:</uui-label>
                            <uui-input
                                id="search-value"
                                placeholder="Filter by value"
                                .value=${this.searchValue}
                                @input=${o(this, y, V)}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label for="search-section">Configuration Group:</uui-label>
                            <uui-select
                                id="search-section"
                                .options=${this.configurationGroups}
                                @change=${o(this, v, G)}
                                .value=${this.currentGroupId}>
                            </uui-select>
                        </div>
                    </div>
                </uui-box>

                ${$(
      this.currentGroup !== void 0,
      () => {
        var t;
        return l`
                    <h4>${(t = this.currentGroup) == null ? void 0 : t.title}</h4>
      
                    ${w(
          this.filteredSections,
          (e) => e.heading,
          (e) => e.diagnostics.length !== 0 ? l`
                                <uui-box headline=${e.heading} style="--uui-box-default-padding: 0;">
                                    <uui-table>
                                          <uui-table-head>
                                              <uui-table-head-cell style="width: 30%">Key</uui-table-head-cell>
                                              <uui-table-head-cell style="width: 70%">Value</uui-table-head-cell>
                                          </uui-table-head>

                                          ${w(
            e.diagnostics,
            (i) => i.key,
            (i) => l`
                                                  <uui-table-row>
                                                      <uui-table-cell>${i.key}</uui-table-cell>
                                                      <uui-table-cell>${i.value}</uui-table-cell>
                                                  </uui-table-row>
                                              `
          )}
                                      </uui-table>
                                  </uui-box>
                              ` : l``
        )}`;
      },
      () => l`<uui-loader></uui-loader>`
    )}
                    
            </umb-body-layout>
        `;
  }
};
p = /* @__PURE__ */ new WeakSet();
S = async function() {
  var e;
  const { data: t } = await L(this, E.getUmbracoManagementApiV1GodModeGetEnvironmentDiagnostics());
  if (t) {
    this.diagnostics = t;
    const i = t.map((s) => ({ name: s.title, value: s.id.toString(), selected: s.id === 0 }));
    i.unshift({ name: "Select", value: "", selected: !1 }), this.configurationGroups = i, this.currentGroup = this.diagnostics[0], this.currentGroupId = (e = this.diagnostics[0]) == null ? void 0 : e.id.toString(), this.filteredSections = this.currentGroup.sections;
  }
};
v = /* @__PURE__ */ new WeakSet();
G = function(t) {
  const e = this.diagnostics.find((i) => i.id.toString() == t.target.value);
  e && (this.currentGroup = e, this.currentGroupId = e.id.toString(), this.filteredSections = e.sections, this.searchKey = "", this.searchValue = "");
};
g = /* @__PURE__ */ new WeakSet();
_ = function(t) {
  const e = t.target.value;
  this.searchKey = e, o(this, h, b).call(this);
};
y = /* @__PURE__ */ new WeakSet();
V = function(t) {
  const e = t.target.value;
  this.searchValue = e, o(this, h, b).call(this);
};
h = /* @__PURE__ */ new WeakSet();
b = function() {
  var t, e;
  this.currentGroup && (this.searchKey !== "" || this.searchValue !== "" ? (this.filteredSections = structuredClone(this.currentGroup.sections), (t = this.filteredSections) == null || t.forEach((i) => {
    i.diagnostics = i.diagnostics.filter((s) => o(this, m, C).call(this, s));
  })) : this.filteredSections = (e = this.currentGroup) == null ? void 0 : e.sections);
};
m = /* @__PURE__ */ new WeakSet();
C = function(t) {
  let e = !1;
  return this.searchKey !== "" && (e = t.key.toLowerCase().includes(this.searchKey.toLowerCase())), this.searchValue !== "" && (e = t.value.toLowerCase().includes(this.searchValue.toLowerCase())), this.searchKey !== "" && this.searchValue !== "" && (e = t.key.toLowerCase().includes(this.searchKey.toLowerCase()) && t.value.toLowerCase().includes(this.searchValue.toLowerCase())), e;
};
a.styles = [
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
        `
];
u([
  c()
], a.prototype, "diagnostics", 2);
u([
  c()
], a.prototype, "currentGroup", 2);
u([
  c()
], a.prototype, "filteredSections", 2);
u([
  c()
], a.prototype, "currentGroupId", 2);
u([
  c()
], a.prototype, "searchKey", 2);
u([
  c()
], a.prototype, "searchValue", 2);
a = u([
  K("godmode-diagnostic-browser")
], a);
const B = a;
export {
  a as GodModeDiagnosticBrowserElement,
  B as default
};
//# sourceMappingURL=godmode-diagnostic-browser.element-RNIMkQ-0.js.map
