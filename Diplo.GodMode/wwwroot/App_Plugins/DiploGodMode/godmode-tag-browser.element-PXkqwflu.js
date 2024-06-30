import { html as l, customElement as n } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as u } from "@umbraco-cms/backoffice/lit-element";
var p = Object.defineProperty, b = Object.getOwnPropertyDescriptor, f = (a, r, t, o) => {
  for (var e = o > 1 ? void 0 : o ? b(r, t) : r, m = a.length - 1, s; m >= 0; m--)
    (s = a[m]) && (e = (o ? s(r, t, e) : s(e)) || e);
  return o && e && p(r, t, e), e;
};
let d = class extends u {
  constructor() {
    super();
  }
  render() {
    return l`
            <umb-body-layout>
                <godmode-header name="Tag Browser" slot="header"></godmode-header>
            </umb-body-layout>
        `;
  }
};
d = f([
  n("godmode-tag-browser")
], d);
const v = d;
export {
  d as GodModeTagBrowserElement,
  v as default
};
//# sourceMappingURL=godmode-tag-browser.element-PXkqwflu.js.map
