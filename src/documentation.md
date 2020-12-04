---
layout: page
page_class: documentation
title: Documentation
subtitle: How to Contribute to the Site
details: Don't see a generator for something you use? Think it will be a good fit for this site? Then follow the steps and guide below on contributing to this generator tool!
permalink: /documentation/
---

## Introduction

Hi, and welcome to the documentation. Here you will find how you can contribute to the Dev Generator via a feature Request or contributing a generator built by your hands!

## Table of Contents

- [Getting Started](#getting-started)
    - [Frameworks Used](#frameworks-used)
    - [Submitting a Feature Request](#submmiting-a-feature-request)
    - [Contribute a Generator](#contribute-a-generator)
    - [Contribute Other Items](#contribute-other-items)
- [Creating a Generator](#creating-a-generator)
    - [Starting](#starting)
    - [Process](#process)
    - [Conclusion](#conclusion)
- [Building a YAML Data Source File](#building-a-yaml-data-source-file)
    - [Text](#text)
    - [Textarea](#textarea)
    - [Checkbox](#checkbox)
    - [Multiple Column](#multiple-column)
    - [Complex Table](#complex-table)
    - [Complex Array](#complex-array)
- [Building a new Field Type](#building-a-new-field-type)
- [Working a Ticket](#working-a-ticket)
- [Creating a Pull Request](#creating-a-pull-request)
    - [New Generator Template](#new-generator-template)
    - [Other Merges Template](#other-merges-template)
- [Conclusion](#conclusion)

## Getting Started

### Frameworks Used

This tool leverages the following frameworks to bring everything together, be sure to have access or be familiar with most of them if looking to contribute.

1. [Tailwindcss](https://tailwindcss.com/) - The CSS Framework used, v2.0+.
2. [Heroicons](https://heroicons.com) - Icons used throughout the site. These are the only icons usable today so far.
3. [Bridgetown](https://www.bridgetownrb.com/) - This is how the site is generated and it uses the Liquid language for rendering components and details like Front Matter and other data elements.
4. [Webpack](https://webpack.js.org/) - Asset compilation.

Apart of the JS, I have used a file to house constants or string variables that are leveraged in many files, this is to be leveraged and added to for values that cross or could cross multiple files.

### Submitting a Feature Request

Not seeing a generator for something you wish to use, but not able to contribute it to the project [submit a feature request](https://github.com/dev-generator/app.devgenerator.io/issues/new?assignees=chiefpansancolt&labels=enhancement%2C+new&template=feature-request.md&title=Feature+Request:) and someone else can pick it up and build it out for others to leverage!

### Contribute a Generator

Looking to contribute? Either create a ticket above or pick up a ticket for one to be created.

When picking up here are the steps to follow to get started.

1. Find ticket and update assigned to field to your name.
2. Fork the repo and create a new branch for your work.
3. `git clone` your fork locally.
4. Once cloned, run `bundle install` and `yarn install` to ensure all dependencies are installed on the machine.
5. After installation, to start the server simply run `yarn start` this will start the server and the webpack listener to compile on changes.
6. Follow [Create a Generator](#create-a-generator) for how to implement a new generator to the current framework.

### Contribute Other Items

Looking to contribute in another way? Look to pick up any Issues open asking for help or simply tag the Lead developer on the ticket and see how you can help! Once a Ticket is assigned following the below steps to get started.

1. Find ticket and update assigned to field to your name.
2. Fork the repo and create a new branch for your work.
3. `git clone` your fork locally.
4. Once cloned, run `bundle install` and `yarn install` to ensure all dependencies are installed on the machine.
5. After installation, to start the server simply run `yarn start` this will start the server and the webpack listener to compile on changes.
6. Follow [Working a Ticket](#working-a-ticket) for how to implement and process to follow.

## Creating a Generator

### Starting

Adding a new generator can be time-consuming especially when the config file is large, be prepared to commit the time needed to build it out. Below will walk you through creating all files needed for the successful implementation of a new generator.

### Process

To begin we need to create some new files to hold our code.

**Step 1:**
: First, we will need to determine our namespace to use this will be leveraged as the name used everywhere. For example, rubocop and packagejson are used already.

**Step 2:**
: Second, create a file to hold all the field information that will be used in the JS like the YAML file is used for the user interface. Check out `frontend/javascipt/generators/data/packagejson.js` for an example of a setup. A file should be created in the `frontend/javascript/generators/data` with the namespace chosen. Below is the starting code snippet to get started.

```javascript
import {CONSTANTS} from '../../constants';

const FIELDS = [
  {
    name: 'example',
    type: CONSTANTS.DATATYPES.TEXT,
    optional: false,
    fields: [],
  },
];

export {FIELDS};
```

**Step 3:**
: Third, create a file to hold the js code used. The file will need to be created in the following folder path, `frontend/javascript/generators/` a group + namespace, it should look like this `node_modules/pacakgejson.js`. Once, created, the base setup of the file should contain the following code found below, and replace all references to NAMESPACEREPLACE with the namespace determined in step one.

```javascript
import {CONSTANTS} from '../../constants';
import {FIELDS} from '../data/NAMESPACEREPLACE';
import File from '../../utils/file';
import FieldCheck from '../../utils/field-check';
import Toggle from '../../utils/toggle';
import FieldOutput from '../../utils/field-output';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import Download from '../../utils/download';

let CODE = '';

const NAMESPACEREPLACE = {
  getUploadDetails: function() {
    var results = JSON.parse(new File().read());
    for (let i = 0; i < FIELDS.length; i++) {
      const field = FIELDS[i];
      new FieldCheck(field.name, results, field.type, field.fields, field.optional);
    }
  },
  
  generateOutput: function() {
    const outputForm = document.getElementById(CONSTANTS.OUTPUTFORM);
    var text = CONSTANTS.CURLYBRAKETSTART;
    for (let i = 0; i < FIELDS.length; i++) {
      const field = FIELDS[i];
      if (new Toggle(field.name + CONSTANTS.TOGGLE).isActive() == CONSTANTS.TRUE) {
        text += new FieldOutput(field.name, field.type, field.fields).build();
      }
    }

    if (text.slice(-2) == CONSTANTS.COMMASPACE) text = text.slice(0, -2);
    text += CONSTANTS.CURLYBRAKETEND;
    CODE = JSON.stringify(JSON.parse(text), null, 2);
    outputForm.innerHTML = CONSTANTS.NEWLINE + CODE;
    Prism.highlightAll();
    new Download(FILENAME, FILEMETA);
  }
};

const FILENAME = /*Replace with output file name and ext*/;
const FILEMETA = /*Replace with the file meta type for how to save*/;

window.NAMESPACEREPLACE = NAMESPACEREPLACE;
```

**Step 4:**
: Fourth, create the view of the form to the users. This file will be created in `src/_generators/"folder of bucket"/`. Note the folder of the bucket currently fits two, either Node Modules (node_modules) or Ruby Gems (ruby_gems), choose one or create a new bucket if applicable. Then create a file name with the namespace + extension, it should look like this `pacakgejson.html`. Once created, the base setup of the file should contain the bellow code, and replace all references to NAMESPACEREPLACE with the namespace determined in step one.

```html
---
layout: generator
title: Package.json Generator
ref_link: https://docs.npmjs.com/files/package.json
button_label: Reference Link
group_icon: nodejs
group_name: Node Module
icon: npm
namespace: packagejson
permalink: /generators/node_modules/packagejson/
---

<!-- Replace &#123; with { since this needs to be escaped for this page to not cause render issues -->
&#123;% render "cards/generator", items: site.data.packagejson.details, labels: site.metadata.generator.packagejson.input %}

```

**Step 5:**
: Fith, get an SVG-based icon of the tool we are generating for, if one does not exist please reach out to the lead developer for a path forward on this step. The icon should be placed in the `assets/images/icons/` folder with the name of your icon.

**Step 6:**
: To add a new Generator bucket you will need to update the `src/data/site_metadata.yml` file. The labels will need to be added under the "generators:" section in `src/data/site_metadata.yml` and replace the information detailed in the example below. Most labels below are typically unchanged but can be if needed. The "doc_upload_button_details" should be updated to the applicable ext used and "accept_docs" should be set if a specific ext meta-type is only allowed.

```yaml
NAMESPACEREPLACE:
  upload:
    title: Upload Existing File
    namespace: NAMESPACEREPLACE
    details: Upload an existing version by copy/paste to the textarea or upload via dropzone.
    code_snippet_label: Document
    code_snippet_placeholder: Code Snippet
    code_snippet_helptext: Paste your code in the text box above.
    doc_upload_label: Upload Document
    doc_upload_button: Upload a file
    doc_upload_button_subtitle: or drag and drop
    doc_upload_accepted_details: .JSON up to 2MB
    accept_docs: application/json
    no_files_selected: No Files Selected
    link_button_label: Link
  input:
    back_btn_label: Back
    next_btn_label: Next
  output:
    language: json
    namespace: NAMESPACEREPLACE
    title: Generated Output
    details: Copy or download outputed generation of your config data entry.
    copy_button_label: Copy
    download_button_label: Download
```

**Step 7:**
: Now the fun part, we need to create the data file that holds all the fields that data will be entered into from a user or populated via a pre-built file. When building this keep a few things in mind like how a field is identified in the file and how the user should or could interact with it. If you need help determining how to handle interactions feel free to reach out on the ticket to the Lead Developer for guidance. When creating a file checkout the `src/data/packagejson.yml` for an example setup. See [Building a YAML Data Souce File](#building-a-yaml-data-source-file) for what the different data capture possibilities are and how to identify them in the generator data file. Create your new file to house the fields used for this generator in this folder `src/data/` with the namespace determined in step one to look like this `packagejson.yml`.

```yaml
details:
  # All Groups will go below and are entered following the next section.
```

**Step 8:**
: Start updating the JS file created with how to read and generate the output based on the new fields used. I recommend doing step 7 in small chunks and moving to this step and repeating till all are created to make it easier to debug.

**Step 9:**
: Once these pages are created and files updated, you should be able to load and navigate to this page on the local site to test out its functionality.

### Conclusion

Once all steps have been followed and the generator implemented you should end up with a few new files. If you feel all these items are completed check out [Creating a Pull Request](#creating-a-pull-request) to see how to merge your items into the main site.

New Files Added:

- `src/_generators/*Bucket*/NAMESPACE.html`
- `src/data/NAMESPACE.yml`
- `frontend/javascript/generators/NAMESPACE.js`
- `frontend/javascript/data/NAMESPACE.js`
- `src/assets/images/icons/NAMESPACE.svg`

Files Updated:

- `src/data/site_metadata.yml`
- `src/data/generators.yml`

## Building a YAML Data Source File

When building a Data Source file in `src/data` to represent the fields the user will be entering in the data to generate the output here is how to build it.

**First - The Grouping**
: The grouping will show as a card to the user with a set of fields inside. To indicate a group, use the snippet below to define a group under the "details:" section in the file. Icons link can be found in the [Getting Started](#getting-started) section

```yaml
- title: Core Details # The title on the section user see.
  icon: # name of the icon.
  uniqueName: core-details # Used for navigation in id so make sure it is unique.
  details: # additional details about a section to display to users.
  fields:
    # Fields details will go here see the future section for more details.
```

**Second - The Fields**
: Currently, this tool supports 6 field types out of the box, but more can be added as the use cases arise. Check out the [Building a new Field Type](#building-a-new-field-type) section on how to add a new field type to the architecture. Each field type has its specific use cases and fields available, more fields can be added but must be added in a way to not interfere with other built pages.
: Each field has 4 common attributes in the source file detailed below and what they mean.

1. **name**: This is the label seen by the user.
2. **uniqueName**: This typically should be how it is identified in the existing file to know what to grab. Does not have to be 100% the same we have flexibility with JS to determine how you get and build the data.
3. **required**: Indicates if the toggle switch is on at the start.
4. **fieldType**: Indicates which field type to use see below for example definition to identify each usage.

### Text

A text field is used for simple text entry and shows as a one-line input section. Below is an example of creating a field for text in the Data Source Field file.

```yaml
- name: Name
  uniqueName: name
  required: true
  defaultValue: "" # Allows you to have set text generated when starting blank. If data found in the uploaded file that will override this.
  fieldType: text
```

### Textarea

Textarea is a field used to either show text entry on multiple lines or the more common usage simple arrays of information when having a new item on each line. Below is an example of creating a field for textarea in the Data Source Field file.

```yaml
- name: Description
  uniqueName: description
  required: true
  defaultValue: "" # Allows you to have set textarea generated when starting blank. If data found in the uploaded file that will override this.
  fieldType: textarea
```

### Checkbox

A checkbox is a field used to indicate a true or false value. Below is an example of creating a field for the checkbox in the Data Source Field file.

```yaml
- name: Private
  extraDetails: Check if Private repo/package # Extra text that shows to the right of the checkbox.
  uniqueName: private
  required: true
  defaultValue: "false" # Allows you to have set the checkbox to true. If data found in the uploaded file that will override this.
  fieldType: checkbox
```

### Multiple Column

Multiple Column is used to show multiple fields in one line represented as a key-value pair but with specific keys and user-entered values. This can have as many columns as necessary but can cause a bad user experience if more than 3 are defined and a review will be needed if that use case is needed. Below is an example of creating a field for multiple columns in the Data Source Field file.

```yaml
- name: Repository
  uniqueName: repository
  required: false
  fieldType: multipleColumn
  fieldSize: "2" # how big is the colspan, take grid size and divide the number of fields to get fieldsize.
  gridSize: "4" # determines the grid size can go from 1-12
  fields:
    - name: Type
      uniqueName: repository-type
      fieldType: text # Only supported as text presently
    - name: URL
      uniqueName: repository-url
      fieldType: text # Only supported as text presently
```

### Complex Table

A complex table is a representation of a key-value pair shown in an object. This will just have two fields under the fields attribute. The below code will be added to the Data Souce Field file.

```yaml
- name: Scripts
  uniqueName: scripts
  required: false
  fieldType: complexTable
  fields:
    - name: Name
      uniqueName: name
      placeholder: Name of Command # allow text to show as a placeholder in the input field
    - name: Script
      uniqueName: script
      placeholder: Command to Run # allow text to show as a placeholder in the input field
```

### Complex Array

Complex Array is a mix between Multiple Columns and Complex Table to build an array of key-value pairs. The Complex array is a key-value pair where keys are pre-defined and values are user entered. The below code will be added to the Data Souce Field file.

```yaml
- name: Contributors
  uniqueName: contributors
  required: false
  fieldType: complexArray
  fields:
    - name: Name
      uniqueName: name
      placeholder: Name of individual # allow text to show as a placeholder in the input field
    - name: Email
      uniqueName: email
      placeholder: Email to individual # allow text to show as a placeholder in the input field
    - name: URL
      uniqueName: url
      placeholder: Link to individual # allow text to show as a placeholder in the input field
```

## Building a new Field Type

If you are in a situation where one of the existing field types does not statisfy your current use case, here is how to add a new field type to meet those needs. First, you will need to add a new field type file in `src/_components/forms/fields/` with the name of the field type and the liquid extension, like `input_text.liquid`. Once created copy and paste the code below. Once pasted add any additional Front Matter items to pass in and reference them where applicable. Then add in the section that has a comment tag on how the render of the new form type will work. Once created you will need to open `src/_components/forms/core.liquid` and add to the if statement your new field type. Follow the others as examples, then add to this documentation how that new Field Type works.

```
---
name: Name of Field Type
description: Name of Field Type Field
variables:
    uniqueName:
        - string
    defaultValue:
        - string
    extraDetails:
        - string
---

```

## Working a Ticket

Looking to pick up a ticket to create a generator or fix a bug? Check out the [Issues](https://github.com/dev-generator/app.devgenerator.io/issues) on GitHub. Any issues with the tag of *help wanted* is open season for anyone. If you see one without but that is not assigned to anyone please tag the Lead Developer to ask to help out.

## Creating a Pull Request

Ready to merge to the main repository? Perfect! If you are merging a new generator please use the New Generator Template and if you are merging anything else please use the Other Merges Template. Once the details have been filled out please mark the pull request with the label `ready to review` so that the Lead Developer knows it is completed and ready for review. Pull Request will be merged to the **staging** branch and all merges to main will be done by the lead developer to ensure releases are planned.

### New Generator Template

```markdown
## Description

<!-- Please include a summary of the change and which issue is fixed. Please also include relevant motivation and context. List any dependencies that are required for this change. -->

### Fixes # (issue):

<!-- List out the Issue numbers include in this Pull Request -->

## How Has This Been Tested?

<!-- Please describe the tests that you ran to verify your changes. Provide instructions so we can reproduce. Please also list any relevant details for your test configuration -->

## Checklist:

- [] HTML Linter ran `yarn html` and zero errors returned
- [] JS Linter ran `yarn javascript` and zero errors returned
- [] CSS Linter ran `yarn css` and zero errors returned
- [] File Created - `src/_generators/*Bucket*/NAMESPACE.html`
- [] File Created - `src/data/NAMESPACE.yml`
- [] File Created - `frontend/javascript/generators/NAMESPACE.js`
- [] File Created - `src/assets/images/icons/NAMESPACE.svg`
- [] File Updated - `src/data/site_metadata.yml`
- [] File Updated - `src/data/generators.yml`

<!-- If new File Types added please use the below if not delete from here down -->
- [] File Created for new File Types in `src/_components/base/forms/form_types/`
- [] File Updated - `src/_components/base/forms/core.liquid`
```

### Other Merges Template

```markdown
## Description

<!-- Please include a summary of the change and which issue is fixed. Please also include relevant motivation and context. List any dependencies that are required for this change. -->

### Fixes # (issue):

<!-- List out the Issue numbers include in this Pull Request -->

## How Has This Been Tested?

<!-- Please describe the tests that you ran to verify your changes. Provide instructions so we can reproduce. Please also list any relevant details for your test configuration -->

## Checklist:

- [] HTML Linter ran `yarn html` and zero errors returned
- [] JS Linter ran `yarn javascript` and zero errors returned
- [] CSS Linter ran `yarn css` and zero errors returned
```

## Conclusion

Thank you for taking the time to read through this and show interest in contributing to this tool. If you feel that details are missing or need better a explanation of this documentation please create a [Documentation Issue](https://github.com/dev-generator/app.devgenerator.io/issues/new?assignees=&labels=new%2C+documentation&template=documentation.md&title=Question) asking your question or if you have any recommendations to make this even better. Again thank you!
