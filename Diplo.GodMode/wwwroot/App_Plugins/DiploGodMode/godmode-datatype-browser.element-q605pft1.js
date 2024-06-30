import { html as l, customElement as p } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as n } from "@umbraco-cms/backoffice/lit-element";
var u = Object.defineProperty, b = Object.getOwnPropertyDescriptor, f = (s, r, t, o) => {
  for (var e = o > 1 ? void 0 : o ? b(r, t) : r, a = s.length - 1, d; a >= 0; a--)
    (d = s[a]) && (e = (o ? d(r, t, e) : d(e)) || e);
  return o && e && u(r, t, e), e;
};
let m = class extends n {
  constructor() {
    super();
  }
  render() {
    return l`
            <umb-body-layout>
                <godmode-header name="DataType Browser" slot="header"></godmode-header>
            </umb-body-layout>
        `;
  }
};
m = f([
  p("godmode-datatype-browser")
], m);
const v = m;
export {
  m as GodModeDataTypeBrowserElement,
  v as default
};
//# sourceMappingURL=godmode-datatype-browser.element-q605pft1.js.map
