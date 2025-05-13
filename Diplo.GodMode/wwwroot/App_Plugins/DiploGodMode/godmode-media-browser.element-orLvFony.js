import { html as l, customElement as n } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as u } from "@umbraco-cms/backoffice/lit-element";
var b = Object.getOwnPropertyDescriptor, c = (t, d, a, m) => {
  for (var e = m > 1 ? void 0 : m ? b(d, a) : d, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (e = s(e) || e);
  return e;
};
let o = class extends u {
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
o = c([
  n("godmode-media-browser")
], o);
const w = o;
export {
  o as GodModeMediaBrowserElement,
  w as default
};
//# sourceMappingURL=godmode-media-browser.element-orLvFony.js.map
