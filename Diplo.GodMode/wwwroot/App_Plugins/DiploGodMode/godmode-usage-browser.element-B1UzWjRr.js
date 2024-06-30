import { html as l, customElement as n } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as u } from "@umbraco-cms/backoffice/lit-element";
var p = Object.defineProperty, b = Object.getOwnPropertyDescriptor, f = (a, r, t, o) => {
  for (var e = o > 1 ? void 0 : o ? b(r, t) : r, s = a.length - 1, m; s >= 0; s--)
    (m = a[s]) && (e = (o ? m(r, t, e) : m(e)) || e);
  return o && e && p(r, t, e), e;
};
let d = class extends u {
  constructor() {
    super();
  }
  render() {
    return l`
            <umb-body-layout>
                <godmode-header name="Usage Browser" slot="header"></godmode-header>
            </umb-body-layout>
        `;
  }
};
d = f([
  n("godmode-usage-browser")
], d);
const v = d;
export {
  d as GodModeUsageBrowserElement,
  v as default
};
//# sourceMappingURL=godmode-usage-browser.element-B1UzWjRr.js.map
