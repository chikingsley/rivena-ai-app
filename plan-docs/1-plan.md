# Therapy App with Wormhole Memory: Implementation Checklist

## Phase 1: Foundation Setup
- [ ] **Authentication System**
  - [ ] Implement user signup/login flow 
  - [ ] Set up session management
  - [ ] Create user profile database schema
  - [ ] Add user settings page

- [ ] **LiveKit Integration** *(Note: Use Server SDK for your API routes)*
  - [ ] Set up LiveKit account and project
  - [ ] Create token generation API route
  - [ ] Implement basic room creation
  - [ ] Add WebRTC audio/video components to frontend

- [ ] **Basic SPA Dashboard**
  - [ ] Create main chat UI
  - [ ] Build conversation list/history view
  - [ ] Implement responsive design for mobile/desktop
  - [ ] Add basic navigation

## Phase 2: LLM Integration
- [ ] **Basic LLM Connection**
  - [ ] Set up API keys and environment variables
  - [ ] Create LLM service adapter
  - [ ] Implement basic prompt templates
  - [ ] Add error handling for API issues

- [ ] **Message Persistence**
  - [ ] Design message schema in Supabase
  - [ ] Create API routes for message CRUD operations
  - [ ] Implement real-time message syncing
  - [ ] Add conversation history retrieval

## Phase 3: Vector Database Setup
- [ ] **Database Schema**
  ```sql
  CREATE TABLE memories (
      id UUID PRIMARY KEY,
      user_id TEXT NOT NULL,
      dialogue_id TEXT NOT NULL,
      timestamp TIMESTAMPTZ NOT NULL,
      content TEXT NOT NULL,
      embedding VECTOR(1024),
      topic_category TEXT,
      metadata JSONB,
      last_accessed TIMESTAMPTZ,
      update_count INTEGER DEFAULT 0
  );
  ```
  - [ ] Set up pgvector extension in Supabase
  - [ ] Create indexes for multi-dimensional queries
  - [ ] Add database migration scripts
  - [ ] Test basic vector operations

- [ ] **Embedding Pipeline**
  - [ ] Integrate Jina embedding API
  - [ ] Implement late chunking algorithm
  - [ ] Create embedding storage service
  - [ ] Add embedding refresh/update mechanism

## Phase 4: Basic Retrieval System
- [ ] **Vector Search**
  - [ ] Implement cosine similarity search
  - [ ] Create API route for memory retrieval
  - [ ] Add pagination for search results
  - [ ] Test search performance

- [ ] **Jina Reranker Integration**
  - [ ] Set up reranker API connection
  - [ ] Implement post-processing of search results
  - [ ] Tune relevance thresholds
  - [ ] Create utility to explain rankings (for debugging)

- [ ] **LLM Prompt Enhancement**
  - [ ] Update prompt templates to include retrieved memories
  - [ ] Test different memory insertion formats
  - [ ] Implement memory relevance filtering
  - [ ] Add memory attribution in responses

## Phase 5: Wormhole Memory Implementation
- [ ] **Multi-dimensional Indexing**
  - [ ] Create index for user dimension
  - [ ] Implement temporal (time) indexing
  - [ ] Add topic categorization
  - [ ] Build composite query functions

- [ ] **Memory Management**
  - [ ] Implement "surprise checker" algorithm
  ```javascript
  function surpriseCheck(newInfo, existingMemory) {
    const distance = calculateDistance(newInfo, existingMemory);
    return distance > SURPRISE_THRESHOLD;
  }
  ```
  - [ ] Create momentum-based update mechanism
  ```javascript
  function updateMemory(existingMemory, newInfo, alpha = 0.3) {
    return {
      ...existingMemory,
      content: blendContent(existingMemory.content, newInfo.content),
      embedding: existingMemory.embedding.map((val, i) => 
        (1 - alpha) * val + alpha * newInfo.embedding[i]
      ),
      lastUpdated: new Date(),
      updateCount: existingMemory.updateCount + 1
    };
  }
  ```
  - [ ] Develop memory decay routine
  - [ ] Add memory access tracking

- [ ] **Cross-Dialogue Retrieval**
  - [ ] Implement hierarchical distance function
  - [ ] Create query builder for memory search
  - [ ] Build multi-session matcher
  - [ ] Add relevance scoring algorithm

## Phase 6: Chain of Thought Integration
- [ ] **CoT Framework**
  - [ ] Design CoT template structure
  - [ ] Implement CoT generation from memories
  - [ ] Create memory-to-reasoning converter
  - [ ] Build integration with LLM prompts

- [ ] **Output Management**
  - [ ] Implement residual/gating merger
  - [ ] Create adaptive response mechanism
  - [ ] Add memory attribution (subtle)
  - [ ] Build conversation context assembler

## Phase 7: Testing & Optimization
- [ ] **Testing Framework**
  - [ ] Create memory recall test suite
  - [ ] Implement memory update tests
  - [ ] Build conversation simulation tool
  - [ ] Design A/B testing infrastructure

- [ ] **Performance Optimization**
  - [ ] Add caching for frequent memories
  - [ ] Implement query optimization
  - [ ] Create background processing for embedding
  - [ ] Add batch operations for database

- [ ] **UI/UX for Memory System**
  - [ ] Design memory visualization (optional)
  - [ ] Add subtle indicators for memory use
  - [ ] Implement memory feedback mechanism
  - [ ] Create debug view for developers

## Phase 8: Production Preparation
- [ ] **Security Review**
  - [ ] Implement memory access controls
  - [ ] Add encryption for sensitive content
  - [ ] Create privacy policy updates
  - [ ] Perform penetration testing

- [ ] **Monitoring & Analytics**
  - [ ] Set up memory system metrics
  - [ ] Implement performance monitoring
  - [ ] Create dashboard for system health
  - [ ] Add anomaly detection

- [ ] **Documentation**
  - [ ] Document memory system architecture
  - [ ] Create API documentation
  - [ ] Build developer onboarding guide
  - [ ] Design user guide for memory features

---

## LiveKit SDK Clarification

For your LiveKit integration, based on your SPA with API routes setup:

- **Use the Server SDK** in your API routes that handle room creation, token generation, etc.
- **Use the Web SDK** in your browser-based SPA for the actual WebRTC connection

Node.js is not just another name for JavaScript. JavaScript is the language, while Node.js is a runtime environment that allows JavaScript to run outside of browsers (on servers, etc.). When you see:

- **Node SDK**: Designed for server environments running Node.js
- **JS/Web SDK**: Designed for web browsers

For your setup with "SSE servers that are basically just files on routes," you're describing API routes in a framework like Next.js or similar. These are still running in a Node.js environment on the server, so you would use the Server SDK there.