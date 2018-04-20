<template>
  <v-container>
    <h1>Show \{{ item && item['id'] }}</h1>

    <v-alert v-if="loading" color="info" icon="info" value="true" role="status">Loading...</v-alert>
    <v-alert v-if="deletedItem" color="success" icon="check_circle" value="true" role="status">\{{ deletedItem['id'] }} deleted.</v-alert>
    <v-alert v-if="error" color="error" icon="warning" value="true" role="alert">\{{ error }}</v-alert>

    <v-data-table
        v-if="item"
        v-bind:items="[item]"
        hide-actions
        class="elevation-1"
      >
      <template slot="headers" slot-scope="props">
        <tr>
          <th>Field</th>
          <th>Value</th>
        </tr>
      </template>
      <template slot="items" slot-scope="props">
        {{#each fields}}
          <tr>
            <td>{{name}}</td>
            <td>\{{ props.item['{{{ name }}}'] }}</td>
          </tr>
        {{/each }}
      </template>
    </v-data-table>

    <v-btn v-if="item" :to="{ name: '{{{titleUcFirst}}}List' }">Back to list</v-btn>
    <v-btn @click="deleteItem(item)" color="error">Delete</v-btn>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: mapGetters({
      deletedItem: '{{{lc}}}/del/deleted',
      deleteError: '{{{lc}}}/del/error',
      error: '{{{lc}}}/show/error',
      loading: '{{{lc}}}/show/loading',
      item: '{{{lc}}}/show/item',
    }),
    methods: {
      deleteItem (item) {
        if (window.confirm('Are you sure you want to delete this item?'))
          this.$store.dispatch('{{{lc}}}/del/delete', item).then(response => this.$router.push({ name: '{{{titleUcFirst}}}List' }));
      }
    },
    created () {
      this.$store.dispatch('{{{lc}}}/show/retrieve', decodeURIComponent(this.$route.params.id));
    },
    beforeDestroy() {
      this.$store.dispatch('{{{lc}}}/show/reset');
    }
  }
</script>
