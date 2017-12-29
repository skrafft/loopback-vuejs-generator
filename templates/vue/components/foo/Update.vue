<template>
  <v-container>
    <h1>Edit \{{ item && item['id'] }}</h1>

    <v-alert v-if="retrieveLoading || updateLoading || deleteLoading" color="info" icon="info" value="true" role="status">Loading...</v-alert>
    <v-alert v-if="created" color="success" icon="check_circle" value="true" role="status">\{{ created['id'] }} created.</v-alert>
    <v-alert v-if="updated" color="success" icon="check_circle" value="true" role="status">\{{ updated['id'] }} updated.</v-alert>
    <v-alert v-if="retrieveError" color="error" icon="warning" value="true" role="alert">\{{ retrieveError }}</v-alert>
    <v-alert v-if="updateError" color="error" icon="warning" value="true" role="alert">\{{ updateError }}</v-alert>
    <v-alert v-if="deleteError" color="error" icon="warning" value="true" role="alert">\{{ deleteError }}</v-alert>

    <{{{titleUcFirst}}}Form v-if="item" :handle-submit="update" :values="item" :errors="violations" :initialValues="retrieved"></{{{titleUcFirst}}}Form>
    <v-btn v-if="item" :to="{ name: '{{{titleUcFirst}}}List' }">Back to list</v-btn>
    <v-btn @click="del" color="error">Delete</v-btn>
  </v-container>
</template>

<script>
  import {{{titleUcFirst}}}Form from './Form.vue';
  import { mapGetters } from 'vuex';

  export default {
    created () {
      this.$store.dispatch('{{{lc}}}/update/retrieve', decodeURIComponent(this.$route.params.id));
    },
    components: {
      {{{titleUcFirst}}}Form
    },
    computed: {
      ...mapGetters({
        retrieveError: '{{{lc}}}/update/retrieveError',
        retrieveLoading: '{{{lc}}}/update/retrieveLoading',
        updateError: '{{{lc}}}/update/updateError',
        updateLoading: '{{{lc}}}/update/updateLoading',
        deleteError: '{{{lc}}}/del/error',
        deleteLoading: '{{{lc}}}/del/loading',
        created: '{{{lc}}}/create/created',
        deleted: '{{{lc}}}/del/deleted',
        retrieved: '{{{lc}}}/update/retrieved',
        updated: '{{{lc}}}/update/updated',
        violations: '{{{lc}}}/update/violations'
      })
    },
    data: function() {
      return {
        item: {}
      }
    },
    methods: {
      update (values) {
        this.$store.dispatch('{{{lc}}}/update/update', {item: this.retrieved, values: values });
      },
      del () {
        if (window.confirm('Are you sure you want to delete this item?'))
          this.$store.dispatch('{{{lc}}}/del/delete', this.retrieved);
      },
      reset () {
        this.$store.dispatch('{{{lc}}}/update/reset');
        this.$store.dispatch('{{{lc}}}/del/reset');
        this.$store.dispatch('{{{lc}}}/create/reset');

      }
    },
    watch: {
      deleted: function (deleted) {
        if (deleted) {
          this.$router.push({ name: '{{{titleUcFirst}}}List' });
        }
      }
    },
    beforeDestroy() {
      this.reset();
    }
  }
</script>
