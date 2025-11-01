import { UmbElementMixin as C } from "@umbraco-cms/backoffice/element-api";
import { LitElement as M, html as p, css as w, state as m, customElement as x } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute as S } from "@umbraco-cms/backoffice/resources";
import { s as N, G as O } from "./index-Car7Rj8s.js";
import { DirectionModel as f } from "@umbraco-cms/backoffice/external/backend-api";
var $ = Object.defineProperty, E = Object.getOwnPropertyDescriptor, v = (t) => {
  throw TypeError(t);
}, n = (t, e, s, a) => {
  for (var i = a > 1 ? void 0 : a ? E(e, s) : e, u = t.length - 1, c; u >= 0; u--)
    (c = t[u]) && (i = (a ? c(e, s, i) : c(i)) || i);
  return a && i && $(e, s, i), i;
}, P = (t, e, s) => e.has(t) || v("Cannot " + s), I = (t, e, s) => e.has(t) ? v("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), o = (t, e, s) => (P(t, e, "access private method"), s), r, b, _, h, g, y, D, d;
let l = class extends C(M) {
  constructor() {
    super(), I(this, r), this._tableConfig = {
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
    super.connectedCallback(), o(this, r, _).call(this);
  }
  render() {
    return p`
            <umb-body-layout>
                <godmode-header name="Template Browser" slot="header"></godmode-header>
                <uui-box>
                    <div class="grid">
                        <div>
                            <uui-label>Search:</uui-label>
                            <uui-input
                                placeholder="Filter template names"
                                .value=${this.searchName}
                                @input=${o(this, r, g)}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label>Uses Master:</uui-label>
                            <uui-select
                                .options=${this.masterOptions}
                                .value=${this.selectedMaster}
                                @change=${o(this, r, y)}>
                            </uui-select>
                        </div>
                        <div>
                            <uui-label>Uses Partial:</uui-label>
                            <uui-select
                                .options=${this.partialOptions}
                                .value=${this.selectedPartial}
                                @change=${o(this, r, D)}>
                            </uui-select>
                        </div>
                    </div>
                </uui-box>

                ${this._tableItems.length !== 0 ? p`
                    <uui-box style="--uui-box-default-padding: 0;">
                        <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${o(this, r, b)} />
                    </uui-box>
                ` : p``}
            </umb-body-layout>
        `;
  }
};
r = /* @__PURE__ */ new WeakSet();
b = function(t) {
  const e = t.target, s = e.orderingColumn, a = e.orderingDesc;
  this.filteredData = N(structuredClone(this.templates), s, a ? f.DESCENDING : f.ASCENDING), this._tableItems = o(this, r, h).call(this, this.filteredData);
};
_ = async function() {
  const { data: t } = await S(this, O.getUmbracoManagementApiV1GodModeGetTemplates());
  if (t) {
    this.templates = t, this.filteredData = structuredClone(this.templates), this._tableItems = o(this, r, h).call(this, this.filteredData);
    let e = [...new Set(this.templates.map((a) => a.partials).reduce((a, i) => a.concat(i)))];
    this.partialOptions = e.map((a) => ({ name: a.name, value: a.name })), this.partialOptions.unshift({ name: "Any", value: "", selected: !0 });
    let s = [...new Set(this.templates.filter((a) => a.isMaster))];
    this.masterOptions = s.map((a) => ({ name: a.name, value: a.id.toString() })), this.masterOptions.unshift({ name: "Any", value: "", selected: !0 });
  }
};
h = function(t) {
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
g = function(t) {
  const e = t.target.value;
  this.searchName = e, o(this, r, d).call(this);
};
y = function(t) {
  const e = t.target.value;
  this.selectedMaster = e, o(this, r, d).call(this);
};
D = function(t) {
  const e = t.target.value;
  this.selectedMaster = e, o(this, r, d).call(this);
};
d = function() {
  var t, e, s;
  this.filteredData = structuredClone(this.templates), this.searchName !== "" && (this.filteredData = (t = this.filteredData) == null ? void 0 : t.filter((a) => a.name.toLowerCase().includes(this.searchName))), this.selectedMaster !== "" && (this.filteredData = (e = this.filteredData) == null ? void 0 : e.filter((a) => {
    var i;
    return (i = a.masterAlias) == null ? void 0 : i.toLowerCase().includes(this.selectedMaster);
  })), this.selectedPartial !== "" && (this.filteredData = (s = this.filteredData) == null ? void 0 : s.filter((a) => {
    var i;
    return (i = a.partials) == null ? void 0 : i.some((u) => u.name === this.selectedPartial);
  })), this.filteredData ? this._tableItems = o(this, r, h).call(this, this.filteredData) : this._tableItems = [];
};
l.styles = [
  w`
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
  m()
], l.prototype, "_tableConfig", 2);
n([
  m()
], l.prototype, "_tableColumns", 2);
n([
  m()
], l.prototype, "_tableItems", 2);
n([
  m()
], l.prototype, "templates", 2);
n([
  m()
], l.prototype, "filteredData", 2);
n([
  m()
], l.prototype, "searchName", 2);
n([
  m()
], l.prototype, "masterOptions", 2);
n([
  m()
], l.prototype, "selectedMaster", 2);
n([
  m()
], l.prototype, "partialOptions", 2);
n([
  m()
], l.prototype, "selectedPartial", 2);
l = n([
  x("godmode-template-browser")
], l);
const L = l;
export {
  l as GodModeTemplateBrowserElement,
  L as default
};
//# sourceMappingURL=godmode-template-browser.element-8lcmnCph.js.map
