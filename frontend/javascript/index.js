import 'bridgetown-quick-search';
import {Application} from 'stimulus';
import {definitionsFromContext} from 'stimulus/webpack-helpers';
import DarkModeToggle from './utils/dark-mode-toggle';
import Navigation from './utils/navigation';

import '../styles/index.scss';
import './utils/file-upload';
import './generators/node_modules/packagejson';

const application = Application.start();
const context = require.context('./controllers', true, /\.js$/);
application.load(definitionsFromContext(context));

new DarkModeToggle('toggle-dark-mode-btn');
new Navigation('[name="navigation"]');
