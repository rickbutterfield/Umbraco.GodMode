import { html as n, customElement as a } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as b } from "@umbraco-cms/backoffice/lit-element";
var u = Object.getOwnPropertyDescriptor, c = (t, m, l, d) => {
  for (var e = d > 1 ? void 0 : d ? u(m, l) : m, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (e = s(e) || e);
  return e;
};
let o = class extends b {
  constructor() {
    super();
  }
  render() {
    return n`
            <umb-body-layout>
                <godmode-header name="Member Browser" slot="header"></godmode-header>
            </umb-body-layout>
        `;
  }
};
o = c([
  a("godmode-member-browser")
], o);
const f = o;
export {
  o as GodModeMemberBrowserElement,
  f as default
};
//# sourceMappingURL=godmode-member-browser.element-VXR_kF4e.js.map
