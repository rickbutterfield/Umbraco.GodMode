import { tryExecute as c } from "@umbraco-cms/backoffice/resources";
import { html as y, css as _, state as l, customElement as T } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as P } from "@umbraco-cms/backoffice/lit-element";
import { G as p } from "./index-fy-rxTHq.js";
import { UMB_NOTIFICATION_CONTEXT as $ } from "@umbraco-cms/backoffice/notification";
import { UmbLanguageCollectionRepository as M } from "@umbraco-cms/backoffice/language";
var x = Object.defineProperty, E = Object.getOwnPropertyDescriptor, f = (e) => {
  throw TypeError(e);
}, u = (e, t, i, a) => {
  for (var n = a > 1 ? void 0 : a ? E(t, i) : t, m = e.length - 1, d; m >= 0; m--)
    (d = e[m]) && (n = (a ? d(t, i, n) : d(n)) || n);
  return a && n && x(t, i, n), n;
}, w = (e, t, i) => t.has(e) || f("Cannot " + i), o = (e, t, i) => (w(e, t, "read from private field"), t.get(e)), g = (e, t, i) => t.has(e) ? f("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), A = (e, t, i, a) => (w(e, t, "write to private field"), t.set(e, i), i), C = (e, t, i) => (w(e, t, "access private method"), i), r, b, h, U, v, k;
let s = class extends P {
  constructor() {
    super(), g(this, h), g(this, r), g(this, b, new M(this)), this.languages = [], this.cultures = [], this._selectedCulture = "", this.warmingUp = !1, this.warmUpCurrentUrl = "", this.warmUpCurrent = 1, this.warmUpCount = 0, this.consumeContext($, (e) => {
      A(this, r, e);
    }), C(this, h, U).call(this);
  }
  async clearUmbracoCache(e) {
    var i, a, n;
    const { data: t } = await c(this, p.clearUmbracoCache({ query: { cache: e } }));
    t && t.message && (t.responseType === "Error" ? (i = o(this, r)) == null || i.peek("danger", { data: { message: t.message } }) : t.responseType === "Success" ? (a = o(this, r)) == null || a.peek("positive", { data: { message: t.message } }) : t.responseType === "Warning" && ((n = o(this, r)) == null || n.peek("warning", { data: { message: t.message } })));
  }
  async purgeMediaCache() {
    var e, t, i;
    if (window.confirm("This will attempt to delete all the cached image crops on disk in the TEMP/MediaCache. IO operations can sometimes fail. Are you sure?")) {
      const { data: a } = await c(this, p.purgeMediaCache());
      a && a.message && (a.responseType === "Error" ? (e = o(this, r)) == null || e.peek("danger", { data: { message: a.message } }) : a.responseType === "Success" ? (t = o(this, r)) == null || t.peek("positive", { data: { message: a.message } }) : a.responseType === "Warning" && ((i = o(this, r)) == null || i.peek("warning", { data: { message: a.message } })));
    }
  }
  async restartAppPool() {
    var e, t, i;
    if (window.confirm("This will take the site offline (and won't restart it). Are you really, really, really sure?")) {
      const { data: a } = await c(this, p.restartAppPool());
      a && a.message && (a.responseType === "Error" ? (e = o(this, r)) == null || e.peek("danger", { data: { message: a.message } }) : a.responseType === "Success" ? (t = o(this, r)) == null || t.peek("positive", { data: { message: a.message } }) : a.responseType === "Warning" && ((i = o(this, r)) == null || i.peek("warning", { data: { message: a.message } })));
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
    this.warmingUp = !0, this.warmUpCount = e.length, this.warmUpCount === 0 && ((t = o(this, r)) == null || t.peek("warning", { data: { message: "THe URL list was empty..." } })), e.forEach(async (i) => {
      this.warmingUp = !0, this.warmUpCurrentUrl = i, (await fetch(i)).ok ? this.warmUpCurrent++ : this.warmUpCurrent++, this.warmUpCurrent === this.warmUpCount && (this.warmingUp = !1);
    });
  }
  render() {
    return y`
            <umb-body-layout>
                <godmode-header name="Utility Browser" slot="header"></godmode-header>
                <uui-box headline="Caches">
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
                    <div class="grid">
                        <div>
                            <uui-button type="button" look="primary" color="warning" label="Purge Media Cache" @click=${() => this.purgeMediaCache()}>
                                <uui-icon name="icon-hard-drive"></uui-icon> Purge Media Cache
                            </uui-button>
                        </div>
                    </div>
                </uui-box>

                <uui-box headline="Application">
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
                        <div>
                            <uui-button type="button" look="primary" color="default" label="Ping URLs" @click=${() => this.pingUrls()}>
                                <uui-icon name="icon-server"></uui-icon> Ping URLs
                            </uui-button>
                            <uui-select
                                placeholder="No culture"
                                .options=${this.cultures}
                                @change=${C(this, h, v)}>
                            </uui-select>
                        </div>
                    </div>
                </uui-box>

                ${C(this, h, k).call(this)}
            </umb-body-layout>
        `;
  }
};
r = /* @__PURE__ */ new WeakMap();
b = /* @__PURE__ */ new WeakMap();
h = /* @__PURE__ */ new WeakSet();
U = async function() {
  const { data: e } = await o(this, b).requestCollection({});
  if (e) {
    this.languages = e.items;
    const t = this.languages.map((i) => ({ name: i.name, value: i.unique }));
    this.cultures = t;
  }
};
v = function(e) {
  this._selectedCulture = e.target.value;
};
k = function() {
  return this.warmingUp ? y`
                <uui-box>
                    <uui-loader-bar animationDuration="1.5" style="color: black"></uui-loader-bar>
                    <p>Warming up ${this.warmUpCurrent} of ${this.warmUpCount} - pinging URL: <a href=${this.warmUpCurrentUrl} target="_blank">${this.warmUpCurrentUrl}</a></p>
                </uui-box>
            ` : y``;
};
s.styles = [
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
], s.prototype, "languages", 2);
u([
  l()
], s.prototype, "cultures", 2);
u([
  l()
], s.prototype, "_selectedCulture", 2);
u([
  l()
], s.prototype, "warmingUp", 2);
u([
  l()
], s.prototype, "warmUpCurrentUrl", 2);
u([
  l()
], s.prototype, "warmUpCurrent", 2);
u([
  l()
], s.prototype, "warmUpCount", 2);
s = u([
  T("godmode-utility-browser")
], s);
const L = s;
export {
  s as GodModeUtilityBrowserElement,
  L as default
};
//# sourceMappingURL=godmode-utility-browser.element-Ca7eA3pn.js.map
