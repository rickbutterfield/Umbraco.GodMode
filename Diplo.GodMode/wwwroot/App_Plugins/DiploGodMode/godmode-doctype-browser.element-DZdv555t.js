import { html as n, customElement as p } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as u } from "@umbraco-cms/backoffice/lit-element";
var c = Object.defineProperty, a = Object.getOwnPropertyDescriptor, b = (l, o, t, r) => {
  for (var e = r > 1 ? void 0 : r ? a(o, t) : o, m = l.length - 1, d; m >= 0; m--)
    (d = l[m]) && (e = (r ? d(o, t, e) : d(e)) || e);
  return r && e && c(o, t, e), e;
};
let s = class extends u {
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
s = b([
  p("godmode-doctype-browser")
], s);
const v = s;
export {
  s as GodModeDocTypeBrowserElement,
  v as default
};
//# sourceMappingURL=godmode-doctype-browser.element-DZdv555t.js.map
