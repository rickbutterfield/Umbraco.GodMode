import { html as l, customElement as n } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as u } from "@umbraco-cms/backoffice/lit-element";
var p = Object.defineProperty, b = Object.getOwnPropertyDescriptor, f = (a, r, t, o) => {
  for (var e = o > 1 ? void 0 : o ? b(r, t) : r, d = a.length - 1, m; d >= 0; d--)
    (m = a[d]) && (e = (o ? m(r, t, e) : m(e)) || e);
  return o && e && p(r, t, e), e;
};
let s = class extends u {
  constructor() {
    super();
  }
  render() {
    return l`
            <umb-body-layout>
                <godmode-header name="Media Browser" slot="header"></godmode-header>
            </umb-body-layout>
        `;
  }
};
s = f([
  n("godmode-media-browser")
], s);
const v = s;
export {
  s as GodModeMediaBrowserElement,
  v as default
};
//# sourceMappingURL=godmode-media-browser.element-WimDFli0.js.map
