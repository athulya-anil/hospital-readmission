# **Hospital Readmission Dashboard**

Website Link - https://athulya-anil.github.io/hospital-readmission/
## **Overview**
This project presents an interactive dashboard to explore hospital readmission trends across the United States. It is designed to help identify patterns in readmission rates based on age group, diagnosis, length of stay, medications administered, and more. The dashboard was developed using React and D3.js as part of the final project for CS571 – Data Visualization and Exploration.

A choropleth map and several dynamic visualizations allow users to drill down into specific categories and compare trends across the nation. The goal is to make healthcare data more transparent and actionable.

---

## **Setup Instructions**

### **1. Prerequisites**
- **Node.js** (v18 or later)
- **npm** (v9 or later)
- **Git** (optional, for cloning the repo)

### **2. Installation**

#### **a. Clone the Repository**

- git clone https://github.com/athulya-anil/hospital-readmission.git -> Clone the Repo 
- cd hospital-readmission -> Go into the Folder
- npm install -> Install Dependencies
- npm run dev -> Start the Development Server

## **Dashboard Features**

### **Implemented Visualizations**
- **Home Page** – U.S. map colored by state-level readmission rates.
- **By Age Group** – Bar chart of readmissions by patient age category.
- **By Condition** – Visual breakdown by common diagnoses.
- **By Length of Stay** – Analysis of how length of hospitalization correlates with readmission.
- **By Medication** – Readmission likelihood by number of medications administered.
- **By Diagnosis** – Trends across ICD-coded primary diagnoses.

> 📌 Each chart is interactive and includes axis labels, tooltips, and legends where appropriate.

---

## **Project Files**

| File/Folder        | Description                                             |
|--------------------|---------------------------------------------------------|
| `public/`          | Contains datasets and assets like favicon              |
| `src/components/`  | All chart components using D3.js and Plotly            |
| `src/pages/`       | Individual route pages for each visualization          |
| `src/App.jsx`      | Main app component with routes                         |
| `vite.config.js`   | Configuration for Vite and GitHub Pages deployment     |

---

## **Dependencies**

### **Major Libraries & Tools**
- **React.js**
- **Vite**
- **Tailwind CSS**
- **D3.js**
- **Plotly.js**
- **Leaflet.js**

### **Dev Dependencies**
- **gh-pages** for deployment

---

## **Contributors**
- **Athulya Anil** – `34760586` – athulyaanil@umass.edu  
- **Priya Arunachalam** – `34743317` – iarunachalam@umass.edu  

