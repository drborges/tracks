# Tracks

# Goal

Provide a simpler and more intuitive UI to represent Power development workflow,
seamlessly integrating PivotalTracker, Jenkins and Github in order to automate
many of the current manual steps in the process.

The proposed UI is similar to a [Kanban board](http://www.swiftkanban.com/wp-content/uploads/2015/05/kanban-board.png) with columns mirroring the steps
in our development process.

# The workflow in tracks

Tracks provides a Kanban Board UI using pivotal tracker as the backend. The following columns are initially present in tracks:

Manual transitions:
1. backlog
2. Todo
3. Developing
4. Testing
5. Done (labels for 'building', 'deploying')

Automated transitions:
6. Live (triggered by Jenkins upon a successful deploy)

Actions in Tracks are essentially drag and drop of cards across columns. Some moves are not allowed to be performed manually:

Ready for Prod -> Building: is triggered upon a PR merge in github, causing the card to be automatically moved.
Building -> Live: Triggered by Jenkins upon a successful deployment to production.


# The Pivotal backend

1. Story is created in the backlog (state=`unstarted`, labels=[])
2. Story is selected to the current sprint (state=`planned`, labels=[])
3. Developer start the work on a story hitting start button (state=`started`, labels=[])
4. Developer communicates to the Ninjas they can test a particular story (state=`started`, labels=['testing'])
5. Ninjas communicate back to the developer their done testing:
  - Successful test? (state=`started`, labels=['tested'])
  - Rejected test? (state=`started`, labels=[])
6. Developer then hits the finish button signaling there is no more work to be done and story can be sent to production. (state=`finished`, labels=['tested'])
7. PR merged (state=`delivered`, labels=['tested'])
8. Jenkins Master Build is triggered:
  - Green Build: Jenkins signals by adding label to the story (state=`delivered`, labels=['tested', 'build_successful'])
  - Red Build: Jenkins signals by adding label to the story (state=`delivered`, labels=['tested', 'build_failure'])
9. Jenkins Deploy Build is triggerd:
  - Successful Deploy: Jenkins signals by accepting the story (state=`accepted`, labels=['tested', 'build_successful'])
  - Failed Deploy: Jenkins signals by adding label to the story (state=`delivered`, labels=['tested', 'build_successful', 'deploy_failure'])

# Jenkins + Tracker Integration

### Tracker Activities Webhook API

Tracks will leverage [this API](http://www.pivotaltracker.com/help/articles/activity_webhook) to implement real time updates.

When the master build turns green:

```
curl -XPUT -H "X-TrackerToken: $TOKEN" "https://www.pivotaltracker.com/services/v5/stories/127433133" -H "Content-type: application/json" -d '{ "current_state": "delivered" }'
```

When the production deployment succeeds:

```
curl -XPUT -H "X-TrackerToken: $TOKEN" "https://www.pivotaltracker.com/services/v5/stories/127433133" -H "Content-type: application/json" -d '{ "current_state": "accepted" }'
```
