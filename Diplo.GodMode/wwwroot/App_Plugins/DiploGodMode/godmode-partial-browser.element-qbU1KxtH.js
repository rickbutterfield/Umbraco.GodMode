import { html as d, customElement as n } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as u } from "@umbraco-cms/backoffice/lit-element";
var p = Object.defineProperty, b = Object.getOwnPropertyDescriptor, f = (s, r, t, o) => {
  for (var e = o > 1 ? void 0 : o ? b(r, t) : r, a = s.length - 1, l; a >= 0; a--)
    (l = s[a]) && (e = (o ? l(r, t, e) : l(e)) || e);
  return o && e && p(r, t, e), e;
};
let m = class extends u {
  constructor() {
    super();
  }
  render() {
    return d`
            <umb-body-layout>
                <godmode-header name="Partial Browser" slot="header"></godmode-header>
            </umb-body-layout>
        `;
  }
};
m = f([
  n("godmode-partial-browser")
], m);
const P = m;
export {
  m as GodModePartialBrowserElement,
  P as default
};
//# sourceMappingURL=godmode-partial-browser.element-qbU1KxtH.js.map
