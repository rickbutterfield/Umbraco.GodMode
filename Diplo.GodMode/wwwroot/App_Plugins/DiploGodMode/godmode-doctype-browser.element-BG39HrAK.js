import { UmbElementMixin as A } from "@umbraco-cms/backoffice/element-api";
import { LitElement as M, html as c, css as O, state as r, customElement as V } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute as N } from "@umbraco-cms/backoffice/resources";
import { s as H, G as k } from "./index-Car7Rj8s.js";
import { DirectionModel as b } from "@umbraco-cms/backoffice/external/backend-api";
var Y = Object.defineProperty, B = Object.getOwnPropertyDescriptor, C = (e) => {
  throw TypeError(e);
}, l = (e, t, u, a) => {
  for (var n = a > 1 ? void 0 : a ? B(t, u) : t, p = e.length - 1, h; p >= 0; p--)
    (h = e[p]) && (n = (a ? h(t, u, n) : h(n)) || n);
  return a && n && Y(t, u, n), n;
}, F = (e, t, u) => t.has(e) || C("Cannot " + u), W = (e, t, u) => t.has(e) ? C("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, u), s = (e, t, u) => (F(e, t, "access private method"), u), i, _, w, y, T, D, $, L, E, G, S, I, P, x, d;
let o = class extends A(M) {
  constructor() {
    super(), W(this, i), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "Name",
        alias: "name",
        allowSorting: !0,
        width: "20%"
      },
      {
        name: "Alias",
        alias: "alias",
        allowSorting: !0,
        width: "20%"
      },
      {
        name: "Description",
        alias: "description",
        allowSorting: !0,
        width: "25%"
      },
      {
        name: "Icon",
        alias: "icon",
        allowSorting: !1,
        width: "10%"
      },
      {
        name: "Properties",
        alias: "propertyCount",
        allowSorting: !0,
        width: "10%"
      },
      {
        name: "Compositions",
        alias: "hasCompositions",
        allowSorting: !0,
        width: "15%"
      }
    ], this._tableItems = [], this.data = [], this.filteredData = [], this.searchDocType = "", this.searchTemplate = "", this.searchProperty = "", this.includeInherited = !1, this.hasTemplate = null, this.hasCompositions = null, this.isElement = null, this.isListView = null, this.selectedComposition = "", this.selectedPropertyGroup = "", this.isLoading = !0, this.triStateOptions = [
      { label: "Any", value: null },
      { label: "Yes", value: !0 },
      { label: "No", value: !1 }
    ], this.compositionOptions = [], this.propertyGroupOptions = [];
  }
  async connectedCallback() {
    super.connectedCallback(), s(this, i, w).call(this);
  }
  render() {
    return c`
            <umb-body-layout>
                <godmode-header name="Document Type Browser" slot="header"></godmode-header>
                
                <uui-box headline="Search Filters">
                    <div class="grid">
                        <div>
                            <uui-label>Has Template?</uui-label>
                            <uui-select @change=${s(this, i, E)}>
                                <uui-select-option value="">Any</uui-select-option>
                                <uui-select-option value="true">Yes</uui-select-option>
                                <uui-select-option value="false">No</uui-select-option>
                            </uui-select>
                        </div>

                        <div>
                            <uui-label>Has Compositions?</uui-label>
                            <uui-select @change=${s(this, i, G)}>
                                <uui-select-option value="">Any</uui-select-option>
                                <uui-select-option value="true">Yes</uui-select-option>
                                <uui-select-option value="false">No</uui-select-option>
                            </uui-select>
                        </div>

                        <div>
                            <uui-label>Composed With:</uui-label>
                            <uui-select @change=${s(this, i, P)}>
                                <uui-select-option value="">Any</uui-select-option>
                                ${this.compositionOptions.map((e) => c`
                                    <uui-select-option value="${e.value}">${e.name}</uui-select-option>
                                `)}
                            </uui-select>
                        </div>

                        <div>
                            <uui-label>Element Type?</uui-label>
                            <uui-select @change=${s(this, i, S)}>
                                <uui-select-option value="">Any</uui-select-option>
                                <uui-select-option value="true">Yes</uui-select-option>
                                <uui-select-option value="false">No</uui-select-option>
                            </uui-select>
                        </div>

                        <div>
                            <uui-label>Has Group:</uui-label>
                            <uui-select @change=${s(this, i, x)}>
                                <uui-select-option value="">Any</uui-select-option>
                                ${this.propertyGroupOptions.map((e) => c`
                                    <uui-select-option value="${e.value}">${e.name}</uui-select-option>
                                `)}
                            </uui-select>
                        </div>

                        <div>
                            <uui-label>List View?</uui-label>
                            <uui-select @change=${s(this, i, I)}>
                                <uui-select-option value="">Any</uui-select-option>
                                <uui-select-option value="true">Yes</uui-select-option>
                                <uui-select-option value="false">No</uui-select-option>
                            </uui-select>
                        </div>

                        <div>
                            <uui-label>Search document types</uui-label>
                            <uui-input
                                placeholder="Filter document types"
                                .value=${this.searchDocType}
                                @input=${s(this, i, T)}>
                            </uui-input>
                        </div>

                        <div>
                            <uui-label>Search templates</uui-label>
                            <uui-input
                                placeholder="Filter templates"
                                .value=${this.searchTemplate}
                                @input=${s(this, i, D)}>
                            </uui-input>
                        </div>

                        <div>
                            <uui-label>Search properties</uui-label>
                            <div class="property-search">
                                <uui-input
                                    placeholder="Filter properties"
                                    .value=${this.searchProperty}
                                    @input=${s(this, i, $)}>
                                </uui-input>
                                <uui-checkbox
                                    label="Include inherited"
                                    ?checked=${this.includeInherited}
                                    @change=${s(this, i, L)}>
                                    Include inherited
                                </uui-checkbox>
                            </div>
                        </div>
                    </div>
                </uui-box>

                ${this.isLoading ? c`
                    <uui-loader-bar></uui-loader-bar>
                ` : c``}

                ${!this.isLoading && this._tableItems.length > 0 ? c`
                    <uui-box style="--uui-box-default-padding: 0;">
                        <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${s(this, i, _)} />
                    </uui-box>
                ` : c``}

                ${!this.isLoading && this._tableItems.length === 0 && this.data.length > 0 ? c`
                    <uui-box>
                        <p>No document types match the current filters.</p>
                    </uui-box>
                ` : c``}
            </umb-body-layout>
        `;
  }
};
i = /* @__PURE__ */ new WeakSet();
_ = function(e) {
  const t = e.target, u = t.orderingColumn, a = t.orderingDesc;
  this.filteredData = H(structuredClone(this.data), u, a ? b.DESCENDING : b.ASCENDING), this._tableItems = s(this, i, y).call(this, this.filteredData);
};
w = async function() {
  this.isLoading = !0;
  const { data: e } = await N(this, k.getUmbracoManagementApiV1GodModeGetContentTypeMap());
  if (e) {
    this.data = e, this.filteredData = structuredClone(this.data), this._tableItems = s(this, i, y).call(this, this.filteredData);
    const t = /* @__PURE__ */ new Set();
    e.forEach((a) => {
      var n;
      (n = a.compositions) == null || n.forEach((p) => {
        p.name && t.add(p.name);
      });
    }), this.compositionOptions = Array.from(t).map((a) => ({ name: a, value: a }));
    const u = /* @__PURE__ */ new Set();
    e.forEach((a) => {
      var n;
      (n = a.propertyGroups) == null || n.forEach((p) => {
        p && u.add(p);
      });
    }), this.propertyGroupOptions = Array.from(u).map((a) => ({ name: a, value: a }));
  }
  this.isLoading = !1;
};
y = function(e) {
  return e.map((t) => {
    var a, n, p;
    const u = (((a = t.properties) == null ? void 0 : a.length) || 0) + (((n = t.compositionProperties) == null ? void 0 : n.length) || 0);
    return {
      id: ((p = t.id) == null ? void 0 : p.toString()) || "",
      data: [
        {
          columnAlias: "name",
          value: c`<strong>${t.name || ""}</strong>`
        },
        {
          columnAlias: "alias",
          value: t.alias || ""
        },
        {
          columnAlias: "description",
          value: t.description || ""
        },
        {
          columnAlias: "icon",
          value: c`<uui-icon name="${t.icon || "icon-document"}"></uui-icon>`
        },
        {
          columnAlias: "propertyCount",
          value: u
        },
        {
          columnAlias: "hasCompositions",
          value: t.hasCompositions ? c`<uui-icon name="icon-check" style="color: green;"></uui-icon>` : ""
        }
      ]
    };
  });
};
T = function(e) {
  const t = e.target.value;
  this.searchDocType = t.toLowerCase(), s(this, i, d).call(this);
};
D = function(e) {
  const t = e.target.value;
  this.searchTemplate = t.toLowerCase(), s(this, i, d).call(this);
};
$ = function(e) {
  const t = e.target.value;
  this.searchProperty = t.toLowerCase(), s(this, i, d).call(this);
};
L = function(e) {
  this.includeInherited = e.target.checked, s(this, i, d).call(this);
};
E = function(e) {
  const t = e.target.value;
  this.hasTemplate = t === "true" ? !0 : t === "false" ? !1 : null, s(this, i, d).call(this);
};
G = function(e) {
  const t = e.target.value;
  this.hasCompositions = t === "true" ? !0 : t === "false" ? !1 : null, s(this, i, d).call(this);
};
S = function(e) {
  const t = e.target.value;
  this.isElement = t === "true" ? !0 : t === "false" ? !1 : null, s(this, i, d).call(this);
};
I = function(e) {
  const t = e.target.value;
  this.isListView = t === "true" ? !0 : t === "false" ? !1 : null, s(this, i, d).call(this);
};
P = function(e) {
  this.selectedComposition = e.target.value, s(this, i, d).call(this);
};
x = function(e) {
  this.selectedPropertyGroup = e.target.value, s(this, i, d).call(this);
};
d = function() {
  this.filteredData = this.data.filter((e) => {
    var t, u, a, n, p;
    if (this.searchDocType && !(((t = e.name) == null ? void 0 : t.toLowerCase().includes(this.searchDocType)) || ((u = e.alias) == null ? void 0 : u.toLowerCase().includes(this.searchDocType))) || this.searchTemplate && !((a = e.templates) == null ? void 0 : a.some(
      (f) => {
        var m;
        return (m = f.name) == null ? void 0 : m.toLowerCase().includes(this.searchTemplate);
      }
    )))
      return !1;
    if (this.searchProperty) {
      const h = this.includeInherited ? e.allProperties : e.properties;
      if (!(h == null ? void 0 : h.some(
        (m) => {
          var v, g;
          return ((v = m.name) == null ? void 0 : v.toLowerCase().includes(this.searchProperty)) || ((g = m.alias) == null ? void 0 : g.toLowerCase().includes(this.searchProperty));
        }
      ))) return !1;
    }
    return !(this.hasTemplate !== null && (this.hasTemplate && !e.hasTemplates || !this.hasTemplate && e.hasTemplates) || this.hasCompositions !== null && (this.hasCompositions && !e.hasCompositions || !this.hasCompositions && e.hasCompositions) || this.isElement !== null && (this.isElement && !e.isComposition || !this.isElement && e.isComposition) || this.isListView !== null && (this.isListView && !e.isListView || !this.isListView && e.isListView) || this.selectedComposition && !((n = e.compositions) == null ? void 0 : n.some((f) => f.name === this.selectedComposition)) || this.selectedPropertyGroup && !((p = e.propertyGroups) == null ? void 0 : p.includes(this.selectedPropertyGroup)));
  }), this._tableItems = s(this, i, y).call(this, this.filteredData);
};
o.styles = [
  O`
            .grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;
            }

            .property-search {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            uui-box {
                margin-bottom: 20px;
            }
        `
];
l([
  r()
], o.prototype, "_tableConfig", 2);
l([
  r()
], o.prototype, "_tableColumns", 2);
l([
  r()
], o.prototype, "_tableItems", 2);
l([
  r()
], o.prototype, "data", 2);
l([
  r()
], o.prototype, "filteredData", 2);
l([
  r()
], o.prototype, "searchDocType", 2);
l([
  r()
], o.prototype, "searchTemplate", 2);
l([
  r()
], o.prototype, "searchProperty", 2);
l([
  r()
], o.prototype, "includeInherited", 2);
l([
  r()
], o.prototype, "hasTemplate", 2);
l([
  r()
], o.prototype, "hasCompositions", 2);
l([
  r()
], o.prototype, "isElement", 2);
l([
  r()
], o.prototype, "isListView", 2);
l([
  r()
], o.prototype, "selectedComposition", 2);
l([
  r()
], o.prototype, "selectedPropertyGroup", 2);
l([
  r()
], o.prototype, "isLoading", 2);
l([
  r()
], o.prototype, "triStateOptions", 2);
l([
  r()
], o.prototype, "compositionOptions", 2);
l([
  r()
], o.prototype, "propertyGroupOptions", 2);
o = l([
  V("godmode-doctype-browser")
], o);
const K = o;
export {
  o as GodModeDocTypeBrowserElement,
  K as default
};
//# sourceMappingURL=godmode-doctype-browser.element-BG39HrAK.js.map
