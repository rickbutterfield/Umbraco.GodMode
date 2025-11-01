import { UmbElementMixin as $ } from "@umbraco-cms/backoffice/element-api";
import { LitElement as S, html as l, css as C, state as n, customElement as I } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute as b } from "@umbraco-cms/backoffice/resources";
import { G as f, s as D } from "./index-D2VaFLfx.js";
import { DirectionModel as g } from "@umbraco-cms/backoffice/external/backend-api";
var M = Object.defineProperty, E = Object.getOwnPropertyDescriptor, v = (t) => {
  throw TypeError(t);
}, o = (t, e, s, h) => {
  for (var u = h > 1 ? void 0 : h ? E(e, s) : e, d = t.length - 1, m; d >= 0; d--)
    (m = t[d]) && (u = (h ? m(e, s, u) : m(u)) || u);
  return h && u && M(e, s, u), u;
}, L = (t, e, s) => e.has(t) || v("Cannot " + s), O = (t, e, s) => e.has(t) ? v("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, s), r = (t, e, s) => (L(t, e, "access private method"), s), i, _, P, c, p, y, x, w, G;
let a = class extends $(S) {
  constructor() {
    super(), O(this, i), this._tableConfig = {
      allowSelection: !1,
      hideIcon: !0
    }, this._tableColumns = [
      {
        name: "Username",
        alias: "username",
        allowSorting: !0,
        width: "20%"
      },
      {
        name: "Name",
        alias: "name",
        allowSorting: !0,
        width: "20%"
      },
      {
        name: "Email",
        alias: "email",
        allowSorting: !0,
        width: "20%"
      },
      {
        name: "Create Date",
        alias: "createDate",
        allowSorting: !0,
        width: "20%"
      },
      {
        name: "Id",
        alias: "id",
        allowSorting: !0,
        width: "20%"
      }
    ], this._tableItems = [], this.data = [], this.selectedGroup = null, this.searchText = "", this.currentPage = 1, this.totalPages = 1, this.totalItems = 0, this.isLoading = !0, this.memberGroups = [], this.memberGroupOptions = [];
  }
  async connectedCallback() {
    super.connectedCallback(), await r(this, i, _).call(this), r(this, i, c).call(this);
  }
  render() {
    return l`
            <umb-body-layout>
                <godmode-header name="Member Browser" slot="header"></godmode-header>
                
                <uui-box headline="Search Filters">
                    <div class="grid">
                        <div>
                            <uui-label>Group:</uui-label>
                            <uui-select
                                .options=${this.memberGroupOptions}
                                @change=${r(this, i, y)}
                            >
                            </uui-select>
                        </div>

                        <div>
                            <uui-label>Search:</uui-label>
                            <uui-input
                                placeholder="Search members"
                                .value=${this.searchText}
                                @input=${r(this, i, x)}>
                            </uui-input>
                        </div>
                    </div>
                </uui-box>

                ${this.isLoading ? l`
                    <uui-loader-bar></uui-loader-bar>
                ` : l``}

                ${!this.isLoading && this._tableItems.length > 0 ? l`
                    <uui-box style="--uui-box-default-padding: 0;">
                        <umb-table .config=${this._tableConfig} .columns=${this._tableColumns} .items=${this._tableItems} @ordered=${r(this, i, P)} />
                    </uui-box>
                ` : l``}

                ${!this.isLoading && this.totalPages > 1 ? l`
                    <uui-box>
                        <div class="pagination">
                            <uui-button
                                label="Previous"
                                look="default"
                                ?disabled=${this.currentPage === 1}
                                @click=${r(this, i, G)}>
                                Previous
                            </uui-button>
                            <span>Page ${this.currentPage} of ${this.totalPages}</span>
                            <uui-button
                                label="Next"
                                look="default"
                                ?disabled=${this.currentPage === this.totalPages}
                                @click=${r(this, i, w)}>
                                Next
                            </uui-button>
                        </div>
                    </uui-box>
                ` : l``}

                ${!this.isLoading && this._tableItems.length === 0 ? l`
                    <uui-box>
                        <p>No members were found for your selected criteria.</p>
                    </uui-box>
                ` : l``}
            </umb-body-layout>
        `;
  }
};
i = /* @__PURE__ */ new WeakSet();
_ = async function() {
  const { data: t } = await b(this, f.getMemberGroups());
  t && (this.memberGroups = t, this.memberGroupOptions = this.memberGroups.map((e) => ({ name: e.name, value: e.id.toString() })), this.memberGroupOptions.unshift({ name: "Any", value: "", selected: !0 }));
};
P = function(t) {
  const e = t.target, s = e.orderingColumn, h = e.orderingDesc;
  this.data = D(structuredClone(this.data), s, h ? g.DESCENDING : g.ASCENDING), this._tableItems = r(this, i, p).call(this, this.data);
};
c = async function() {
  this.isLoading = !0;
  const t = {
    page: this.currentPage,
    pageSize: 50
  };
  this.selectedGroup !== null && (t.groupId = this.selectedGroup), this.searchText && (t.search = this.searchText);
  const { data: e } = await b(this, f.getMembersPaged({ query: t }));
  e && (e.items ? (this.data = e.items || [], this.currentPage = e.currentPage || 1, this.totalPages = e.totalPages || 1, this.totalItems = e.totalItems || 0) : (this.data = [e], this.currentPage = 1, this.totalPages = 1, this.totalItems = 1), this._tableItems = r(this, i, p).call(this, this.data)), this.isLoading = !1;
};
p = function(t) {
  return t.map((e) => {
    var s;
    return {
      id: ((s = e.id) == null ? void 0 : s.toString()) || "",
      data: [
        {
          columnAlias: "username",
          value: l`<strong>${e.username || ""}</strong>`
        },
        {
          columnAlias: "name",
          value: e.name || ""
        },
        {
          columnAlias: "email",
          value: l`<a href="mailto:${e.email}" target="_blank">${e.email || ""}</a>`
        },
        {
          columnAlias: "createDate",
          value: e.createDate ? new Date(e.createDate).toLocaleString() : ""
        },
        {
          columnAlias: "id",
          value: l`<div><strong>${e.id || ""}</strong><br/><code style="font-size: 0.8em;">${e.udi || ""}</code></div>`
        }
      ]
    };
  });
};
y = function(t) {
  const e = t.target.value;
  this.selectedGroup = e ? parseInt(e) : null, this.currentPage = 1, r(this, i, c).call(this);
};
x = function(t) {
  this.searchText = t.target.value.trim(), this.currentPage = 1, r(this, i, c).call(this);
};
w = function() {
  this.currentPage < this.totalPages && (this.currentPage++, r(this, i, c).call(this));
};
G = function() {
  this.currentPage > 1 && (this.currentPage--, r(this, i, c).call(this));
};
a.styles = [
  C`
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

            .pagination {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 20px;
            }
        `
];
o([
  n()
], a.prototype, "_tableConfig", 2);
o([
  n()
], a.prototype, "_tableColumns", 2);
o([
  n()
], a.prototype, "_tableItems", 2);
o([
  n()
], a.prototype, "data", 2);
o([
  n()
], a.prototype, "selectedGroup", 2);
o([
  n()
], a.prototype, "searchText", 2);
o([
  n()
], a.prototype, "currentPage", 2);
o([
  n()
], a.prototype, "totalPages", 2);
o([
  n()
], a.prototype, "totalItems", 2);
o([
  n()
], a.prototype, "isLoading", 2);
o([
  n()
], a.prototype, "memberGroups", 2);
o([
  n()
], a.prototype, "memberGroupOptions", 2);
a = o([
  I("godmode-member-browser")
], a);
const z = a;
export {
  a as GodModeMemberBrowserElement,
  z as default
};
//# sourceMappingURL=godmode-member-browser.element-BliNd0RQ.js.map
