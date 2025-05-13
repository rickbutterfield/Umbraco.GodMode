import { html as n, customElement as a } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as u } from "@umbraco-cms/backoffice/lit-element";
var c = Object.getOwnPropertyDescriptor, p = (t, d, l, m) => {
  for (var e = m > 1 ? void 0 : m ? c(d, l) : d, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (e = s(e) || e);
  return e;
};
let r = class extends u {
  constructor() {
    super();
  }
  render() {
    return n`
            <umb-body-layout>
                <godmode-header name="Document Type Browser" slot="header"></godmode-header>
            </umb-body-layout>
        `;
  }
};
r = p([
  a("godmode-doctype-browser")
], r);
const w = r;
export {
  r as GodModeDocTypeBrowserElement,
  w as default
};
//# sourceMappingURL=godmode-doctype-browser.element-TLIYr32t.js.map
