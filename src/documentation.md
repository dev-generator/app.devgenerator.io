---
layout: page
page_class: documentation
title: Documentation
subtitle: How to Contribute to the Site
details: Don't see a generator for something you use? Think it will be a good fit for this site? Then follow the steps and guide below on contributing to this generator tool!
permalink: /documentation/
---

## Introduction

Hi, and welcome to the documentation. Here you will find how you can contribute to the Dev Generator via a feature Request or contubuting a generator built by your hands!

## Table of Contents

- [Getting Started](#getting-started)
    - [Frameworks Used](#frameworks-used)
    - [Submitting a Feature Request](#submmiting-a-feature-request)
    - [Contribute a Generator](#contribute-a-generator)
    - [Contribute Other Items](#contribute-other-items)
- [Create a Generator](#create-a-generator)
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

1. [Tailwindcss](https://tailwindcss.com/) - The CSS Framework used.
2. [Tailwindcss UI](https://tailwindui.com/) - If you do not have this purchased and need to add components reach out to lead developer for snippets.
3. [Bridgetown](https://www.bridgetownrb.com/) - This is how the site is generated and it uses the Liquid langage for rendering components and details like Front Matter and other data elements.
4. [Webpack](https://webpack.js.org/) - Asset compilation.

Apart of the JS I have used a file to house constants or string variables that are leveraged in many files, this is to be leveraged and added to for values that cross or could cross multiple files.

### Submitting a Feature Request

Not seeing a generator for something you wish to use, but not able to contribute it to the project [submit a feature](https://github.com/dev-generator/devgenerator.io/issues/new?assignees=chiefpansancolt&labels=enhancement%2C+new&template=feature-request.md&title=Feature+Request:) and someone else can pick it up and build it out for others to leverage!

### Contribute a Generator

Looking to contribute? Either greate a ticket above or pickup a ticket for one to be created.

When picking up here are the steps to follow to get started.

1. Find ticket and update assigned to field to your name.
2. Fork repo and create new branch for your work.
3. `git clone` your fork locally.
4. Once cloned, run `bundle install` and `yarn install` to ensure all dependancies are installed on machine.
5. After install, to start the server simply run `yarn start` this will start the server and the webpack listener to compile on changes.
6. Follow [Create a Generator](#create-a-generator) for how to implement a new generator to the current framework.

### Contribute Other Items

Looking to contribute in another way? Look to pickup any Issues open asking for help or simply tag the Lead developer on the ticket and see how you can help! Once a Ticket is assigned follow the below steps to get started.

1. Find ticket and update assigned to field to your name.
2. Fork repo and create new branch for your work.
3. `git clone` your fork locally.
4. Once cloned, run `bundle install` and `yarn install` to ensure all dependancies are installed on machine.
5. After install, to start the server simply run `yarn start` this will start the server and the webpack listener to compile on changes.
6. Follow [Working a Ticket](#working-a-ticket) for how to implement and process to follow.

## Create a Generator

### Starting

Adding a new generator can be time consuming especially when the config file is large, be prepared to commit the time needed to build it out. Below will walk you through creating all files needed for a successful implementation of a new generator.

### Process

To begin we need to create some new files to hold our code.

**Step 1:**
: First, we will need to determine our namespace to use this will be leveraged as the name used everywhere. For example rubocop and packagejson are used already.

**Step 2:**
: Second, create a file to hold the js code used. The file will need to be created in the following folder path, `frontend/javascript/generators/` with the a namespace + extension, it should look like this `pacakgejson.js`. Once, created, the base setup of the file should contain the following code found in the template folder `template/javascript.js`, and replace all references to NAMESPACEREPLACE with the namespace determined in step one.

**Step 3:**
: Third, create the view of the form to the users. This file will be created in `src/_generators/"folder of bucket"/`. Note the folder of the bucket currently fits two, either Node Modules (node_modules) or Ruby Gems (ruby_gems), choose one or create a new bucket if applicable. Then create file name with the namespace + extension, it should look like this `pacakgejson.html`. Once created, the base setup of the file should contain the following code found in the template folder `template/view.html`, and replace all references to NAMESPACEREPLACE with the namespace determined in step one.

**Step 4:**
: Fourth, get an SVG based icon of the tool we are generating for, if one does not exist please reach out to the lead developer for path forward on this step. The icon should be placed in the `assets/images/icons/` folder with the name of your icon.

**Step 5:**
: Fith, we add our generator tile to the home page. To do this, open `src/data/generators.yml` find the bucket this generator falls under, like ruby_gems, if a new bucket is requried please skip to step six, otherwise, add the below code snippet to the `generators:` list. replace verbiage to match your generator.

```yaml
- name: Rubocop
  img: rubocop
  file_name: .rubocop.yml
  config_link: https://docs.rubocop.org
  details1: Generate
  details2: file usable in your repo
  link: /generators/ruby_gems/rubocop/
```


**Step 6:**
: If step 5 is skipped and step six is applicable continue reading otherwise skip this step. To add a new Generator bucket you will need to update two files. First file will be `src/data/generators.yml` where you will add the below snippet to the bottom of the file under `details:`, replacing text where applicable. Then labels will need to be added under the "generators:" section in `src/data/site_metadata.yml` and replace the information detailed in the example if code snippet 2.


```yaml
- name: ruby_gems
  id: ruby-gems
  color: bg-gray-700
  side: left
  generators:
    - name: Rubocop
      img: rubocop
      file_name: .rubocop.yml
      config_link: https://docs.rubocop.org
      details1: Generate
      details2: file usable in your repo
      link: /generators/ruby_gems/rubocop/
```

Code Snippet #1 - **src/data/generators.yml**


```yaml
ruby_gems:
  header: Supported Generators
  title: Ruby Gems
  subtitle: All Ruby base gems that have a config file generator needed.
```

Code Snippet #2 - **src/data/site_metadata.yml**

**Step 7:**
: Now the fun part, we need to create the data file that holds all the fields that data will be entered into from a user or populated via a pre built file. When building this keep a few things in mind like how a field is identified in the file and how the user should or could interact with it. If you need help determining how to handle interactions feel free to reach out on the ticket to the Lead Developer for guidance. When creating a file checkout the `src/data/packagejson.yml` for example setup. See [Building a YAML Data Souce File](#building-a-yaml-data-source-file) for what the different data capture posibilities are and how to identify them in the generator data file. Create your new file to house the fields used for this generator in this folder `src/data/` with the namespace determined in step one to look like this `packagejson.yml`.

```yaml
details:
  # All Groups will go below and are entered following the next section.
```

**Step 8:**
: Start updating the JS file created with how to read and generate the output based on the new fields used. I recommend doing step 7 in small chuncks and moving to this step and repeating till all are created to make it easier to debug.

**Step 9:**
: Once these pages are created and files updated, you should be able to load and navigate to this page on the local site to test out its functionality.

### Conclusion

Once all steps have been followed and the generator implemented you should end up with a few new files. If you feel all these items are completed check out [Creating a Pull Request](#creating-a-pull-request) to see how to merge your items into the main site.

New Files Added:

- `src/_generators/*Bucket*/NAMESPACE.html`
- `src/data/NAMESPACE.yml`
- `frontend/javascript/generators/NAMESPACE.js`
- `src/assets/images/icons/NAMESPACE.svg`

Files Updated:

- `src/data/site_metadata.yml`
- `src/data/generators.yml`

## Building a YAML Data Source File

When building a Data Source file in `src/data` to represent the fields the user will be entering in the data to generate the output here is how to build it.

**First - The Grouping**
: The grouping will show as a card to the user with a set of fields inside. To indicate a group use the snippet below to define a group under the "details:" section in the file.

```yaml
- title: Core Details # The title on the section user see
  uniqueName: core_details_section # Used for navigation in id so make sure it is unique
  first: true # Idicates if this is the first group or not, makes sure that padding is added to all others but first
  fields:
    # Fields details will go here see furture for more details
```

**Second - The Fields**
: Currently this tool supports 6 field types out of the box, but more can be added as the use cases arise. Check out [Building a new Field Type](#building-a-new-field-type) section on how to add a new field type to the architecture. Each field type has is specific usecases and fields available, more fields can be added but must be added in a way to not interfear with other built pages.
: Each field has 4 common attributes in the source file detailed below and what they mean.

1. **name**: This is the label seen by the user
2. **uniqueName**: This typically should be how it is identified in the existing file to know what to grab. Does not have to be 100% the same we have flixibility with JS to determine how you get and build the data.
3. **required**: Indicates if the toggle switch is on at the start
4. **fieldType**: Indicates which field type to use see below for example definition to identify each usage.

### Text

Text field is used for simple text entry and shows as a one line input section. Below is an example of creating a field for text in Data Source Field file.

```yaml
- name: Name
  uniqueName: name
  required: true
  defaultValue: "" # Allows you to have set text generated when starting blank. If data found in uploaded file that will override this.
  fieldType: text
```

### Textarea

Textarea is a field used to either show text entry on multiple lines or the more common usage simple arrays of information when have a new item on each line. Below is an example of creating a field for textarea in Data Source Field file.

```yaml
- name: Description
  uniqueName: description
  required: true
  defaultValue: "" # Allows you to have set textarea generated when starting blank. If data found in uploaded file that will override this.
  fieldType: textarea
```

### Checkbox

Checkbox is a field used to indicate a true or false value. Below is an example of creating a field for checkbox in Data Source Field file.

```yaml
- name: Private
  extraDetails: Check if Private repo/package # Extra text that shows to the right of the checkbox.
  uniqueName: private
  required: true
  defaultValue: "false" # Allows you to have set checkbox to true. If data found in uploaded file that will override this.
  fieldType: checkbox
```

### Multiple Column

Multiple Column is used to show multiple fields in one line represented as a key value pair but with specific keys and user entered values. This can have as many columns as necessary but can cause a bad user experience if more than 3 are defined and review will be needed if that use case is needed. Below is an example of creating a field for mulitple column in Data Source Field file.

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

Complex Table is a representation of a key value pair shown in an object. This will just have two fields under the fields attribute. The below code in Code Snippet #1 will be added to the Data Souce Field file. In Code Snippet #2, this will either need to be added or updated in js file to ensure the plus and minus buttons are activated to add and remove rows on the table to the user.

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

Code Snippet #1

```js
setTimeout(function() {
  const btnGroups = [
    ADD UNIQUE NAME OF TABLE HERE
  ];

  btnGroups.forEach((element) => {
    var addBtn = document.getElementById(element + CONSTANTS.ADDBTN);
    var removeBtn = document.getElementById(element + CONSTANTS.REMOVEBTN);
    if (addBtn) {
      addBtn.onclick = () => {
        var tbody = document.getElementById(element + CONSTANTS.TBODY);
        var template = document.getElementById(element + CONSTANTS.TEMPLATE).content.cloneNode(true);
        tbody.appendChild(template);
      };
    }

    if (removeBtn) {
      removeBtn.onclick = () => {
        var tbody = document.getElementById(element + CONSTANTS.TBODY);
        var result = confirm(CONSTANTS.CONFIRMREMOVEMSG);
        if (result) tbody.removeChild(tbody.children[tbody.children.length - 1]);
      };
    }
  });
}, 2000);
```

Code Snippet #2
> Note: a setTimeout is need as the rendering of the elements on load is not loaded before JS is run.

### Complex Array

Complex Array is a mix between Multiple Column and Complex Table to build a Array of key value pairs. The Complex array is a key value pair where keys are pre defined and values are user entered. The below code in Code Snippet #1 will be added to the Data Souce Field file. In Code Snippet #2, this will either need to be added or updated in js file to ensure the plus and minus buttons are activated to add and remove rows on the table to the user.

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

Code Snippet #1

```js
setTimeout(function() {
  const btnGroups = [
    ADD UNIQUE NAME OF TABLE HERE
  ];

  btnGroups.forEach((element) => {
    var addBtn = document.getElementById(element + CONSTANTS.ADDBTN);
    var removeBtn = document.getElementById(element + CONSTANTS.REMOVEBTN);
    if (addBtn) {
      addBtn.onclick = () => {
        var tbody = document.getElementById(element + CONSTANTS.TBODY);
        var template = document.getElementById(element + CONSTANTS.TEMPLATE).content.cloneNode(true);
        tbody.appendChild(template);
      };
    }

    if (removeBtn) {
      removeBtn.onclick = () => {
        var tbody = document.getElementById(element + CONSTANTS.TBODY);
        var result = confirm(CONSTANTS.CONFIRMREMOVEMSG);
        if (result) tbody.removeChild(tbody.children[tbody.children.length - 1]);
      };
    }
  });
}, 2000);
```

Code Snippet #2
> Note: a setTimeout is need as the rendering of the elements on load is not loaded before JS is run.

## Building a new Field Type

If you are in a situation where one of the existing field types does not staisfy your current use case, here is how to add a new field type to meet those needs. First you will need to add a new field type file in `src/_components/base/forms/field_types/` with the name of the field type and the liquid extension, like `input_text.liquid`. Once created copy and paste the template code in `templates/field_type.liquid`. Once pasted add any additional Front Matter items to pass in and reference them where applicable. Then add in the section that has a comment tag how the render of the new form type will work. Once create you will need to open `src/_components/base/forms/core.liquid` and add to the if statement your new field type. Follow the others as examples, then add to this documentation how that new Field Type works.

## Working a Ticket

Looking to pickup a ticket to create a generator or fix a bug? Checkout the [Issues](https://github.com/dev-generator/devgenerator.io/issues) on GitHub. Any issues with the tag of *help wanted* is open season for anyone. If you see one without but that is not assigned to anyone please tag the Lead Developer to ask to helpout.

## Creating a Pull Request

Ready to merge to the main repository? Perfect! If you are merging a new generator please use the New Generator Template and if you are merging anything else please use the Other Merges Template. Once the details have been filled out please mark the pull request with the label `ready to review` so that the Lead Developer knows it is completed and ready for review. Pull Request will be merged to **pre-staging** branch and all merges to main will be done by the lead developer to ensure releases are planned.

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

Thank you for taking the time to read through this and show interest in contributing to this tool. If you feel that there are details missing or need better explaination on this documentation please create a [Documentation Issue](https://github.com/dev-generator/devgenerator.io/issues/new?assignees=&labels=new%2C+documentation&template=documentation.md&title=Question) asking your question or if you have any recommendations to make this even better. Again thank you!
