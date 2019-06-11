<template>
  <div class="api__credentials">
    <BaseInput v-model="appId" :is-error="validations.appId.error" label="App Id"
               :disabled="!isCredentialEditable" :width="400" error="App Id is required to proceed"/>
    <BaseInput v-model="appKey" label="App Key" :is-error="validations.appKey.error"
               :disabled="!isCredentialEditable" :width="400" error="App Key is required to proceed"/>
    <button v-if="!isCredentialEditable" class="api__edit"
            @click="isCredentialEditable = !isCredentialEditable">
      Edit Credentials
    </button>
    <button v-else class="api__save" @click="saveCredentials()">Save Credentials</button>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import BaseInput from '../common/BaseInput';

  export default {
    name: 'ApiCredentials',
    data() {
      return {
        validations: {
          valid: true,
          appId: {
            error: false
          },
          appKey: {
            error: false
          }
        },
        appId: this.$cookies.get('appId'),
        appKey: this.$cookies.get('appKey'),
        isCredentialEditable: false
      };
    },
    computed: {
      ...mapState({
        riskFactors: (state) => state.api.riskFactors
      })
    },
    methods: {
      saveCredentials() {
        this.validateCredentials();
        if (this.validations.valid) {
          this.$cookies.set('appId', this.appId);
          this.$cookies.set('appKey', this.appKey);
          this.isCredentialEditable = false;
          this.$store.dispatch('loadRiskFactors');
        }
      },
      validateCredentials() {
        if (!this.appId || !this.appKey) {
          this.validations.valid = false;
          if (!this.appId) {
            this.validations.appId.error = true;
          } else {
            this.validations.appId.error = false;
          }
          if (!this.appKey) {
            this.validations.appKey.error = true;
          } else {
            this.validations.appKey.error = false;
          }
        } else {
          this.validations.valid = true;
          this.validations.appId.error = false;
          this.validations.appKey.error = false;
        }
      }
    },
    components: {
      BaseInput
    }
  };
</script>

<style lang="scss">
  .api {
    &__credentials {
      margin: 15px 0;
    }

    &__edit,
    &__save {
      display: flex;
      align-items: center;
      padding: 10px 15px;
      margin: 15px 2px;
      font-size: $font-regular;
      color: $main-blue;
      cursor: pointer;
      background: $blank;
      border: 1px solid $main-blue;
      border-radius: 4px;
      transition: color 0.2s, background-color 0.2s ease;

      &:hover {
        color: $blank;
        background: $main-blue;
      }
    }
  }
</style>
