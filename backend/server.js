import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import { config } from 'dotenv'; // Make sure to install dotenv package

// Load environment variables from .env file
config();

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Use environment variable for API key

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

// Define a simple GET route for the root endpoint
app.get('/', (req, res) => {
    res.send('Hello, this is the root endpoint!');
});

// Define a POST route for the /chat endpoint
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message.toLowerCase().trim();

    // Handle local product recommendations
    let reply = '';
    if (userMessage.includes('summer styling')) {
        reply = "Summer calls for light and breezy outfits. How about a floral sundress paired with strappy sandals?";
    } else if (userMessage.includes('floral sundresses')) {
        reply = JSON.stringify(productData.filter(product => product.name.toLowerCase().includes('floral')));
    } else {
        // If no local response is matched, query OpenAI API
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
            reply = data.choices[0].message.content;
        } catch (error) {
            console.error('Error:', error);
            reply = 'An error occurred while processing your request.';
        }
    }

    res.json({ reply: reply });
});

// Error handling for uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down server due to uncaught exception');
    process.exit(1);
});

// Connect to the database (ensure you have a `connectDatabase` function implemented)
// connectDatabase(); 

// Start the server
const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Error handling for unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down server due to unhandled promise rejection');

    server.close(() => {
        process.exit(1);
    });
});
