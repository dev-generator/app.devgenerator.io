# Security Policy

- [Security Policy](#security-policy)
  - [Reporting security problems to WIP](#reporting-security-problems-to-wip)
  - [Incident Response Process](#incident-response-process)
    - [1. Containment](#1-containment)
    - [2. Response](#2-response)
    - [3. Remediation](#3-remediation)
  - [Vulnerability Management Plans](#vulnerability-management-plans)
    - [Critical Updates And Security Notices](#critical-updates-and-security-notices)

## Reporting security problems to WIP

**CREATE AN ISSUE** to report a security problem. please create a ticket from this template stating the issue. [Security Issue](https://github.com/dev-generator/app.devgenerator.io/issues/new?assignees=chiefpansancolt&labels=new%2C+security&template=security.md&title=Security:)

## Incident Response Process

In case an incident is discovered or reported, I will follow the following process to contain, respond and remediate:

### 1. Containment

The first step is to find out the root cause, nature and scope of the incident.

- Is still ongoing? If yes, first the priority is to stop it.
- Is the incident outside of my influence? If yes, first the priority is to contain it.
- Find out knows about the incident and who is affected.
- Find out what data was potentially exposed.

One way to immediately remove all access for the WIP app is to remove the
private key from the WIP App Settings page. The access can be recovered later
by generating a new private key and re-deploy the app.

### 2. Response

After the initial assessment and containment to my best abilities, I will
document all actions taken in a response plan.

I will create a comment in the ticket logged to inform users about
the incident and what I actions I took to contain it.

### 3. Remediation

Once the incident is confirmed to be resolved, I will summarize the lessons
learned from the incident and create a list of actions I will take to prevent
it from happening again.

## Vulnerability Management Plans

### Critical Updates And Security Notices

We learn about critical software updates and security threats from these sources

1. GitHub Security Alerts
2. GitHub: https://status.github.com/ & [@githubstatus](https://twitter.com/githubstatus)
