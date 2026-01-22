# Software Testing Practice Project

## Project Overview
This repository contains a personal software testing practice project created to refresh my software testing skills, practice test design, learn about automating tests with playwright and apply QA best practices in a structured way.

The application under test is *SauceDemo*, a sample e-commerce web application commonly used for testing practice.

## Repository Structure

### manual/
Contains manual testing artifacts such as:
- Test plan
- Manual test cases (Excel)
- Sample bug reports and documentation

### automation/
Contains UI automation tests implemented with *Playwright*:
- tests/ (Playwright test specs)
- playwright.config.js
- package.json and package-lock.json

## Scope of Testing
The following functional areas are covered:
- Login functionality
- Product listing and sorting
- Single product pages (product details)
- Cart functionality
- Checkout process

Testing includes:
- Functional test cases
- Positive and negative scenarios

The automation scope focuses on critical user flows and representative scenarios rather than exhaustive coverage.

## Test Artifacts

### Test Plan
- Defines test strategy
- Scope
- Risks
- Test environment
- Entry and exit criteria

### Manual Test Cases
Manual test cases are created and executed in Excel files, organized by functional area:
- Login
- Products
- Cart
- Checkout

Each test case includes:
- Test Case ID
- Test Case Title
- Preconditions
- Test Steps
- Test Data
- Expected Results
- Actual Results
- Priority
- Execution Status

### Bug Reports
Sample bug reports are documented in markdown to demonstrate defect reporting structure and traceability.

## Commit Message Guidelines

This project follows simple, descriptive commit messages to keep the history readable.

- **test:** for adding or updating automated tests  
  _Example:_ `test: add checkout automation tests`

- **refactor:** for restructuring code without changing behavior  
  _Example:_ `refactor: make cart tests product-independent`

- **docs:** for documentation updates  
  _Example:_ `docs: update README`

- **chore:** for maintenance or configuration changes  
  _Example:_ `chore: update dependencies`

Each commit focuses on a single, logical change.


## Tools Used
- Manual testing techniques
- Microsoft Excel (test case design and execution)
- GitHub (version control and documentation)
- VS Code with Playwright extension (UI test automation)

## Run Automation Tests Locally

From the repository root:

```bash
cd automation
npm ci
npx playwright install --with-deps
npx playwright test
```

Optional (Playwright UI mode):

```bash
npx playwright test --ui
```

## Limitations and Future Improvements
This is a practice project and coverage is intentionally limited to representative scenarios to focus on test design quality rather than quantity.

Possible future improvements:
- Add more automated test coverage for critical flows
- Add API testing practice
- Add reusable helpers (for example login setup in beforeEach)

## Author
*BSc. Dilek Firat*  
ISTQB Certified Tester (CTFL)