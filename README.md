# Backend AI Agent

A sophisticated Node.js backend service that provides an AI-powered agent with multiple tool capabilities including calculations, weather checking, and knowledge base querying through vector search.

## Overview

This project implements an Express.js backend server that integrates with Groq's LLM (Large Language Model) and Pinecone vector database to create an intelligent AI agent. The agent can handle various types of queries by utilizing specialized tools and accessing a curated knowledge base of markdown documents.

## Features

- **AI-Powered Chat Agent**: Powered by Groq's Llama 3.3 70B model
- **Multi-Tool System**: Three specialized tools for different functionalities
- **Vector Search**: Semantic search through markdown knowledge base using Pinecone
- **RESTful API**: Clean HTTP endpoints for client interaction
- **TypeScript**: Fully typed codebase for better development experience

## Architecture

### Core Components

#### 1. Express Server (`src/index.ts`)

- Main application entry point
- Configures CORS and JSON middleware
- Serves API routes and health check endpoint
- Runs on port 8000 (configurable via environment)

#### 2. Agent Controller (`src/controllers/agent.controller.ts`)

- Handles incoming chat messages via POST `/api/agent/message`
- Validates request payload
- Processes messages through the AI system
- Returns structured responses with error handling

#### 3. AI Engine (`src/lib/ai.ts`)

- Central AI orchestration system
- Integrates with Groq's Llama 3.3 70B model
- Manages tool selection and execution
- Streams responses for real-time interaction
- Returns combined responses from all tools

#### 4. Tool System (`src/lib/tools.ts`)

Three specialized tools are available:

- **Calculator Tool**: Performs mathematical calculations and handles math-related queries
- **Weather Checker Tool**: Provides mock weather information for demonstration
- **Data Access Tool**: Searches through the markdown knowledge base using Pinecone

#### 5. Pinecone Integration (`src/lib/pinecone.ts`)

- Manages vector database connection
- Handles document indexing and search operations
- Stores 5 markdown documents about blogging and markdown
- Provides semantic search capabilities

#### 6. Knowledge Base (`src/data/`)

Contains markdown documents covering:

- Blogging with Markdown guides
- Custom markdown blog implementations
- Next.js blog tutorials
- AI performance optimization
- Lightweight markup languages

#### 7. Prompt System (`src/lib/prompt.ts`)

- Defines system prompts and tool-specific prompts
- Ensures consistent AI behavior
- Provides clear instructions for tool usage

## API Endpoints

### POST `/api/agent/message`

Processes user messages through the AI agent.

**Request Body:**

```json
{
  "message": "Your question or request here"
}
```

**Response:**

```json
{
  "response": {
    "fullResponse": "AI generated response",
    "calculatorResponse": "Result from calculator tool (if used)",
    "weatherResponse": "Weather information (if requested)",
    "dataResponse": "Knowledge base search results (if relevant)"
  }
}
```

### GET `/`

Health check endpoint that returns "Hello World!"

## Tool Capabilities

### Calculator Tool

- Handles mathematical expressions and calculations
- Processes generic mathematical questions
- Validates input and provides appropriate error messages

### Weather Checker Tool

- Provides mock weather data for demonstration
- Returns temperature, conditions, and location information
- Handles location validation

### Data Access Tool

- Searches through indexed markdown documents
- Uses semantic search via Pinecone vector database
- Returns relevant content with similarity scores
- Covers topics related to blogging, markdown, and web development

## Technology Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **AI Model**: Groq Llama 3.3 70B Versatile
- **Vector Database**: Pinecone
- **Schema Validation**: Zod
- **Development**: TSX for TypeScript execution

## Dependencies

### Core Dependencies

- `@ai-sdk/groq`: Groq AI SDK integration
- `@pinecone-database/pinecone`: Vector database client
- `ai`: AI SDK for model interactions
- `express`: Web framework
- `cors`: Cross-origin resource sharing
- `dotenv`: Environment variable management
- `zod`: Schema validation

### Development Dependencies

- `@types/cors`, `@types/express`: TypeScript definitions
- `groq-sdk`: Groq SDK
- `tsx`: TypeScript execution

## Environment Configuration

The application requires the following environment variables:

- `PORT`: Server port (defaults to 8000)
- `PINECONE_API_KEY`: Pinecone database API key
- `INDEX_NAME`: Pinecone index name
- `INDEX_HOST`: Pinecone index host URL
- `GROQ_API_KEY`: Groq API key (implied by the AI SDK usage)

## Project Structure

```
src/
├── controllers/
│   └── agent.controller.ts    # Request handling logic
├── data/
│   ├── index.ts              # File reading utilities
│   └── *.md                  # Markdown knowledge base files
├── lib/
│   ├── ai.ts                 # AI orchestration and tool management
│   ├── pinecone.ts           # Vector database operations
│   ├── prompt.ts             # System and tool prompts
│   └── tools.ts              # Tool implementations
├── routes/
│   └── agent.route.ts        # API route definitions
└── index.ts                  # Application entry point
```

## Usage Patterns

The AI agent can handle various types of queries:

1. **Mathematical Questions**: "Calculate 25 \* 4 + 10" or "What's the square root of 144?"
2. **Weather Inquiries**: "What's the weather like?" or "Check the current weather"
3. **Knowledge Base Queries**: "How do I create a markdown blog?" or "Tell me about Next.js blogging"
4. **Mixed Requests**: The agent can use multiple tools in a single response if needed

## Development Scripts

- `npm run dev`: Start development server with hot reload
- `npm run build`: Compile TypeScript to JavaScript
- `npm start`: Run production build

## System Behavior

The AI agent is designed to:

- Only use available tools for information
- Never hallucinate or make up data
- Provide clear responses when information is unavailable
- Handle errors gracefully with appropriate error messages
- Maintain conversation context through message history

This backend service provides a robust foundation for building AI-powered applications with specialized tool capabilities and knowledge base integration.
