# Multi-Location Retail Management Platform

A proprietary desktop application architected to modernize and streamline daily operations across four physical retail locations. Built to replace failing legacy software, this system interfaces directly with physical hardware controllers to manage services in real-time.

## Tech Stack
* **Frontend:** React, Tailwind CSS, Redux Toolkit
* **Desktop Environment:** Electron
* **Hardware Integration:** Node.js (Serial Communication Protocols)
* **Database:** SQLite

## The Architecture & Hardware Integration
The core engineering challenge of this project was bridging a modern web-based UI with legacy physical machinery. 

Instead of relying on outdated third-party managers, this application leverages Electron to run a responsive React frontend while utilizing Node.js backend processes to establish direct serial communication with physical t-Max Manager G2 hardware controllers. This allows staff to trigger, monitor, and manage physical retail services directly from the custom UI with zero latency.

## Key Features
* **Real-Time Hardware Control:** Custom serial logic to communicate with physical hardware nodes.
* **Multi-Store Scalability:** Designed to standardize operational workflows across four distinct locations.
* **Modernized State Management:** Utilized Redux to ensure the UI remains perfectly synced with the physical hardware states, eliminating the concurrent load delays present in the legacy system.

> Note: For security and privacy reasons regarding the live business, this repository contains the core architectural framework. Sensitive business logic, customer databases, and proprietary hardware credentials have been abstracted or removed.
