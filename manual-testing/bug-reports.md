# Bug Reports

This document demonstrates how defects would be documented during manual test execution.
The purpose of this file is to show the **bug reporting structure** used in this project.

---

## Bug Report Template

- **Bug ID:**
- **Title:**
- **Environment:**
- **Severity:**
- **Priority:**
- **Status:**
- **Related Test Case ID(s):**
- **Steps to Reproduce:**
- **Expected Result:**
- **Actual Result:**
- **Attachments**

---

## Sample Bug Report

### Bug ID
BUG-001

### Title
Sorting by price (low to high) does not sort products correctly

### Environment
Web application, Chrome browser, SauceDemo

### Severity
Medium

### Priority
Medium

### Status
Open

### Related Test Case ID(s)
TC_PRODUCT_03

### Steps to Reproduce
1. Log in with valid username and password
2. Navigate to the Products page
3. Open the sorting dropdown
4. Select **Price (low to high)**

### Expected Result
Products should be displayed in ascending order based on price

### Actual Result
Some products appear in incorrect order
