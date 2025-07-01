// src/data/dummyAssignment.ts
import { AssignmentDetails } from '../types/assignment'

export const assignmentDataList: AssignmentDetails[] = 
  [
    {
      _id: "CNT006",
      tagname: "Submitted",
      title: "Assignment 1: DOM Manipulation",
      descriptions: "Build a simple webpage that responds to user interactions using JavaScript DOM APIs.",
      dueDt: "2025-06-10 11:59PM",
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body {
              background-color: transparent;
            }
            hr {
              border: none;
              border-top: 1px solid #e0e0e0;
              margin: 16px 0;
            }
            ul {
              padding-left: 16px;
              margin: 8px 0;
            }
            li {
              margin-bottom: 0px;
            }
            .assignment-image {
              width: 100%;
              max-width: 100%;
              height: auto;
            }
          </style>
        </head>
        <body>
          
          <ul>
            <li>The Financial Analysis Report provides a comprehensive overview of the company's fiscal health. It includes key metrics such as revenue growth, profit balance, and expense management.</li>
            <li>By examining trends over the past quarters, we can identify areas of strength and opportunities for improvement. This report also highlights the impact of market conditions on our financial performance and outlines strategic recommendations for future growth.</li>
          </ul>
          
          <hr>

        </body>
        </html>
      `
    },

    {
      "_id": "CNT007",
      "tagname": "Todo",
      "title": "Assignment 2: CSS Flexbox Layout",
      "descriptions": "Create a responsive layout using CSS Flexbox to arrange content blocks in various screen sizes.",
      "dueDt": "2025-06-12 11:59PM",
      htmlContent: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          color: #333;
          line-height: 1.5;
        }
        hr {
          border: none;
          border-top: 1px solid #e0e0e0;
          margin: 16px 0;
        }
        ul {
          padding-left: 16px;
          margin: 8px 0;
        }
        li {
          margin-bottom: 0px;
        }
        .assignment-image {
          width: 100%;
          max-width: 100%;
          height: auto;
        }
      </style>
    </head>
    <body>
      
      <ul>
        <li>The Financial Analysis Report provides a comprehensive overview of the company's fiscal health.</li>
        <li>This report also highlights the impact of market conditions on our financial performance and outlines strategic recommendations for future growth.</li>
      </ul>
      
      <hr>

      <img 
        src="https://i.sstatic.net/YSyja.jpg" 
        alt="Assignment Image" 
        class="assignment-image"
      />

      <hr>

    </body>
   
    </html>
  `
    },

    {
      "_id": "CNT008",
      "tagname": "Overdue",
      "title": "Assignment 3: JavaScript Functions",
      "descriptions": "Write several JavaScript functions to manipulate arrays and strings based on provided requirements.",
      "dueDt": "2025-06-08 11:59PM",
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              color: #333;
              line-height: 1.5;
            }
            hr {
              border: none;
              border-top: 1px solid #e0e0e0;
              margin: 16px 0;
            }
            ul {
              padding-left: 16px;
              margin: 8px 0;
            }
            li {
              margin-bottom: 0px;
            }
            .assignment-image {
              width: 100%;
              max-width: 100%;
              height: auto;
            }
          </style>
        </head>
        <body>
          
          <ul>
            <li>The Financial Analysis Report provides a comprehensive overview of the company's fiscal health.</li>
            <li>This report also highlights the impact of market conditions on our financial performance and outlines strategic recommendations for future growth.</li>
          </ul>
          
          <hr>

          <img 
            src="https://cdn1.byjus.com/wp-content/uploads/2023/06/NCERT-Solutions-for-Class-12-Physics-Chapter-1-Electric-Charges-and-Fields-17.jpg" 
            alt="Assignment Image" 
            class="assignment-image"
          />

          <hr>

        </body>
        </html>
      `,
    },
    
    {
      "_id": "CNT009",
      "tagname": "Submitted",
      "title": "Assignment 4: HTML Forms & Validation",
      "descriptions": "Design a registration form with input validation using both HTML5 and JavaScript.",
      "dueDt": "2025-06-09 11:59PM",
      "htmlContent": `
         <!DOCTYPE html>
        <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body {
              background-color: transparent;
            }
            hr {
              border: none;
              border-top: 1px solid #e0e0e0;
              margin: 16px 0;
            }
            ul {
              padding-left: 16px;
              margin: 8px 0;
            }
            li {
              margin-bottom: 0px;
            }
            .assignment-image {
              width: 100%;
              max-width: 100%;
              height: auto;
            }
          </style>
        </head>
        <body>
          
          <ul>
            <li>The Financial Analysis Report provides a comprehensive overview of the company's fiscal health. It includes key metrics such as revenue growth, profit balance, and expense management.</li>
            <li>By examining trends over the past quarters, we can identify areas of strength and opportunities for improvement. This report also highlights the impact of market conditions on our financial performance and outlines strategic recommendations for future growth.</li>
          </ul>
          
          <hr>

          <img 
            src="https://learnbright.org/wp-content/uploads/2021/10/Histograms11.jpg" 
            alt="Assignment Image" 
            class="assignment-image"
          />

          <hr>

        </body>
        </html>
      `
    },
    {
      "_id": "CNT010",
      "tagname": "Todo",
      "title": "Assignment 5: Async JavaScript",
      "descriptions": "Use \\`fetch\\` to retrieve API data and display it dynamically on the page. Handle loading states and errors.",
      "dueDt": "2025-06-13 11:59PM",
      "htmlContent": `
        <!DOCTYPE html>
        <html>
        <body>
          <div id="data">Loading...</div>
          <script>
            fetch('https://jsonplaceholder.typicode.com/posts/1')
              .then(res => res.json())
              .then(data => {
                document.getElementById('data').innerText = data.title;
              })
              .catch(() => {
                document.getElementById('data').innerText = 'Error loading data';
              });
          </script>
        </body>
        </html>
      `
    }    
  ]
