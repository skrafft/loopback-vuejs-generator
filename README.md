# loopback-vuejs-generator

[![Apache 2.0 Licence](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Loppback Vuejs Generator is a generator to scaffold app with Create-Retrieve-Update-Delete features for any loopback API (swagger/openAPI compatible) for Vue.js

## Installation

    yarn global add @api-platform/client-generator

## Usage

    generate-api-platform-client https://demo.api-platform.com/ output/ --resource Book

## Features

* Generate Vue.js components and files including:
  * A list view
  * A creation form
  * An edition form
  * A deletion button
* Use the Swagger API documentation to generate the code
* Generate the suitable HTML5 input type (`number`, `date`...) according to the type of the API property
* Client-side validation (`required` attributes)
* The generated HTML is compatible with [Bootstrap](https://getbootstrap.com/) and include mandatory classes
* The generated HTML code is accessible to people with disabilities ([ARIA](https://www.w3.org/WAI/intro/aria) support)

## Credits

Adapted from an idea of [Kévin Dunglas](https://dunglas.fr) and [Les-Tilleuls.coop](https://les-tilleuls.coop).

