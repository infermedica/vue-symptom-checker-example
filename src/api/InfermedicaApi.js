import axios from 'axios';
import VueCookies from 'vue-cookies';

export default {
  url: 'https://api.infermedica.com/v3',
  headers() {
    return {
      'content-type': 'application/json',
      'App-Id': VueCookies.get('appId'),
      'App-Key': VueCookies.get('appKey')
    };
  },
  parse(data) {
    return axios({
      method: 'post',
      url: `${this.url}/parse`,
      headers: this.headers(),
      data
    });
  },
  loadRiskFactors(age) {
    return axios({
      method: 'get',
      url: `${this.url}/risk_factors?age.value=${age.value}`,
      headers: this.headers()
    });
  },
  suggest(data) {
    return axios({
      method: 'post',
      url: `${this.url}/suggest`,
      headers: this.headers(),
      data
    });
  },
  diagnosis(data) {
    return axios({
      method: 'post',
      url: `${this.url}/diagnosis`,
      headers: this.headers(),
      data
    });
  },
  explain(data) {
    return axios({
      method: 'post',
      url: `${this.url}/explain`,
      headers: this.headers(),
      data
    });
  },
  triage(data) {
    return axios({
      method: 'post',
      url: `${this.url}/triage`,
      headers: this.headers(),
      data
    });
  }
};
