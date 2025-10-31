import { UmbElementMixin as _ } from "@umbraco-cms/backoffice/element-api";
import { LitElement as w, html as l, css as v, state as c, customElement as y } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute as M } from "@umbraco-cms/backoffice/resources";
import { a as x } from "./index-CJ2F2uoa.js";
var C = Object.defineProperty, S = Object.getOwnPropertyDescriptor, h = (e) => {
  throw TypeError(e);
}, s = (e, t, a, r) => {
  for (var o = r > 1 ? void 0 : r ? S(t, a) : t, d = e.length - 1, n; d >= 0; d--)
    (n = e[d]) && (o = (r ? n(t, a, o) : n(o)) || o);
  return r && o && C(t, a, o), o;
}, B = (e, t, a) => t.has(e) || h("Cannot " + a), E = (e, t, a) => t.has(e) ? h("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), m = (e, t, a) => (B(e, t, "access private method"), a), u, p, g, b, f;
let i = class extends _(w) {
  constructor() {
    super(), E(this, u), this._tableConfig = {
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
        name: "Type",
        alias: "type",
        allowSorting: !0,
        width: "15%"
      },
      {
        name: "Extension",
        alias: "ext",
        allowSorting: !0,
        width: "10%"
      },
      {
        name: "Size",
        alias: "size",
        allowSorting: !0,
        width: "15%"
      },
      {
        name: "Created",
        alias: "createDate",
        allowSorting: !0,
        width: "20%"
      },
      {
        name: "Path",
        alias: "path",
        allowSorting: !1,
        width: "15%"
      }
    ], this._tableItems = [], this.searchName = "", this.isLoading = !0;
  }
  async connectedCallback() {
    super.connectedCallback(), m(this, u, g).call(this);
  }
  render() {
    return l`
            <umb-body-layout>
                <godmode-header name="Media Browser" slot="header"></godmode-header>
                
                <uui-box>
                    <uui-label>Search:</uui-label>
                    <uui-input
                        placeholder="Filter by name"
                        .value=${this.searchName}
                        @input=${m(this, u, f)}>
                    </uui-input>
                </uui-box>

                ${this.isLoading ? l`
                    <uui-loader-bar></uui-loader-bar>
                ` : l``}

                ${!this.isLoading && this._tableItems.length > 0 ? l`
                    <uui-box style="--uui-box-default-padding: 0;">
                        <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${m(this, u, p)} />
                    </uui-box>
                ` : l``}
            </umb-body-layout>
        `;
  }
};
u = /* @__PURE__ */ new WeakSet();
p = function(e) {
  const t = e.target;
  t.orderingColumn, t.orderingDesc;
};
g = async function() {
  this.isLoading = !0;
  const { data: e } = await M(this, x.getUmbracoManagementApiV1GodModeGetMedia());
  e && (this.data = e, this._tableItems = m(this, u, b).call(this, e)), this.isLoading = !1;
};
b = function(e) {
  var a;
  const t = (r) => {
    if (r === 0) return "0 Bytes";
    const o = 1024, d = ["Bytes", "KB", "MB", "GB"], n = Math.floor(Math.log(r) / Math.log(o));
    return Math.round(r / Math.pow(o, n) * 100) / 100 + " " + d[n];
  };
  return [{
    id: ((a = e.id) == null ? void 0 : a.toString()) || "",
    data: [
      {
        columnAlias: "name",
        value: l`<strong>${e.name || ""}</strong>`
      },
      {
        columnAlias: "type",
        value: e.type || ""
      },
      {
        columnAlias: "ext",
        value: e.ext || ""
      },
      {
        columnAlias: "size",
        value: t(e.size || 0)
      },
      {
        columnAlias: "createDate",
        value: e.createDate ? new Date(e.createDate).toLocaleString() : ""
      },
      {
        columnAlias: "path",
        value: e.path || ""
      }
    ]
  }];
};
f = function(e) {
  const t = e.target.value;
  this.searchName = t.toLowerCase();
};
i.styles = [
  v`
            uui-box {
                margin-bottom: 20px;
            }
        `
];
s([
  c()
], i.prototype, "_tableConfig", 2);
s([
  c()
], i.prototype, "_tableColumns", 2);
s([
  c()
], i.prototype, "_tableItems", 2);
s([
  c()
], i.prototype, "data", 2);
s([
  c()
], i.prototype, "searchName", 2);
s([
  c()
], i.prototype, "isLoading", 2);
i = s([
  y("godmode-media-browser")
], i);
const G = i;
export {
  i as GodModeMediaBrowserElement,
  G as default
};
//# sourceMappingURL=godmode-media-browser.element-56bUVgqm.js.map
