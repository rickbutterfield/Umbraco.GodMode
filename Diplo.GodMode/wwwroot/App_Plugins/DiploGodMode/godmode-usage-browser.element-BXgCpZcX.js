import { html as l, customElement as n } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as u } from "@umbraco-cms/backoffice/lit-element";
var g = Object.getOwnPropertyDescriptor, b = (t, s, a, d) => {
  for (var e = d > 1 ? void 0 : d ? g(s, a) : s, r = t.length - 1, m; r >= 0; r--)
    (m = t[r]) && (e = m(e) || e);
  return e;
};
let o = class extends u {
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
o = b([
  n("godmode-usage-browser")
], o);
const w = o;
export {
  o as GodModeUsageBrowserElement,
  w as default
};
//# sourceMappingURL=godmode-usage-browser.element-BXgCpZcX.js.map
