---
name: Pull Request
about: a standard Pull Request form
title: ''
labels: new
assignees: chiefpansancolt
---

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

<!-- If not a new generator the below can be deleted -->
- [] File Created - `src/_generators/*Bucket*/NAMESPACE.html`
- [] File Created - `src/data/NAMESPACE.yml`
- [] File Created - `frontend/javascript/generators/NAMESPACE.js`
- [] File Created - `src/assets/images/icons/NAMESPACE.svg`
- [] File Updated - `src/data/site_metadata.yml`
- [] File Updated - `src/data/generators.yml`

<!-- If new File Types added please use the below if not delete from here down -->
- [] File Created for new File Types in `src/_components/base/forms/form_types/`
- [] File Updated - `src/_components/base/forms/core.liquid`
