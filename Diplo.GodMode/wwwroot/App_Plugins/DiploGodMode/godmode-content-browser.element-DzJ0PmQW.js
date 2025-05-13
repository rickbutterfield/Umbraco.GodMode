import { html as l, customElement as a } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as u } from "@umbraco-cms/backoffice/lit-element";
var c = Object.getOwnPropertyDescriptor, b = (r, n, s, d) => {
  for (var e = d > 1 ? void 0 : d ? c(n, s) : n, o = r.length - 1, m; o >= 0; o--)
    (m = r[o]) && (e = m(e) || e);
  return e;
};
let t = class extends u {
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
t = b([
  a("godmode-content-browser")
], t);
const f = t;
export {
  t as GodModeContentBrowserElement,
  f as default
};
//# sourceMappingURL=godmode-content-browser.element-DzJ0PmQW.js.map
