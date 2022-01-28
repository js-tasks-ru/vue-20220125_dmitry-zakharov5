import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

const MeetupTitle = {
  data() {
    return {
      meetupID: '',
      meetupTitle: '',
    }
  },

  watch: {
    async meetupID() {
      let response = await fetchMeetupById(this.meetupID);
      this.meetupTitle = response.title;
    }
  }
}

createApp(MeetupTitle).mount('#app');