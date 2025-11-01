import { when as w, repeat as f, html as n, css as _, state as c, customElement as S } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as C } from "@umbraco-cms/backoffice/lit-element";
import { G as V } from "./index--MEPM8tO.js";
import { tryExecute as $ } from "@umbraco-cms/backoffice/resources";
var x = Object.defineProperty, K = Object.getOwnPropertyDescriptor, v = (t) => {
  throw TypeError(t);
}, l = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? K(e, i) : e, h = t.length - 1, d; h >= 0; h--)
    (d = t[h]) && (o = (s ? d(e, i, o) : d(o)) || o);
  return s && o && x(e, i, o), o;
}, E = (t, e, i) => e.has(t) || v("Cannot " + i), L = (t, e, i) => e.has(t) ? v("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), u = (t, e, i) => (E(t, e, "access private method"), i), a, g, y, m, b, p, G;
let r = class extends C {
  constructor() {
    super(), L(this, a), this.diagnostics = [], this.currentGroup = void 0, this.filteredSections = [], this.currentGroupId = "", this.searchKey = "", this.searchValue = "", this.configurationGroups = [], u(this, a, g).call(this);
  }
  render() {
    return n`
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
                                @input=${u(this, a, m)}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label for="search-value">Search Values:</uui-label>
                            <uui-input
                                id="search-value"
                                placeholder="Filter by value"
                                .value=${this.searchValue}
                                @input=${u(this, a, b)}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label for="search-section">Configuration Group:</uui-label>
                            <uui-select
                                id="search-section"
                                .options=${this.configurationGroups}
                                @change=${u(this, a, y)}
                                .value=${this.currentGroupId}>
                            </uui-select>
                        </div>
                    </div>
                </uui-box>

                ${w(
      this.currentGroup !== void 0,
      () => {
        var t;
        return n`
                    <h4>${(t = this.currentGroup) == null ? void 0 : t.title}</h4>
      
                    ${f(
          this.filteredSections,
          (e) => e.heading,
          (e) => e.diagnostics.length !== 0 ? n`
                                <uui-box headline=${e.heading} style="--uui-box-default-padding: 0;">
                                    <uui-table>
                                          <uui-table-head>
                                              <uui-table-head-cell style="width: 30%">Key</uui-table-head-cell>
                                              <uui-table-head-cell style="width: 70%">Value</uui-table-head-cell>
                                          </uui-table-head>

                                          ${f(
            e.diagnostics,
            (i) => i.key,
            (i) => n`
                                                  <uui-table-row>
                                                      <uui-table-cell>${i.key}</uui-table-cell>
                                                      <uui-table-cell>${i.value}</uui-table-cell>
                                                  </uui-table-row>
                                              `
          )}
                                      </uui-table>
                                  </uui-box>
                              ` : n``
        )}`;
      },
      () => n`<uui-loader></uui-loader>`
    )}
                    
            </umb-body-layout>
        `;
  }
};
a = /* @__PURE__ */ new WeakSet();
g = async function() {
  var e;
  const { data: t } = await $(this, V.getUmbracoManagementApiV1GodModeGetEnvironmentDiagnostics());
  if (t) {
    this.diagnostics = t;
    const i = t.map((s) => ({ name: s.title, value: s.id.toString(), selected: s.id === 0 }));
    i.unshift({ name: "Select", value: "", selected: !1 }), this.configurationGroups = i, this.currentGroup = this.diagnostics[0], this.currentGroupId = (e = this.diagnostics[0]) == null ? void 0 : e.id.toString(), this.filteredSections = this.currentGroup.sections;
  }
};
y = function(t) {
  const e = this.diagnostics.find((i) => i.id.toString() == t.target.value);
  e && (this.currentGroup = e, this.currentGroupId = e.id.toString(), this.filteredSections = e.sections, this.searchKey = "", this.searchValue = "");
};
m = function(t) {
  const e = t.target.value;
  this.searchKey = e, u(this, a, p).call(this);
};
b = function(t) {
  const e = t.target.value;
  this.searchValue = e, u(this, a, p).call(this);
};
p = function() {
  var t, e;
  this.currentGroup && (this.searchKey !== "" || this.searchValue !== "" ? (this.filteredSections = structuredClone(this.currentGroup.sections), (t = this.filteredSections) == null || t.forEach((i) => {
    i.diagnostics = i.diagnostics.filter((s) => u(this, a, G).call(this, s));
  })) : this.filteredSections = (e = this.currentGroup) == null ? void 0 : e.sections);
};
G = function(t) {
  let e = !1;
  return this.searchKey !== "" && (e = t.key.toLowerCase().includes(this.searchKey.toLowerCase())), this.searchValue !== "" && (e = t.value.toLowerCase().includes(this.searchValue.toLowerCase())), this.searchKey !== "" && this.searchValue !== "" && (e = t.key.toLowerCase().includes(this.searchKey.toLowerCase()) && t.value.toLowerCase().includes(this.searchValue.toLowerCase())), e;
};
r.styles = [
  _`
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
l([
  c()
], r.prototype, "diagnostics", 2);
l([
  c()
], r.prototype, "currentGroup", 2);
l([
  c()
], r.prototype, "filteredSections", 2);
l([
  c()
], r.prototype, "currentGroupId", 2);
l([
  c()
], r.prototype, "searchKey", 2);
l([
  c()
], r.prototype, "searchValue", 2);
r = l([
  S("godmode-diagnostic-browser")
], r);
const O = r;
export {
  r as GodModeDiagnosticBrowserElement,
  O as default
};
//# sourceMappingURL=godmode-diagnostic-browser.element-BmVb1Z9U.js.map
