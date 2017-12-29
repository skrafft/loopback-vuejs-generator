<template>
  <v-form @submit.prevent="handleSubmit(item)" ref="form" lazy-validation>
{{#each formFields}}
  {{#eq type "checkbox"}}
    <v-checkbox
      label="{{{ description }}}"
      v-model="item.{{{ name }}}"
      {{#if required}}required{{/if}}
    ></v-checkbox>
  {{/eq}}
  {{#eq type "text"}}
    <v-text-field
      label="{{{ description }}}"
      v-model="item.{{{ name }}}"
      {{#if required}}required{{/if}}
      type="{{{ type }}}"
    ></v-text-field>
  {{/eq}}
  {{#eq type "number"}}
    <v-text-field
      label="{{{ description }}}"
      v-model="item.{{{ name }}}"
      {{#if required}}required{{/if}}
      type="{{{ type }}}"
    ></v-text-field>
  {{/eq}}
  {{#eq type "dateTime"}}
    <v-dialog persistent v-model="modal" lazy full-width width="290px">
      <v-text-field slot="activator"
        label="{{{ description }}}"
        v-model="item.{{{ name }}}"
        prepend-icon="event"
        readonly
        ></v-text-field>
      <v-date-picker v-model="item.{{{ name }}}" scrollable actions>
        <template slot-scope="{ save, cancel }">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
            <v-btn flat color="primary" @click="save">OK</v-btn>
          </v-card-actions>
        </template>
      </v-date-picker>
    </v-dialog>
  {{/eq}}
{{/each}}
    <v-btn type="submit" color="primary">Submit</v-btn>
  </v-form>
</template>

<script>
  export default {
    props: {
      handleSubmit: {
        type: Function,
        required: true,
      },
      values: {
        type: Object,
        required: true
      },
      errors: {
        type: Object
      },
      initialValues: {
        type: Object
      }
    },
    computed: {
      item: function () {
        return this.initialValues ? this.initialValues : this.values;
      }
    }
  }
</script>
