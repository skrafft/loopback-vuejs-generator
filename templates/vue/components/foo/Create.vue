<template>
  <v-container>
    <h1>New {{{ title }}}</h1>

    <v-alert v-if="loading" color="info" icon="info" value="true" role="status">Loading...</v-alert>
    <v-alert v-if="error" color="error" icon="warning" value="true" role="alert">\{{ error }}</v-alert>

    <{{{titleUcFirst}}}Form :handle-submit="create" :values="item" :errors="violations"></{{{titleUcFirst}}}Form>
    <router-link :to="{ name: '{{{titleUcFirst}}}List' }" class="btn btn-default">Back to list</router-link>
  </v-container>
</template>

<script>
  import {{{titleUcFirst}}}Form from './Form.vue';
  import { createNamespacedHelpers } from 'vuex';

  const { mapActions, mapGetters } = createNamespacedHelpers('{{{lc}}}/create');

  export default {
    components: {
      {{{titleUcFirst}}}Form
    },
    data: function() {
      return {
        item: {}
      }
    },
    computed: mapGetters([
      'error',
      'loading',
      'created',
      'violations'
    ]),
    methods: {
      create: function(item) {
        this.$store.dispatch('{{{lc}}}/create/create', item);
      }
    },
    watch: {
      created: function (created) {
        if (created) {
          this.$router.push({ name: '{{{titleUcFirst}}}Update', params: { id: created['id']} });
        }
      }
    }
  }
</script>
