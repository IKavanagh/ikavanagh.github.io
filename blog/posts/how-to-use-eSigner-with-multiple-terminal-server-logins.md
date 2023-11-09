# How to use eSigner with multiple terminal server logins

---
date: 2023-11-03 08:00:00 +0000
---

SSL.com's eSigner Cloud Key Adapter (CKA) is a Windows based application that allows signing tools use the eSigner Cloud Signature Consortium (CSC) API to sign code. It is designed to be used as a replacement for a physical USB token and loads the code signing certificates into the certificate store for use with CI/CD pipelines for automated code signing. I used it with [ClickOnce](https://learn.microsoft.com/en-us/visualstudio/deployment/how-to-publish-a-clickonce-application-using-the-publish-wizard?view=vs-2022) to automate signing of Windows based applications.

## The Problem

The CI/CD pipeline for building these applications was not a traditional CI/CD pipeline. It was a Windows based terminal server that acted as the build machine with a bash script that built several applications using MSBuild and ClickOnce. The terminal server allows multiple users to log in and build the applications. The problem was that the eSigner CKA only worked for one user account on the terminal server and subsequent accounts couldn't log in. This meant that only one person/account could build the applications. In order to allow multiple users to build the applications, I had to find a way to allow multiple users to use the eSigner CKA.

## The Solution

The solution was simple but a little hacky. With the eSigner CKA installed and set up for one user and the master key stored in a folder on the C drive which everybody had access to, I copied the eSigner folder from the %AppData% folder for the user it was working correctly for to every other users %AppData% folder. This allowed every user to use the eSigner CKA and sign code. Each user could launch eSigner CKA and install the code signing certificates into their own Personal certificate store. This allowed multiple users to sign code on the same terminal server.

## Conclusion

This was a simple solution to a problem that was causing a lot of headaches for the team. It allowed us to automate code signing and allowed multiple users to sign code and build our applications on the same terminal server. I hope this helps somebody else who is having the same problem.