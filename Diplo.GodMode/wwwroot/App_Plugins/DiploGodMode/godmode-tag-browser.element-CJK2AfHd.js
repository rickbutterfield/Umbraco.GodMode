import { UmbElementMixin as a } from "@umbraco-cms/backoffice/element-api";
import { LitElement as n, html as u, css as b, customElement as f } from "@umbraco-cms/backoffice/external/lit";
var p = Object.defineProperty, g = Object.getOwnPropertyDescriptor, c = (l, r, s, o) => {
  for (var e = o > 1 ? void 0 : o ? g(r, s) : r, m = l.length - 1, d; m >= 0; m--)
    (d = l[m]) && (e = (o ? d(r, s, e) : d(e)) || e);
  return o && e && p(r, s, e), e;
};
let t = class extends a(n) {
  render() {
    return u`
            <umb-body-layout>
                <godmode-header name="Tag Browser" slot="header"></godmode-header>
            </umb-body-layout>
        `;
  }
};
t.styles = [
  b`
        `
];
t = c([
  f("godmode-tag-browser")
], t);
const _ = t;
export {
  t as GodModeTagBrowserElement,
  _ as default
};
//# sourceMappingURL=godmode-tag-browser.element-CJK2AfHd.js.map
