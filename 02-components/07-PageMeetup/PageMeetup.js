import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../06-MeetupView/MeetupView.js'
import { fetchMeetupById } from './meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView
  },

  props: { meetupId: Number },

  data() {
    return {
      meetup: {},
      status: '',
      error: '',
    }
  },

  watch: {
    meetupId: {
      immediate: true,
      deep: true,
      handler() {
        this.status = 'loading';
        const promise = fetchMeetupById(this.meetupId);
        promise.then(
          res => {
            this.status = 'ok';
            this.meetup = res;
          },
          err => {
            this.status = 'error';
            this.error = err
          }
        );
      }
    },

  },


  template: `
    <div class="page-meetup">
      <meetup-view v-if="status === 'ok'" :meetup="meetup"></meetup-view>

      <ui-container v-if="status === 'error'">
        <ui-alert>Test Error</ui-alert>
      </ui-container>

      <ui-container v-if="status === 'loading'">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>
    </div>`,
});
