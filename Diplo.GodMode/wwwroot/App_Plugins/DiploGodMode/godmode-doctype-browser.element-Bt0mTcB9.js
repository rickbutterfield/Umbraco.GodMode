import { UmbElementMixin as S } from "@umbraco-cms/backoffice/element-api";
import { LitElement as A, html as d, css as V, state as n, customElement as M } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute as N } from "@umbraco-cms/backoffice/resources";
import { s as H, G as k } from "./index-D76lIRat.js";
import { DirectionModel as C } from "@umbraco-cms/backoffice/external/backend-api";
var B = Object.defineProperty, F = Object.getOwnPropertyDescriptor, b = (e) => {
  throw TypeError(e);
}, a = (e, t, r, l) => {
  for (var u = l > 1 ? void 0 : l ? F(t, r) : t, p = e.length - 1, h; p >= 0; p--)
    (h = e[p]) && (u = (l ? h(t, r, u) : h(u)) || u);
  return l && u && B(t, r, u), u;
}, Y = (e, t, r) => t.has(e) || b("Cannot " + r), W = (e, t, r) => t.has(e) ? b("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), o = (e, t, r) => (Y(e, t, "access private method"), r), s, w, _, y, T, D, $, L, E, O, G, I, P, x, c;
let i = class extends S(A) {
  constructor() {
    super(), W(this, s), this._tableConfig = {
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
    ], this._tableItems = [], this.data = [], this.filteredData = [], this.searchDocType = "", this.searchTemplate = "", this.searchProperty = "", this.includeInherited = !1, this.hasTemplate = null, this.hasCompositions = null, this.isElement = null, this.isListView = null, this.selectedComposition = "", this.selectedPropertyGroup = "", this.isLoading = !0, this.hasTemplateOptions = [
      { name: "Any", value: "", selected: !0 },
      { name: "Yes", value: "true" },
      { name: "No", value: "false" }
    ], this.hasCompositionsOptions = [
      { name: "Any", value: "", selected: !0 },
      { name: "Yes", value: "true" },
      { name: "No", value: "false" }
    ], this.isElementOptions = [
      { name: "Any", value: "", selected: !0 },
      { name: "Yes", value: "true" },
      { name: "No", value: "false" }
    ], this.isListViewOptions = [
      { name: "Any", value: "", selected: !0 },
      { name: "Yes", value: "true" },
      { name: "No", value: "false" }
    ], this.compositionOptions = [], this.propertyGroupOptions = [];
  }
  async connectedCallback() {
    super.connectedCallback(), o(this, s, _).call(this);
  }
  render() {
    return d`
            <umb-body-layout>
            <godmode-header name="Document Type Browser" slot="header"></godmode-header>
          
    <uui-box headline="Search Filters">
             <div class="grid">
        <div>
<uui-label>Has Template?</uui-label>
   <uui-select
     .options=${this.hasTemplateOptions}
           @change=${o(this, s, E)}>
      </uui-select>
        </div>

           <div>
   <uui-label>Has Compositions?</uui-label>
   <uui-select
        .options=${this.hasCompositionsOptions}
   @change=${o(this, s, O)}>
        </uui-select>
  </div>

         <div>
<uui-label>Composed With:</uui-label>
    <uui-select
         .options=${this.compositionOptions}
 @change=${o(this, s, P)}>
     </uui-select>
  </div>

  <div>
    <uui-label>Element Type?</uui-label>
           <uui-select
             .options=${this.isElementOptions}
          @change=${o(this, s, G)}>
       </uui-select>
      </div>

          <div>
        <uui-label>Has Group:</uui-label>
     <uui-select
            .options=${this.propertyGroupOptions}
        @change=${o(this, s, x)}>
      </uui-select>
       </div>

      <div>
 <uui-label>List View?</uui-label>
       <uui-select
    .options=${this.isListViewOptions}
          @change=${o(this, s, I)}>
         </uui-select>
      </div>

   <div>
    <uui-label>Search document types</uui-label>
      <uui-input
         placeholder="Filter document types"
     .value=${this.searchDocType}
           @input=${o(this, s, T)}>
            </uui-input>
            </div>

   <div>
       <uui-label>Search templates</uui-label>
           <uui-input
          placeholder="Filter templates"
      .value=${this.searchTemplate}
           @input=${o(this, s, D)}>
   </uui-input>
        </div>

                <div>
       <uui-label>Search properties</uui-label>
      <div class="property-search">
         <uui-input
 placeholder="Filter properties"
            .value=${this.searchProperty}
    @input=${o(this, s, $)}>
           </uui-input>
             <uui-checkbox
       label="Include inherited"
           ?checked=${this.includeInherited}
 @change=${o(this, s, L)}>
                Include inherited
         </uui-checkbox>
              </div>
             </div>
         </div>
       </uui-box>

         ${this.isLoading ? d`
<uui-loader-bar></uui-loader-bar>
       ` : d``}

        ${!this.isLoading && this._tableItems.length > 0 ? d`
          <uui-box style="--uui-box-default-padding: 0;">
      <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${o(this, s, w)} />
      </uui-box>
      ` : d``}

    ${!this.isLoading && this._tableItems.length === 0 && this.data.length > 0 ? d`
                <uui-box>
       <p>No document types match the current filters.</p>
            </uui-box>
     ` : d``}
            </umb-body-layout>
        `;
  }
};
s = /* @__PURE__ */ new WeakSet();
w = function(e) {
  const t = e.target, r = t.orderingColumn, l = t.orderingDesc;
  this.filteredData = H(structuredClone(this.data), r, l ? C.DESCENDING : C.ASCENDING), this._tableItems = o(this, s, y).call(this, this.filteredData);
};
_ = async function() {
  this.isLoading = !0;
  const { data: e } = await N(this, k.getUmbracoManagementApiV1GodModeGetContentTypeMap());
  if (e) {
    this.data = e, this.filteredData = structuredClone(this.data), this._tableItems = o(this, s, y).call(this, this.filteredData);
    const t = /* @__PURE__ */ new Set();
    e.forEach((l) => {
      var u;
      (u = l.compositions) == null || u.forEach((p) => {
        p.name && t.add(p.name);
      });
    }), this.compositionOptions = Array.from(t).map((l) => ({ name: l, value: l })), this.compositionOptions.unshift({ name: "Any", value: "", selected: !0 });
    const r = /* @__PURE__ */ new Set();
    e.forEach((l) => {
      var u;
      (u = l.propertyGroups) == null || u.forEach((p) => {
        p && r.add(p);
      });
    }), this.propertyGroupOptions = Array.from(r).map((l) => ({ name: l, value: l })), this.propertyGroupOptions.unshift({ name: "Any", value: "", selected: !0 });
  }
  this.isLoading = !1;
};
y = function(e) {
  return e.map((t) => {
    var l, u, p;
    const r = (((l = t.properties) == null ? void 0 : l.length) || 0) + (((u = t.compositionProperties) == null ? void 0 : u.length) || 0);
    return {
      id: ((p = t.id) == null ? void 0 : p.toString()) || "",
      data: [
        {
          columnAlias: "name",
          value: d`<strong>${t.name || ""}</strong>`
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
          value: d`<uui-icon name="${t.icon || "icon-document"}"></uui-icon>`
        },
        {
          columnAlias: "propertyCount",
          value: r
        },
        {
          columnAlias: "hasCompositions",
          value: t.hasCompositions ? d`<uui-icon name="icon-check" style="color: green;"></uui-icon>` : ""
        }
      ]
    };
  });
};
T = function(e) {
  const t = e.target.value;
  this.searchDocType = t.toLowerCase(), o(this, s, c).call(this);
};
D = function(e) {
  const t = e.target.value;
  this.searchTemplate = t.toLowerCase(), o(this, s, c).call(this);
};
$ = function(e) {
  const t = e.target.value;
  this.searchProperty = t.toLowerCase(), o(this, s, c).call(this);
};
L = function(e) {
  this.includeInherited = e.target.checked, o(this, s, c).call(this);
};
E = function(e) {
  const t = e.target.value;
  this.hasTemplate = t === "true" ? !0 : t === "false" ? !1 : null, o(this, s, c).call(this);
};
O = function(e) {
  const t = e.target.value;
  this.hasCompositions = t === "true" ? !0 : t === "false" ? !1 : null, o(this, s, c).call(this);
};
G = function(e) {
  const t = e.target.value;
  this.isElement = t === "true" ? !0 : t === "false" ? !1 : null, o(this, s, c).call(this);
};
I = function(e) {
  const t = e.target.value;
  this.isListView = t === "true" ? !0 : t === "false" ? !1 : null, o(this, s, c).call(this);
};
P = function(e) {
  this.selectedComposition = e.target.value, o(this, s, c).call(this);
};
x = function(e) {
  this.selectedPropertyGroup = e.target.value, o(this, s, c).call(this);
};
c = function() {
  this.filteredData = this.data.filter((e) => {
    var t, r, l, u, p;
    if (this.searchDocType && !(((t = e.name) == null ? void 0 : t.toLowerCase().includes(this.searchDocType)) || ((r = e.alias) == null ? void 0 : r.toLowerCase().includes(this.searchDocType))) || this.searchTemplate && !((l = e.templates) == null ? void 0 : l.some(
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
    return !(this.hasTemplate !== null && (this.hasTemplate && !e.hasTemplates || !this.hasTemplate && e.hasTemplates) || this.hasCompositions !== null && (this.hasCompositions && !e.hasCompositions || !this.hasCompositions && e.hasCompositions) || this.isElement !== null && (this.isElement && !e.isComposition || !this.isElement && e.isComposition) || this.isListView !== null && (this.isListView && !e.isListView || !this.isListView && e.isListView) || this.selectedComposition && !((u = e.compositions) == null ? void 0 : u.some((f) => f.name === this.selectedComposition)) || this.selectedPropertyGroup && !((p = e.propertyGroups) == null ? void 0 : p.includes(this.selectedPropertyGroup)));
  }), this._tableItems = o(this, s, y).call(this, this.filteredData);
};
i.styles = [
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
], i.prototype, "data", 2);
a([
  n()
], i.prototype, "filteredData", 2);
a([
  n()
], i.prototype, "searchDocType", 2);
a([
  n()
], i.prototype, "searchTemplate", 2);
a([
  n()
], i.prototype, "searchProperty", 2);
a([
  n()
], i.prototype, "includeInherited", 2);
a([
  n()
], i.prototype, "hasTemplate", 2);
a([
  n()
], i.prototype, "hasCompositions", 2);
a([
  n()
], i.prototype, "isElement", 2);
a([
  n()
], i.prototype, "isListView", 2);
a([
  n()
], i.prototype, "selectedComposition", 2);
a([
  n()
], i.prototype, "selectedPropertyGroup", 2);
a([
  n()
], i.prototype, "isLoading", 2);
a([
  n()
], i.prototype, "hasTemplateOptions", 2);
a([
  n()
], i.prototype, "hasCompositionsOptions", 2);
a([
  n()
], i.prototype, "isElementOptions", 2);
a([
  n()
], i.prototype, "isListViewOptions", 2);
a([
  n()
], i.prototype, "compositionOptions", 2);
a([
  n()
], i.prototype, "propertyGroupOptions", 2);
i = a([
  M("godmode-doctype-browser")
], i);
const K = i;
export {
  i as GodModeDocTypeBrowserElement,
  K as default
};
//# sourceMappingURL=godmode-doctype-browser.element-Bt0mTcB9.js.map
