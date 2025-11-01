import { tryExecute as c } from "@umbraco-cms/backoffice/resources";
import { html as C, css as _, state as l, customElement as T } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as P } from "@umbraco-cms/backoffice/lit-element";
import { G as p } from "./index-D2VaFLfx.js";
import { UMB_NOTIFICATION_CONTEXT as $ } from "@umbraco-cms/backoffice/notification";
import { UmbLanguageCollectionRepository as x } from "@umbraco-cms/backoffice/language";
var M = Object.defineProperty, E = Object.getOwnPropertyDescriptor, f = (e) => {
  throw TypeError(e);
}, u = (e, t, a, i) => {
  for (var n = i > 1 ? void 0 : i ? E(t, a) : t, m = e.length - 1, d; m >= 0; m--)
    (d = e[m]) && (n = (i ? d(t, a, n) : d(n)) || n);
  return i && n && M(t, a, n), n;
}, b = (e, t, a) => t.has(e) || f("Cannot " + a), s = (e, t, a) => (b(e, t, "read from private field"), t.get(e)), g = (e, t, a) => t.has(e) ? f("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), A = (e, t, a, i) => (b(e, t, "write to private field"), t.set(e, a), a), y = (e, t, a) => (b(e, t, "access private method"), a), r, w, h, U, v, k;
let o = class extends P {
  constructor() {
    super(), g(this, h), g(this, r), g(this, w, new x(this)), this.languages = [], this.cultures = [], this._selectedCulture = "", this.warmingUp = !1, this.warmUpCurrentUrl = "", this.warmUpCurrent = 1, this.warmUpCount = 0, this.consumeContext($, (e) => {
      A(this, r, e);
    }), y(this, h, U).call(this);
  }
  async clearUmbracoCache(e) {
    var a, i, n;
    const { data: t } = await c(this, p.clearUmbracoCache({ query: { cache: e } }));
    t && t.message && (t.responseType === "Error" ? (a = s(this, r)) == null || a.peek("danger", { data: { message: t.message } }) : t.responseType === "Success" ? (i = s(this, r)) == null || i.peek("positive", { data: { message: t.message } }) : t.responseType === "Warning" && ((n = s(this, r)) == null || n.peek("warning", { data: { message: t.message } })));
  }
  async purgeMediaCache() {
    var e, t, a;
    if (window.confirm("This will attempt to delete all the cached image crops on disk in the TEMP/MediaCache. IO operations can sometimes fail. Are you sure?")) {
      const { data: i } = await c(this, p.purgeMediaCache());
      i && i.message && (i.responseType === "Error" ? (e = s(this, r)) == null || e.peek("danger", { data: { message: i.message } }) : i.responseType === "Success" ? (t = s(this, r)) == null || t.peek("positive", { data: { message: i.message } }) : i.responseType === "Warning" && ((a = s(this, r)) == null || a.peek("warning", { data: { message: i.message } })));
    }
  }
  async restartAppPool() {
    var e, t, a;
    if (window.confirm("This will take the site offline (and won't restart it). Are you really, really, really sure?")) {
      const { data: i } = await c(this, p.restartAppPool());
      i && i.message && (i.responseType === "Error" ? (e = s(this, r)) == null || e.peek("danger", { data: { message: i.message } }) : i.responseType === "Success" ? (t = s(this, r)) == null || t.peek("positive", { data: { message: i.message } }) : i.responseType === "Warning" && ((a = s(this, r)) == null || a.peek("warning", { data: { message: i.message } })));
    }
  }
  async warmUpTemplates() {
    const { data: e } = await c(this, p.getTemplateUrlsToPing());
    e && await this._pingUrls(e);
  }
  async pingUrls() {
    const { data: e } = await c(this, p.getUrlsToPing({ query: { culture: this._selectedCulture } }));
    e && await this._pingUrls(e);
  }
  async _pingUrls(e) {
    var t;
    this.warmingUp = !0, this.warmUpCount = e.length, this.warmUpCount === 0 && ((t = s(this, r)) == null || t.peek("warning", { data: { message: "THe URL list was empty..." } })), e.forEach(async (a) => {
      this.warmingUp = !0, this.warmUpCurrentUrl = a, (await fetch(a)).ok ? this.warmUpCurrent++ : this.warmUpCurrent++, this.warmUpCurrent === this.warmUpCount && (this.warmingUp = !1);
    });
  }
  render() {
    return C`
            <umb-body-layout>
                <godmode-header name="Utility Browser" slot="header"></godmode-header>
                <uui-box headline="Caches">
                    <span slot="header">Clear out the internal Umbraco in-memory caches</span>
                    <div class="grid">
                        <div>
                            <uui-button type="button" look="primary" color="warning" label="Clear Request Cache" @click=${() => this.clearUmbracoCache("Request")}>
                                <uui-icon name="icon-delete"></uui-icon> Clear Request Cache
                            </uui-button>
                        </div>

                        <div>
                            <uui-button type="button" look="primary" color="warning" label="Clear Runtime Cache" @click=${() => this.clearUmbracoCache("Runtime")}>
                                <uui-icon name="icon-delete"></uui-icon> Clear Runtime Cache
                            </uui-button>
                        </div>

                        <div>
                            <uui-button type="button" look="primary" color="warning" label="Clear Isolated Cache" @click=${() => this.clearUmbracoCache("Isolated")}>
                                <uui-icon name="icon-delete"></uui-icon> Clear Isolated Cache
                            </uui-button>
                        </div>

                        <div>
                            <uui-button type="button" look="primary" color="warning" label="Clear Partial Cache" @click=${() => this.clearUmbracoCache("Partial")}>
                                <uui-icon name="icon-delete"></uui-icon> Clear Partial Cache
                            </uui-button>
                        </div>

                        <div>
                            <uui-button type="button" look="primary" color="warning" label="Clear Other Cache" @click=${() => this.clearUmbracoCache("Other")}>
                                <uui-icon name="icon-delete"></uui-icon> Clear Other Cache
                            </uui-button>
                        </div>

                        <div>
                            <uui-button type="button" look="primary" color="danger" label="Clear All Caches" @click=${() => this.clearUmbracoCache("all")}>
                                <uui-icon name="icon-delete"></uui-icon> Clear All Caches
                            </uui-button>
                        </div>
                    </div>
                </uui-box>

                <uui-box headline="TEMP Files">
                    <span slot="header">Purge temporary / cached files</span>

                    <div class="grid">
                        <div>
                            <uui-button type="button" look="primary" color="warning" label="Purge Media Cache" @click=${() => this.purgeMediaCache()}>
                                <uui-icon name="icon-hard-drive"></uui-icon> Purge Media Cache
                            </uui-button>
                        </div>
                    </div>
                </uui-box>

                <uui-box headline="Application">
                    <span slot="header">Here be dragons</span>
                    <div class="grid">
                        <div>
                            <uui-button type="button" look="primary" color="danger" label="Stop Application" @click=${() => this.restartAppPool()}>
                                <uui-icon name="icon-scull"></uui-icon> Stop Application
                            </uui-button>
                        </div>
                        <div>
                            <uui-button type="button" look="primary" color="default" label="Warm-Up Templates" @click=${() => this.warmUpTemplates()}>
                                <uui-icon name="icon-server"></uui-icon> Warm-Up Templates
                            </uui-button>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <uui-button type="button" look="primary" color="default" label="Ping URLs" @click=${() => this.pingUrls()}>
                                <uui-icon name="icon-server"></uui-icon> Ping URLs
                            </uui-button>
                            <uui-select
                                placeholder="No culture"
                                .options=${this.cultures}
                                @change=${y(this, h, v)}>
                            </uui-select>
                        </div>
                    </div>
                </uui-box>

                ${y(this, h, k).call(this)}
            </umb-body-layout>
        `;
  }
};
r = /* @__PURE__ */ new WeakMap();
w = /* @__PURE__ */ new WeakMap();
h = /* @__PURE__ */ new WeakSet();
U = async function() {
  const { data: e } = await s(this, w).requestCollection({});
  if (e) {
    this.languages = e.items;
    const t = this.languages.map((a) => ({ name: a.name, value: a.unique }));
    this.cultures = t;
  }
};
v = function(e) {
  this._selectedCulture = e.target.value;
};
k = function() {
  return this.warmingUp ? C`
                <uui-box>
                    <uui-loader-bar animationDuration="1.5" style="color: black"></uui-loader-bar>
                    <p>Warming up ${this.warmUpCurrent} of ${this.warmUpCount} - pinging URL: <a href=${this.warmUpCurrentUrl} target="_blank">${this.warmUpCurrentUrl}</a></p>
                </uui-box>
            ` : C``;
};
o.styles = [
  _`
            .grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;
            }

            uui-box {
                margin-bottom: 20px;
            }
        `
];
u([
  l()
], o.prototype, "languages", 2);
u([
  l()
], o.prototype, "cultures", 2);
u([
  l()
], o.prototype, "_selectedCulture", 2);
u([
  l()
], o.prototype, "warmingUp", 2);
u([
  l()
], o.prototype, "warmUpCurrentUrl", 2);
u([
  l()
], o.prototype, "warmUpCurrent", 2);
u([
  l()
], o.prototype, "warmUpCount", 2);
o = u([
  T("godmode-utility-browser")
], o);
const L = o;
export {
  o as GodModeUtilityBrowserElement,
  L as default
};
//# sourceMappingURL=godmode-utility-browser.element-CizrqsjY.js.map
