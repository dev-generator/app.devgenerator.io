import 'bridgetown-quick-search';
import {Application} from 'stimulus';
import {definitionsFromContext} from 'stimulus/webpack-helpers';
import Navigation from './utils/navigation';
import Copy from './utils/copy';
import {CONSTANTS} from './constants';

import '../styles/index.scss';
import './utils/file-upload';
import './generators/node_modules/packagejson';

const application = Application.start();
const context = require.context('./controllers', true, /\.js$/);
application.load(definitionsFromContext(context));

new Navigation('[name="navigation"]');

if (window.location.pathname.includes(CONSTANTS.GENERATORS)) {
  new Copy();
}
