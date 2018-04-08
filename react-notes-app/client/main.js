import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { routes } from '../imports/routes/routes';
import { Session } from 'meteor/session';
import createBrowserHistory from 'history/createBrowserHistory';

import '../imports/api/users';
import '../imports/api/notes';
import '../imports/startup/simple-schema-config';

const history = createBrowserHistory();

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  if(selectedNoteId) {
    history.replace(`/Dashboard/${selectedNoteId}`);
  }
});

Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen');

  document.body.classList.toggle('is-nav-open', isNavOpen);
});

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);
  Session.set('isNavOpen', false);
  ReactDOM.render(routes, document.getElementById('app'));
});
