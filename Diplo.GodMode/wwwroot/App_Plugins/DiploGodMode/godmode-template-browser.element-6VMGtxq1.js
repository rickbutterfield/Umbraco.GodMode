import { UmbElementMixin as O } from "@umbraco-cms/backoffice/element-api";
import { LitElement as $, html as _, css as P, state as o, customElement as E } from "@umbraco-cms/backoffice/external/lit";
import { tryExecuteAndNotify as I } from "@umbraco-cms/backoffice/resources";
import { s as T, G as A } from "./index-PYLMTfOZ.js";
import { DirectionModel as S } from "@umbraco-cms/backoffice/external/backend-api";
var G = Object.defineProperty, W = Object.getOwnPropertyDescriptor, n = (t, e, s, a) => {
  for (var i = a > 1 ? void 0 : a ? W(e, s) : e, u = t.length - 1, f; u >= 0; u--)
    (f = t[u]) && (i = (a ? f(e, s, i) : f(i)) || i);
  return a && i && G(e, s, i), i;
}, k = (t, e, s) => {
  if (!e.has(t))
    throw TypeError("Cannot " + s);
}, h = (t, e, s) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, s);
}, r = (t, e, s) => (k(t, e, "access private method"), s), v, w, b, C, m, c, g, M, y, x, D, N, d, p;
let l = class extends O($) {
  constructor() {
    super(), h(this, v), h(this, b), h(this, m), h(this, g), h(this, y), h(this, D), h(this, d), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "Partial Name",
        alias: "name",
        allowSorting: !0
      },
      {
        name: "Template Name",
        alias: "templateName",
        allowSorting: !0
      }
    ], this._tableItems = [], this.templates = [], this.filteredData = [], this.searchName = "", this.masterOptions = [], this.selectedMaster = "", this.partialOptions = [], this.selectedPartial = "";
  }
  async connectedCallback() {
    super.connectedCallback(), r(this, b, C).call(this);
  }
  render() {
    return _`
            <umb-body-layout>
                <godmode-header name="Template Browser" slot="header"></godmode-header>
                <uui-box>
                    <div class="grid">
                        <div>
                            <uui-label>Search:</uui-label>
                            <uui-input
                                placeholder="Filter template names"
                                .value=${this.searchName}
                                @input=${r(this, g, M)}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label>Uses Master:</uui-label>
                            <uui-select
                                .options=${this.masterOptions}
                                .value=${this.selectedMaster}
                                @change=${r(this, y, x)}>
                            </uui-select>
                        </div>
                        <div>
                            <uui-label>Uses Partial:</uui-label>
                            <uui-select
                                .options=${this.partialOptions}
                                .value=${this.selectedPartial}
                                @change=${r(this, D, N)}>
                            </uui-select>
                        </div>
                    </div>
                </uui-box>

                ${this._tableItems.length !== 0 ? _`
                    <uui-box style="--uui-box-default-padding: 0;">
                        <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${r(this, v, w)} />
                    </uui-box>
                ` : _``}
            </umb-body-layout>
        `;
  }
};
v = /* @__PURE__ */ new WeakSet();
w = function(t) {
  const e = t.target, s = e.orderingColumn, a = e.orderingDesc;
  this.filteredData = T(structuredClone(this.templates), s, a ? S.DESCENDING : S.ASCENDING), this._tableItems = r(this, m, c).call(this, this.filteredData);
};
b = /* @__PURE__ */ new WeakSet();
C = async function() {
  const { data: t } = await I(this, A.getUmbracoManagementApiV1GodModeGetTemplates());
  if (t) {
    this.templates = t, this.filteredData = structuredClone(this.templates), this._tableItems = r(this, m, c).call(this, this.filteredData);
    let e = [...new Set(this.templates.map((a) => a.partials).reduce((a, i) => a.concat(i)))];
    this.partialOptions = e.map((a) => ({ name: a.name, value: a.name })), this.partialOptions.unshift({ name: "Any", value: "", selected: !0 });
    let s = [...new Set(this.templates.filter((a) => a.isMaster))];
    this.masterOptions = s.map((a) => ({ name: a.name, value: a.id.toString() })), this.masterOptions.unshift({ name: "Any", value: "", selected: !0 });
  }
};
m = /* @__PURE__ */ new WeakSet();
c = function(t) {
  return t.map((e) => ({
    id: e.name,
    data: [
      {
        columnAlias: "name",
        value: e.name
      }
    ]
  }));
};
g = /* @__PURE__ */ new WeakSet();
M = function(t) {
  const e = t.target.value;
  this.searchName = e, r(this, d, p).call(this);
};
y = /* @__PURE__ */ new WeakSet();
x = function(t) {
  const e = t.target.value;
  this.selectedMaster = e, r(this, d, p).call(this);
};
D = /* @__PURE__ */ new WeakSet();
N = function(t) {
  const e = t.target.value;
  this.selectedMaster = e, r(this, d, p).call(this);
};
d = /* @__PURE__ */ new WeakSet();
p = function() {
  var t, e, s;
  this.filteredData = structuredClone(this.templates), this.searchName !== "" && (this.filteredData = (t = this.filteredData) == null ? void 0 : t.filter((a) => a.name.toLowerCase().includes(this.searchName))), this.selectedMaster !== "" && (this.filteredData = (e = this.filteredData) == null ? void 0 : e.filter((a) => {
    var i;
    return (i = a.masterAlias) == null ? void 0 : i.toLowerCase().includes(this.selectedMaster);
  })), this.selectedPartial !== "" && (this.filteredData = (s = this.filteredData) == null ? void 0 : s.filter((a) => {
    var i;
    return (i = a.partials) == null ? void 0 : i.some((u) => u.name === this.selectedPartial);
  })), this.filteredData ? this._tableItems = r(this, m, c).call(this, this.filteredData) : this._tableItems = [];
};
l.styles = [
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
  o()
], l.prototype, "_tableConfig", 2);
n([
  o()
], l.prototype, "_tableColumns", 2);
n([
  o()
], l.prototype, "_tableItems", 2);
n([
  o()
], l.prototype, "templates", 2);
n([
  o()
], l.prototype, "filteredData", 2);
n([
  o()
], l.prototype, "searchName", 2);
n([
  o()
], l.prototype, "masterOptions", 2);
n([
  o()
], l.prototype, "selectedMaster", 2);
n([
  o()
], l.prototype, "partialOptions", 2);
n([
  o()
], l.prototype, "selectedPartial", 2);
l = n([
  E("godmode-template-browser")
], l);
const F = l;
export {
  l as GodModeTemplateBrowserElement,
  F as default
};
//# sourceMappingURL=godmode-template-browser.element-6VMGtxq1.js.map
