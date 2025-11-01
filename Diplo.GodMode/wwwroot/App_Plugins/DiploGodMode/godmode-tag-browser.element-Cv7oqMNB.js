import { UmbElementMixin as E } from "@umbraco-cms/backoffice/element-api";
import { LitElement as N, repeat as f, html as r, css as O, state as c, customElement as S } from "@umbraco-cms/backoffice/external/lit";
import { tryExecute as v } from "@umbraco-cms/backoffice/resources";
import { G as x } from "./index-D2VaFLfx.js";
import { UMB_NOTIFICATION_CONTEXT as D } from "@umbraco-cms/backoffice/notification";
var B = Object.defineProperty, F = Object.getOwnPropertyDescriptor, C = (e) => {
  throw TypeError(e);
}, h = (e, t, s, l) => {
  for (var i = l > 1 ? void 0 : l ? F(t, s) : t, p = e.length - 1, a; p >= 0; p--)
    (a = e[p]) && (i = (l ? a(t, s, i) : a(i)) || i);
  return l && i && B(t, s, i), i;
}, T = (e, t, s) => t.has(e) || C("Cannot " + s), $ = (e, t, s) => (T(e, t, "read from private field"), t.get(e)), w = (e, t, s) => t.has(e) ? C("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), z = (e, t, s, l) => (T(e, t, "write to private field"), t.set(e, s), s), n = (e, t, s) => (T(e, t, "access private method"), s), g, o, y, _, G, L, m, b, k;
let d = class extends E(N) {
  constructor() {
    super(), w(this, o), w(this, g), this.tags = [], this.filteredTags = [], this.orphanedTags = [], this.searchTagName = "", this.searchTagGroup = "", this.searchTagContent = "", this.isLoading = !0, this.consumeContext(D, (e) => {
      z(this, g, e);
    });
  }
  async connectedCallback() {
    super.connectedCallback(), n(this, o, y).call(this);
  }
  render() {
    return r`
            <umb-body-layout>
                <godmode-header name="Tag Browser" slot="header"></godmode-header>
                
                <uui-box>
                    <div class="filter-grid">
                        <div>
                            <uui-label>Tag Name:</uui-label>
                            <uui-input
                                placeholder="Filter tag names"
                                .value=${this.searchTagName}
                                @input=${n(this, o, _)}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label>Tag Group:</uui-label>
                            <uui-input
                                placeholder="Filter tag groups"
                                .value=${this.searchTagGroup}
                                @input=${n(this, o, G)}>
                            </uui-input>
                        </div>
                        <div>
                            <uui-label>Content:</uui-label>
                            <uui-input
                                placeholder="Filter tagged content"
                                .value=${this.searchTagContent}
                                @input=${n(this, o, L)}>
                            </uui-input>
                        </div>
                    </div>
                </uui-box>

                ${this.isLoading ? r`
                    <uui-loader-bar></uui-loader-bar>
                ` : r``}

                ${!this.isLoading && this.filteredTags.length > 0 ? r`
                    <p class="results-info">
                        <strong>${this.filteredTags.length}</strong> / <strong>${this.tags.length}</strong> tags
                    </p>
                ` : r``}

                ${f(
      this.filteredTags,
      (e) => e.key,
      (e) => {
        var t, s, l, i, p;
        return r`
                        <uui-box>
                            <div slot="headline" class="tag-header">
                                <div class="tag-info">
                                    <h3>
                                        <uui-icon name="icon-tag"></uui-icon>
                                        ${((t = e.tag) == null ? void 0 : t.text) || ""}
                                        <span class="node-count">${((s = e.tag) == null ? void 0 : s.nodeCount) || 0}</span>
                                        <span class="label">${((l = e.tag) == null ? void 0 : l.group) || ""}</span>
                                        ${(i = e.tag) != null && i.culture ? r`<span class="label">${e.tag.culture}</span>` : ""}
                                    </h3>
                                </div>
                                <div>
                                    <uui-button 
                                        type="button" 
                                        look="primary" 
                                        color="danger"
                                        label="Delete '${((p = e.tag) == null ? void 0 : p.text) || ""}'"
                                        @click=${() => {
          var a, u;
          return n(this, o, b).call(this, ((a = e.tag) == null ? void 0 : a.id) || 0, ((u = e.tag) == null ? void 0 : u.text) || "");
        }}>
                                        Delete
                                    </uui-button>
                                </div>
                            </div>

                            ${e.content && e.content.length > 0 ? r`
                                <div class="content-table">
                                    ${f(
          n(this, o, k).call(this, e.content),
          (a) => a.id,
          (a) => r`
                                            <div class="content-row">
                                                <div class="content-name">
                                                    <strong>${(a == null ? void 0 : a.name) || ""}</strong>
                                                </div>
                                                <div class="content-alias">
                                                    <uui-icon name="${(a == null ? void 0 : a.icon) || "icon-document"}"></uui-icon>
                                                    ${(a == null ? void 0 : a.alias) || ""}
                                                </div>
                                                <div class="content-tags">
                                                    ${a != null && a.tags ? f(
            a.tags,
            (u) => u.id,
            (u) => r`<span class="label">${(u == null ? void 0 : u.text) || ""}</span>`
          ) : ""}
                                                </div>
                                                <div class="content-id">
                                                    <div>${(a == null ? void 0 : a.id) || ""}</div>
                                                    <code>${(a == null ? void 0 : a.udi) || ""}</code>
                                                </div>
                                            </div>
                                        `
        )}
                                </div>
                            ` : r``}
                        </uui-box>
                    `;
      }
    )}

                ${this.orphanedTags && this.orphanedTags.length > 0 ? r`
                    <uui-box headline="Orphaned Tags">
                        <p>The following tags exist in the database but are not associated with any content. You may delete them if you wish:</p>
                        <ul class="orphaned-tags-list">
                            ${f(
      this.orphanedTags,
      (e) => e.id,
      (e) => r`
                                    <li>
                                        <span class="label">${(e == null ? void 0 : e.text) || ""}</span>
                                        <span class="label">${(e == null ? void 0 : e.group) || ""}</span>
                                        ${e != null && e.culture ? r`<span class="label">${e.culture}</span>` : ""}
                                        <uui-button 
                                            type="button" 
                                            look="primary" 
                                            color="danger"
                                            compact
                                            label="Delete '${(e == null ? void 0 : e.text) || ""}'"
                                            @click=${() => n(this, o, b).call(this, (e == null ? void 0 : e.id) || 0, (e == null ? void 0 : e.text) || "")}>
                                            <uui-icon name="icon-delete"></uui-icon>
                                        </uui-button>
                                    </li>
                                `
    )}
                        </ul>
                    </uui-box>
                ` : r``}
            </umb-body-layout>
        `;
  }
};
g = /* @__PURE__ */ new WeakMap();
o = /* @__PURE__ */ new WeakSet();
y = async function() {
  this.isLoading = !0;
  const { data: e } = await v(this, x.getTagMapping()), { data: t } = await v(this, x.getOrphanedTags());
  e && (this.tags = e, this.filteredTags = structuredClone(this.tags)), t && (this.orphanedTags = t), this.isLoading = !1;
};
_ = function(e) {
  const t = e.target.value;
  this.searchTagName = t.toLowerCase(), n(this, o, m).call(this);
};
G = function(e) {
  const t = e.target.value;
  this.searchTagGroup = t.toLowerCase(), n(this, o, m).call(this);
};
L = function(e) {
  const t = e.target.value;
  this.searchTagContent = t.toLowerCase(), n(this, o, m).call(this);
};
m = function() {
  this.filteredTags = this.tags.filter((e) => {
    var t, s;
    return !(this.searchTagName && ((t = e.tag) != null && t.text) && !e.tag.text.toLowerCase().includes(this.searchTagName) || this.searchTagGroup && ((s = e.tag) != null && s.group) && !e.tag.group.toLowerCase().includes(this.searchTagGroup) || this.searchTagContent && e.content && !e.content.some(
      (i) => (i == null ? void 0 : i.name) && i.name.toLowerCase().includes(this.searchTagContent)
    ));
  });
};
b = async function(e, t) {
  var l, i;
  if (!window.confirm(`Are you sure you want to permanently delete the tag '${t}'?`))
    return;
  const { data: s } = await v(this, x.deleteTag({ query: { id: e } }));
  s ? ((l = $(this, g)) == null || l.peek("positive", { data: { message: `Successfully deleted the tag '${t}'` } }), n(this, o, y).call(this)) : (i = $(this, g)) == null || i.peek("danger", { data: { message: `Error deleting the tag '${t}'` } });
};
k = function(e) {
  return this.searchTagContent ? e.filter((t) => (t == null ? void 0 : t.name) && t.name.toLowerCase().includes(this.searchTagContent)) : e;
};
d.styles = [
  O`
            .filter-grid {
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

            .results-info {
                margin-bottom: 10px;
                font-size: 14px;
            }

            .tag-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
            }

            .tag-info h3 {
                display: flex;
                align-items: center;
                gap: 8px;
                margin: 0;
            }

            .node-count {
                background: var(--uui-color-surface-emphasis);
                padding: 2px 8px;
                border-radius: 3px;
                font-size: 12px;
            }

            .label {
                background: var(--uui-color-surface);
                padding: 2px 8px;
                border-radius: 3px;
                font-size: 12px;
                border: 1px solid var(--uui-color-border);
            }

            .content-table {
                margin-top: 16px;
            }

            .content-row {
                display: grid;
                grid-template-columns: 30% 20% 30% 20%;
                gap: 10px;
                padding: 12px 0;
                border-bottom: 1px solid var(--uui-color-border);
            }

            .content-row:last-child {
                border-bottom: none;
            }

            .content-name {
                display: flex;
                align-items: center;
            }

            .content-alias {
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .content-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 4px;
                align-items: center;
            }

            .content-id {
                font-size: 12px;
            }

            .content-id code {
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .orphaned-tags-list {
                list-style: none;
                padding: 0;
                margin: 16px 0 0 0;
            }

            .orphaned-tags-list li {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 0;
                border-bottom: 1px solid var(--uui-color-border);
            }

            .orphaned-tags-list li:last-child {
                border-bottom: none;
            }
        `
];
h([
  c()
], d.prototype, "tags", 2);
h([
  c()
], d.prototype, "filteredTags", 2);
h([
  c()
], d.prototype, "orphanedTags", 2);
h([
  c()
], d.prototype, "searchTagName", 2);
h([
  c()
], d.prototype, "searchTagGroup", 2);
h([
  c()
], d.prototype, "searchTagContent", 2);
h([
  c()
], d.prototype, "isLoading", 2);
d = h([
  S("godmode-tag-browser")
], d);
const q = d;
export {
  d as GodModeTagBrowserElement,
  q as default
};
//# sourceMappingURL=godmode-tag-browser.element-Cv7oqMNB.js.map
