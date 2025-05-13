import { html as l, customElement as n } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as p } from "@umbraco-cms/backoffice/lit-element";
var u = Object.getOwnPropertyDescriptor, y = (t, a, s, d) => {
  for (var e = d > 1 ? void 0 : d ? u(a, s) : a, r = t.length - 1, m; r >= 0; r--)
    (m = t[r]) && (e = m(e) || e);
  return e;
};
let o = class extends p {
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
o = y([
  n("godmode-datatype-browser")
], o);
const w = o;
export {
  o as GodModeDataTypeBrowserElement,
  w as default
};
//# sourceMappingURL=godmode-datatype-browser.element-C3cj5kZO.js.map
