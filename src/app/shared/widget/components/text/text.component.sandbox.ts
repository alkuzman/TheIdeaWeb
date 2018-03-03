/**
 * Created by AKuzmanoski on 23/02/2018.
 */
import {sandboxOf} from 'angular-playground';
import {TextComponent} from "./text.component";

export default sandboxOf(TextComponent)
  .add('with simple text', {
    template: `<ideal-text>Hey playground!</ideal-text>`
  });
