import { html as a, customElement as p } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as n } from "@umbraco-cms/backoffice/lit-element";
var u = Object.defineProperty, b = Object.getOwnPropertyDescriptor, f = (d, r, t, o) => {
  for (var e = o > 1 ? void 0 : o ? b(r, t) : r, m = d.length - 1, l; m >= 0; m--)
    (l = d[m]) && (e = (o ? l(r, t, e) : l(e)) || e);
  return o && e && u(r, t, e), e;
};
let s = class extends n {
  constructor() {
    super();
  }
  render() {
    return a`
            <umb-body-layout>
                <godmode-header name="Template Browser" slot="header"></godmode-header>
            </umb-body-layout>
        `;
  }
};
s = f([
  p("godmode-template-browser")
], s);
const w = s;
export {
  s as GodModeTemplateBrowserElement,
  w as default
};
//# sourceMappingURL=godmode-template-browser.element-wSUng6iN.js.map
