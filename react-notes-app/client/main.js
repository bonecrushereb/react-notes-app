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

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);
  ReactDOM.render(routes, document.getElementById('app'));
});
