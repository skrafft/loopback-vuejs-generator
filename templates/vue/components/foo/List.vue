<template>
  <v-container>
    <h1>{{{ title }}} List</h1>

    <v-alert v-if="loading" color="info" icon="info" value="true" role="status">Loading...</v-alert>
    <v-alert v-if="deletedItem" color="success" icon="check_circle" value="true" role="status">\{{ deletedItem['id'] }} deleted.</v-alert>
    <v-alert v-if="error" color="error" icon="warning" value="true" role="alert">\{{ error }}</v-alert>

    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="Search"
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
      </v-card-title>
      <v-btn :to="{ name: '{{{titleUcFirst}}}Create' }" color="pink"
            dark
            small
            absolute
            top
            right
            fab ><v-icon>add</v-icon></v-btn>
      <v-data-table
          :headers="headers"
          :items="items"
          :pagination.sync="pagination"
          :search="search"
          class="elevation-1"
        >
        <template slot="headers" slot-scope="props">
          <tr>
            <th v-for="header in props.headers" :key="header.text"
              :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
              @click="changeSort(header.value)"
            >
              <v-icon>arrow_upward</v-icon>
              \{{ header.text }}
            </th>
            <th colspan="2"></th>
          </tr>
        </template>
        <template slot="items" slot-scope="props">
          <td>\{{ props.item['id'] }}</td>
          {{#each fields}}
            <td class="text-xs-right">\{{ props.item['{{{ name }}}'] }}</td>
          {{/each}}
          <td>
            <v-btn flat icon :to="{name: '{{{titleUcFirst}}}Show', params: { id: props.item['id'] }}">
              <v-icon>list</v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn flat icon :to="{name: '{{{titleUcFirst}}}Update', params: { id: props.item['id'] }}">
              <v-icon>edit</v-icon>
            </v-btn>
          </td>
        </template>
        <template slot="no-data">
          <v-alert :value="true" color="error" icon="warning">
            Sorry, nothing to display here :(
          </v-alert>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    data() {
      return {
        headers: [
        { text: 'id', value: 'id'},
      {{#each fields}}
        { text: '{{{ description }}}', value: '{{{ name }}}'},
      {{/each }}
        ],
        search: '',
        pagination: {
          sortBy: 'id'
        }
      };
    },
    computed: mapGetters({
      deletedItem: '{{{lc}}}/del/deleted',
      error: '{{{lc}}}/list/error',
      items: '{{{lc}}}/list/items',
      loading: '{{{lc}}}/list/loading',
      view: '{{{lc}}}/list/view'
    }),
    methods: {
      ...mapActions({
        getPage: 'currency_rate/list/getItems',
      }),
      changeSort (column) {
              if (this.pagination.sortBy === column) {
                this.pagination.descending = !this.pagination.descending
              } else {
                this.pagination.sortBy = column
                this.pagination.descending = false
              }
            }
    },
    created () {
      this.$store.dispatch('{{{lc}}}/list/getItems')
    }
  }
</script>
