import { html as n, customElement as c } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as u } from "@umbraco-cms/backoffice/lit-element";
var a = Object.defineProperty, v = Object.getOwnPropertyDescriptor, p = (l, r, s, o) => {
  for (var e = o > 1 ? void 0 : o ? v(r, s) : r, t = l.length - 1, m; t >= 0; t--)
    (m = l[t]) && (e = (o ? m(r, s, e) : m(e)) || e);
  return o && e && a(r, s, e), e;
};
let d = class extends u {
  constructor() {
    super();
  }
  render() {
    return n`
            <umb-body-layout>
                <godmode-header name="DI Services Browser" slot="header"></godmode-header>
            </umb-body-layout>
        `;
  }
};
d = p([
  c("godmode-services-browser")
], d);
const i = d;
export {
  d as GodModeServicesBrowserElement,
  i as default
};
//# sourceMappingURL=godmode-services-browser.element-O69yT87c.js.map
