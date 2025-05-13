import { UmbElementMixin as l } from "@umbraco-cms/backoffice/element-api";
import { LitElement as n, html as g, css as u, customElement as b } from "@umbraco-cms/backoffice/external/lit";
var c = Object.getOwnPropertyDescriptor, p = (t, s, a, m) => {
  for (var e = m > 1 ? void 0 : m ? c(s, a) : s, o = t.length - 1, d; o >= 0; o--)
    (d = t[o]) && (e = d(e) || e);
  return e;
};
let r = class extends l(n) {
  render() {
    return g`
            <umb-body-layout>
                <godmode-header name="Tag Browser" slot="header"></godmode-header>
            </umb-body-layout>
        `;
  }
};
r.styles = [
  u`
        `
];
r = p([
  b("godmode-tag-browser")
], r);
const f = r;
export {
  r as GodModeTagBrowserElement,
  f as default
};
//# sourceMappingURL=godmode-tag-browser.element-BpYKYpDG.js.map
