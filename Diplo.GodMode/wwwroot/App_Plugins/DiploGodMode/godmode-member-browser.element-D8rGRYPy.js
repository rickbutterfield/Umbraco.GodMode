import { UmbElementMixin as f } from "@umbraco-cms/backoffice/element-api";
import { LitElement as v, html as s, css as w, state as l, customElement as y } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute as C } from "@umbraco-cms/backoffice/resources";
import { a as M } from "./index-CJ2F2uoa.js";
var S = Object.defineProperty, x = Object.getOwnPropertyDescriptor, h = (e) => {
  throw TypeError(e);
}, i = (e, t, o, u) => {
  for (var r = u > 1 ? void 0 : u ? x(t, o) : t, c = e.length - 1, d; c >= 0; c--)
    (d = e[c]) && (r = (u ? d(t, o, r) : d(r)) || r);
  return u && r && S(t, o, r), r;
}, E = (e, t, o) => t.has(e) || h("Cannot " + o), $ = (e, t, o) => t.has(e) ? h("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, o), m = (e, t, o) => (E(e, t, "access private method"), o), n, b, p, _, g;
let a = class extends f(v) {
  constructor() {
    super(), $(this, n), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "Username",
        alias: "username",
        allowSorting: !0,
        width: "25%"
      },
      {
        name: "Name",
        alias: "name",
        allowSorting: !0,
        width: "25%"
      },
      {
        name: "Email",
        alias: "email",
        allowSorting: !0,
        width: "30%"
      },
      {
        name: "Created",
        alias: "createDate",
        allowSorting: !0,
        width: "20%"
      }
    ], this._tableItems = [], this.searchName = "", this.isLoading = !0;
  }
  async connectedCallback() {
    super.connectedCallback(), m(this, n, p).call(this);
  }
  render() {
    return s`
            <umb-body-layout>
                <godmode-header name="Member Browser" slot="header"></godmode-header>
                
                <uui-box>
                    <uui-label>Search:</uui-label>
                    <uui-input
                        placeholder="Filter by username or email"
                        .value=${this.searchName}
                        @input=${m(this, n, g)}>
                    </uui-input>
                </uui-box>

                ${this.isLoading ? s`
                    <uui-loader-bar></uui-loader-bar>
                ` : s``}

                ${!this.isLoading && this._tableItems.length > 0 ? s`
                    <uui-box style="--uui-box-default-padding: 0;">
                        <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${m(this, n, b)} />
                    </uui-box>
                ` : s``}
            </umb-body-layout>
        `;
  }
};
n = /* @__PURE__ */ new WeakSet();
b = function(e) {
  e.target;
};
p = async function() {
  this.isLoading = !0;
  const { data: e } = await C(this, M.getUmbracoManagementApiV1GodModeGetMembersPaged());
  e && (this.data = e, this._tableItems = m(this, n, _).call(this, e)), this.isLoading = !1;
};
_ = function(e) {
  var t;
  return [{
    id: ((t = e.id) == null ? void 0 : t.toString()) || "",
    data: [
      {
        columnAlias: "username",
        value: s`<strong>${e.username || ""}</strong>`
      },
      {
        columnAlias: "name",
        value: e.name || ""
      },
      {
        columnAlias: "email",
        value: e.email || ""
      },
      {
        columnAlias: "createDate",
        value: e.createDate ? new Date(e.createDate).toLocaleString() : ""
      }
    ]
  }];
};
g = function(e) {
  const t = e.target.value;
  this.searchName = t.toLowerCase();
};
a.styles = [
  w`
            uui-box {
                margin-bottom: 20px;
            }
        `
];
i([
  l()
], a.prototype, "_tableConfig", 2);
i([
  l()
], a.prototype, "_tableColumns", 2);
i([
  l()
], a.prototype, "_tableItems", 2);
i([
  l()
], a.prototype, "data", 2);
i([
  l()
], a.prototype, "searchName", 2);
i([
  l()
], a.prototype, "isLoading", 2);
a = i([
  y("godmode-member-browser")
], a);
const I = a;
export {
  a as GodModeMemberBrowserElement,
  I as default
};
//# sourceMappingURL=godmode-member-browser.element-D8rGRYPy.js.map
