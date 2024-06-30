import { html as l, customElement as u } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as a } from "@umbraco-cms/backoffice/lit-element";
var p = Object.defineProperty, b = Object.getOwnPropertyDescriptor, c = (d, o, t, r) => {
  for (var e = r > 1 ? void 0 : r ? b(o, t) : o, n = d.length - 1, m; n >= 0; n--)
    (m = d[n]) && (e = (r ? m(o, t, e) : m(e)) || e);
  return r && e && p(o, t, e), e;
};
let s = class extends a {
  constructor() {
    super();
  }
  render() {
    return l`
            <umb-body-layout>
                <godmode-header name="Content Browser" slot="header"></godmode-header>
            </umb-body-layout>
        `;
  }
};
s = c([
  u("godmode-content-browser")
], s);
const w = s;
export {
  s as GodModeContentBrowserElement,
  w as default
};
//# sourceMappingURL=godmode-content-browser.element-GNGoRCYi.js.map
