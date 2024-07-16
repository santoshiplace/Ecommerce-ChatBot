
import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

//const app = express();
const port = 3000; // Ensure this port is available
const OPENAI_API_KEY = ''; // Replace with your actual API key

app.use(bodyParser.json());

// Define a simple GET route for the root endpoint
app.get('/', (req, res) => {
    res.send('Hello, this is the root endpoint!');
});

// Define a POST route for the /chat endpoint
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userMessage }],
            })
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;

        res.json({ reply });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
const express = require('express');
const bodyParser = require('body-parser');


app.use(bodyParser.json());

// Example data for product recommendations
const productData = [
    {
        name: 'Floral Maxi Sundress',
        description: 'This dress features a vibrant floral print with a flowy silhouette, ideal for summer days.',
        sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
        name: 'Khaki Cargo Pants',
        description: 'These pants feature a relaxed fit with cargo pockets, perfect for a laid-back vibe.',
        sizes: ['S', 'M', 'L', 'XL']
    }
    // Add more product data as needed
];

// Handle POST request to /chat endpoint
app.post('/chat', (req, res) => {
    const message = req.body.message.toLowerCase().trim();
    let reply = '';

    // Example logic for different user queries
    if (message.includes('summer styling')) {
        reply = "Summer calls for light and breezy outfits. How about a floral sundress paired with strappy sandals?";
    } else if (message.includes('floral sundresses')) {
        reply = JSON.stringify(productData.filter(product => product.name.toLowerCase().includes('floral')));
    } else {
        reply = "Sorry, I didn't quite catch that. Can you please ask again?";
    }

    res.json({ reply: reply });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});



const express = require('express');
const bodyParser = require('body-parser');
const { dialogflow } = require('dialogflow');

const app = express();
app.use(bodyParser.json());

const intentMap = new Map();
intentMap.set('Order Tracking', orderTrackingIntent);
intentMap.set('Weekly Trend Analysis', weeklyTrendAnalysisIntent);
intentMap.set('Product ID', productIDIntent);

async function orderTrackingIntent(agent) {
  const orderID = agent.parameters.orderID;
  const orderStatus = await getOrderStatus(orderID);
  agent.add(`The status of your order is: ${orderStatus}`);
}

async function weeklyTrendAnalysisIntent(agent) {
  const productCategory = agent.parameters.productCategory;
  const trendAnalysis = await getWeeklyTrendAnalysis(productCategory);
  agent.add(`Here is the weekly trend analysis for ${productCategory}: ${trendAnalysis}`);
}

async function productIDIntent(agent) {
  const productID = agent.parameters.productID;
  const productInfo = await getProductInfo(productID);
  agent.add(`Here is the information for product ${productID}: ${productInfo}`);
}

async function getOrderStatus(orderID) {
    // Call API to get order status
    const response = await fetch(`(link unavailable));
    const data = await response.json();
    return data.status;
  }
  
  async function getWeeklyTrendAnalysis(productCategory) {
    // Call API to get weekly trend analysis
    const response = await fetch(`(link ,unavailable));
    const data = await response.json();
    return data.analysis;
  }
  
  async function getProductInfo(productID) {
    // Call API to get product information
    const response = await fetch((link ,unavailable));
    const data = await response.json();
    return data.info;
  }
  
  app.post('/dialogflow', async (req, res) => {
    const agent = new dialogflow.Agent({ intentMap });
    const response = await agent.handleRequest(req.body);
    res.json(response);
  });
  
  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
  
  