import { UmbElementMixin as N } from "@umbraco-cms/backoffice/element-api";
import { LitElement as T, html as f, css as I, state as o, customElement as E } from "@umbraco-cms/backoffice/external/lit";
import { tryExecuteAndNotify as $ } from "@umbraco-cms/backoffice/resources";
import { s as A, G as P } from "./index-PYLMTfOZ.js";
import { DirectionModel as D } from "@umbraco-cms/backoffice/external/backend-api";
var O = Object.defineProperty, G = Object.getOwnPropertyDescriptor, l = (t, e, a, s) => {
  for (var n = s > 1 ? void 0 : s ? G(e, a) : e, d = t.length - 1, c; d >= 0; d--)
    (c = t[d]) && (n = (s ? c(e, a, n) : c(n)) || n);
  return s && n && O(e, a, n), n;
}, M = (t, e, a) => {
  if (!e.has(t))
    throw TypeError("Cannot " + a);
}, m = (t, e, a) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, a);
}, r = (t, e, a) => (M(t, e, "access private method"), a), _, w, b, C, p, h, g, S, v, x, u, y;
let i = class extends N(T) {
  constructor() {
    super(), m(this, _), m(this, b), m(this, p), m(this, g), m(this, v), m(this, u), this._tableConfig = {
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
    ], this._tableItems = [], this.templates = [], this.partials = [], this.filteredData = [], this.searchName = "", this.templateOptions = [], this.selectedTemplate = "";
  }
  async connectedCallback() {
    super.connectedCallback(), r(this, b, C).call(this);
  }
  render() {
    return f`
            <umb-body-layout>
                <godmode-header name="Partial Browser" slot="header"></godmode-header>
                <uui-box>
                    <div class="grid">
                        <div>
                            <uui-label>Search:</uui-label>
                            <uui-input
                                placeholder="Filter partial names"
                                .value=${this.searchName}
                                @input=${r(this, g, S)}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label>In Template:</uui-label>
                            <uui-select
                                .options=${this.templateOptions}
                                .value=${this.selectedTemplate}
                                @change=${r(this, v, x)}>
                            </uui-select>
                        </div>
                    </div>
                </uui-box>

                ${this._tableItems.length !== 0 ? f`
                    <uui-box style="--uui-box-default-padding: 0;">
                        <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${r(this, _, w)} />
                    </uui-box>
                ` : f``}
            </umb-body-layout>
        `;
  }
};
_ = /* @__PURE__ */ new WeakSet();
w = function(t) {
  const e = t.target, a = e.orderingColumn, s = e.orderingDesc;
  this.filteredData = A(structuredClone(this.partials), a, s ? D.DESCENDING : D.ASCENDING), this._tableItems = r(this, p, h).call(this, this.filteredData);
};
b = /* @__PURE__ */ new WeakSet();
C = async function() {
  const { data: t } = await $(this, P.getUmbracoManagementApiV1GodModeGetTemplates());
  if (t) {
    this.templates = t, this.partials = t.map((a) => a.partials).reduce((a, s) => a.concat(s)), this.filteredData = structuredClone(this.partials), this._tableItems = r(this, p, h).call(this, this.filteredData);
    let e = [...new Set(this.partials.map((a) => a.templateAlias))];
    this.templateOptions = e.map((a) => ({ name: a, value: a })), this.templateOptions.unshift({ name: "Any", value: "", selected: !0 });
  }
};
p = /* @__PURE__ */ new WeakSet();
h = function(t) {
  return t.map((e) => ({
    id: e.name,
    data: [
      {
        columnAlias: "name",
        value: e.name
      },
      {
        columnAlias: "templateName",
        value: e.templateAlias
      }
    ]
  }));
};
g = /* @__PURE__ */ new WeakSet();
S = function(t) {
  const e = t.target.value;
  this.searchName = e, r(this, u, y).call(this);
};
v = /* @__PURE__ */ new WeakSet();
x = function(t) {
  const e = t.target.value;
  this.selectedTemplate = e, r(this, u, y).call(this);
};
u = /* @__PURE__ */ new WeakSet();
y = function() {
  var t, e;
  this.filteredData = structuredClone(this.partials), this.searchName !== "" && (this.filteredData = (t = this.filteredData) == null ? void 0 : t.filter((a) => a.name.toLowerCase().includes(this.searchName))), this.selectedTemplate !== "" && (this.filteredData = (e = this.filteredData) == null ? void 0 : e.filter((a) => {
    var s;
    return (s = a.templateAlias) == null ? void 0 : s.toLowerCase().includes(this.selectedTemplate);
  })), this.filteredData ? this._tableItems = r(this, p, h).call(this, this.filteredData) : this._tableItems = [];
};
i.styles = [
  I`
            .grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
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
l([
  o()
], i.prototype, "_tableConfig", 2);
l([
  o()
], i.prototype, "_tableColumns", 2);
l([
  o()
], i.prototype, "_tableItems", 2);
l([
  o()
], i.prototype, "templates", 2);
l([
  o()
], i.prototype, "partials", 2);
l([
  o()
], i.prototype, "filteredData", 2);
l([
  o()
], i.prototype, "searchName", 2);
l([
  o()
], i.prototype, "templateOptions", 2);
l([
  o()
], i.prototype, "selectedTemplate", 2);
i = l([
  E("godmode-partial-browser")
], i);
const H = i;
export {
  i as GodModePartialBrowserElement,
  H as default
};
//# sourceMappingURL=godmode-partial-browser.element-DYtdHMMG.js.map
