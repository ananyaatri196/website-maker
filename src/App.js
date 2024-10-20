import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [prompt, setPrompt] = useState(''); // Website prompt state
  const [generatedWebsite, setGeneratedWebsite] = useState(''); // Stores the generated HTML/CSS template

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload on form submission

    try {
      // Sending POST request to the NestJS backend
      const response = await axios.post('http://localhost:3000/generate', {
        prompt: prompt,
      });
      // Set the response (generated website) to the state for rendering
      setGeneratedWebsite(response.data);
    } catch (error) {
      console.error('Error generating website:', error);
      setGeneratedWebsite('<p>Something went wrong. Please try again.</p>');
    }
  };

  return (
    <div className="App">
      <h1>AI Website Maker</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Describe the template you want:
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
            rows={4}
            cols={50}
            placeholder="e.g., A clean, modern blog layout with a header, footer, and responsive design"
          />
        </label>
        <button type="submit">Generate Template</button>
      </form>

      {/* Display the generated website code as a live preview */}
      <h2>Website Preview</h2>
      <div
        className="website-preview"
        dangerouslySetInnerHTML={{ __html: generatedWebsite }} // Insert HTML safely
      />
    </div>
  );
}

export default App;
