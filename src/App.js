import React, { useState } from "react";
import axios from "axios";
import "./App.css"
import { Container, Form, Button, Card, Alert } from "react-bootstrap";

const App = () => {
  const [textInput, setTextInput] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
        { inputs: textInput },
        {
          headers: {
            Authorization: `Bearer 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`,
          },
          responseType: "blob", 
        }
      );
      const string = URL.createObjectURL(response.data);
      console.log( string);
      setGeneratedImage(string);
      setError("");
    } catch (error) {
      console.error("Error generating image:", error);
      setError("Error generating image. Please try again.");
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">AI Image Generation App</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="textInput">
          <Form.Label>Enter Text:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter text for image generation"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mb-3">
          Generate Image
        </Button>
      </Form>
      {error && <Alert variant="danger">{error}</Alert>}
      {generatedImage && (
        <Card style={{ width: "18rem", margin: "0 auto" }}>
          <Card.Img variant="top" src={generatedImage} />
        </Card>
      )}
    </Container>
  );
};

export default App;
