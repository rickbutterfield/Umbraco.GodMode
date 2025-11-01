import { UmbElementMixin as D } from "@umbraco-cms/backoffice/element-api";
import { LitElement as C, html as h, css as x, state as n, customElement as w } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute as N } from "@umbraco-cms/backoffice/resources";
import { s as E, G as I } from "./index-D76lIRat.js";
import { DirectionModel as f } from "@umbraco-cms/backoffice/external/backend-api";
var S = Object.defineProperty, T = Object.getOwnPropertyDescriptor, _ = (t) => {
  throw TypeError(t);
}, r = (t, e, a, s) => {
  for (var m = s > 1 ? void 0 : s ? T(e, a) : e, u = t.length - 1, d; u >= 0; u--)
    (d = t[u]) && (m = (s ? d(e, a, m) : d(m)) || m);
  return s && m && S(e, a, m), m;
}, $ = (t, e, a) => e.has(t) || _("Cannot " + a), P = (t, e, a) => e.has(t) ? _("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), o = (t, e, a) => ($(t, e, "access private method"), a), l, b, v, p, g, y, c;
let i = class extends D(C) {
  constructor() {
    super(), P(this, l), this._tableConfig = {
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
    super.connectedCallback(), o(this, l, v).call(this);
  }
  render() {
    return h`
            <umb-body-layout>
                <godmode-header name="Partial Browser" slot="header"></godmode-header>
                <uui-box>
                    <div class="grid">
                        <div>
                            <uui-label>Search:</uui-label>
                            <uui-input
                                placeholder="Filter partial names"
                                .value=${this.searchName}
                                @input=${o(this, l, g)}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label>In Template:</uui-label>
                            <uui-select
                                .options=${this.templateOptions}
                                .value=${this.selectedTemplate}
                                @change=${o(this, l, y)}>
                            </uui-select>
                        </div>
                    </div>
                </uui-box>

                ${this._tableItems.length !== 0 ? h`
                    <uui-box style="--uui-box-default-padding: 0;">
                        <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${o(this, l, b)} />
                    </uui-box>
                ` : h``}
            </umb-body-layout>
        `;
  }
};
l = /* @__PURE__ */ new WeakSet();
b = function(t) {
  const e = t.target, a = e.orderingColumn, s = e.orderingDesc;
  this.filteredData = E(structuredClone(this.partials), a, s ? f.DESCENDING : f.ASCENDING), this._tableItems = o(this, l, p).call(this, this.filteredData);
};
v = async function() {
  const { data: t } = await N(this, I.getUmbracoManagementApiV1GodModeGetTemplates());
  if (t) {
    this.templates = t, this.partials = t.map((a) => a.partials).reduce((a, s) => a.concat(s)), this.filteredData = structuredClone(this.partials), this._tableItems = o(this, l, p).call(this, this.filteredData);
    let e = [...new Set(this.partials.map((a) => a.templateAlias))];
    this.templateOptions = e.map((a) => ({ name: a, value: a })), this.templateOptions.unshift({ name: "Any", value: "", selected: !0 });
  }
};
p = function(t) {
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
g = function(t) {
  const e = t.target.value;
  this.searchName = e, o(this, l, c).call(this);
};
y = function(t) {
  const e = t.target.value;
  this.selectedTemplate = e, o(this, l, c).call(this);
};
c = function() {
  var t, e;
  this.filteredData = structuredClone(this.partials), this.searchName !== "" && (this.filteredData = (t = this.filteredData) == null ? void 0 : t.filter((a) => a.name.toLowerCase().includes(this.searchName))), this.selectedTemplate !== "" && (this.filteredData = (e = this.filteredData) == null ? void 0 : e.filter((a) => {
    var s;
    return (s = a.templateAlias) == null ? void 0 : s.toLowerCase().includes(this.selectedTemplate);
  })), this.filteredData ? this._tableItems = o(this, l, p).call(this, this.filteredData) : this._tableItems = [];
};
i.styles = [
  x`
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
r([
  n()
], i.prototype, "_tableConfig", 2);
r([
  n()
], i.prototype, "_tableColumns", 2);
r([
  n()
], i.prototype, "_tableItems", 2);
r([
  n()
], i.prototype, "templates", 2);
r([
  n()
], i.prototype, "partials", 2);
r([
  n()
], i.prototype, "filteredData", 2);
r([
  n()
], i.prototype, "searchName", 2);
r([
  n()
], i.prototype, "templateOptions", 2);
r([
  n()
], i.prototype, "selectedTemplate", 2);
i = r([
  w("godmode-partial-browser")
], i);
const L = i;
export {
  i as GodModePartialBrowserElement,
  L as default
};
//# sourceMappingURL=godmode-partial-browser.element-9nwrrcAZ.js.map
