import { html as b, customElement as n } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as u } from "@umbraco-cms/backoffice/lit-element";
var a = Object.defineProperty, p = Object.getOwnPropertyDescriptor, f = (l, r, m, o) => {
  for (var e = o > 1 ? void 0 : o ? p(r, m) : r, t = l.length - 1, s; t >= 0; t--)
    (s = l[t]) && (e = (o ? s(r, m, e) : s(e)) || e);
  return o && e && a(r, m, e), e;
};
let d = class extends u {
  constructor() {
    super();
  }
  render() {
    return b`
            <umb-body-layout>
                <godmode-header name="Member Browser" slot="header"></godmode-header>
            </umb-body-layout>
        `;
  }
};
d = f([
  n("godmode-member-browser")
], d);
const w = d;
export {
  d as GodModeMemberBrowserElement,
  w as default
};
//# sourceMappingURL=godmode-member-browser.element-CH-KR-ED.js.map
