# Y.js Collaborative Todo App

A hands-on learning project for mastering Y.js (Yjs) CRDT technology through building a collaborative todo application. This project demonstrates real-time collaborative editing, conflict resolution, and synchronization patterns using Y.js with React and TypeScript.

## 📋 Table of Contents

- [Overview](#overview)
- [Current Status](#current-status)
- [Learning Objectives](#learning-objectives)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Learning Path](#learning-path)
- [Key Concepts Covered](#key-concepts-covered)
- [Project Structure](#project-structure)
- [Development](#development)

## Overview

This project serves as a comprehensive tutorial for learning Y.js (Yjs) - a high-performance CRDT implementation for building collaborative applications. By building a todo app, you'll understand how to implement real-time collaboration, handle concurrent edits, and resolve conflicts automatically.

**Inspired by:** [Learn Y.js Course](https://learn.yjs.dev/lessons/03-todo-list/)

## Current Status

✅ **Phase 1, Lesson 2 COMPLETE**: Y.Map Implementation
- Basic Y.Doc and Y.Array integration
- Property-level conflict resolution with Y.Map
- Nested observer patterns
- React state synchronization

🚧 **Phase 1, Lesson 3 IN PROGRESS**: Y.Text Integration  
- Character-level collaborative editing
- Text diffing and operations
- Inline text editing components

## Learning Objectives

By completing this project, you will:
- Master Y.js data structures (Y.Doc, Y.Array, Y.Map, Y.Text)
- Understand CRDT conflict resolution
- Implement real-time collaborative editing
- Learn observer patterns and state synchronization
- Build production-ready collaborative features

## Technology Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Collaboration**: Y.js (Yjs) v13.6+
- **Styling**: CSS3 with custom design
- **Development**: ESLint, Hot Module Replacement

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Learning Path

### **Phase 1: Y.js Fundamentals (Local State)**
**Goal**: Understand Y.js data structures without networking complexity

- [x] **Lesson 1**: Y.Doc & Basic Data Types with Y.Array
- [x] **Lesson 2**: Y.Map for Rich Todo Objects & Property-level Conflict Resolution
- [ ] **Lesson 3**: Y.Text for Collaborative Text Editing
- [ ] **Lesson 4**: Observers & Advanced React Integration

### **Phase 2: Local Persistence**
**Goal**: Add data persistence without networking

- [ ] **Lesson 5**: Y.IndexedDB Provider for Local Storage
- [ ] **Lesson 6**: Undo/Redo with Y.UndoManager

### **Phase 3: Real-time Collaboration**
**Goal**: Add networking for multi-user collaboration

- [ ] **Lesson 7**: Y.WebSocket Provider for Real-time Sync
- [ ] **Lesson 8**: Conflict Resolution & Concurrent Editing
- [ ] **Lesson 9**: Awareness (User Cursors/Presence)

### **Phase 4: Rich Text Editing (Optional)**
**Goal**: Integrate BlockNote for collaborative rich text

- [ ] **Lesson 10**: BlockNote Integration
- [ ] **Lesson 11**: Advanced Collaboration Features

### **Phase 5: Production Ready (Advanced)**
**Goal**: Scale up with Hocuspocus

- [ ] **Lesson 12**: Hocuspocus Server Setup
- [ ] **Lesson 13**: Authentication & Permissions

## Key Concepts Covered

### Y.js Data Structures
- **Y.Doc**: The root document container
- **Y.Array**: Collaborative arrays with conflict resolution
- **Y.Map**: Collaborative objects with property-level merging
- **Y.Text**: Character-level collaborative text editing

### Collaboration Patterns
- **Observer Pattern**: Listening to Y.js changes
- **Conflict Resolution**: Automatic merging of concurrent edits
- **State Synchronization**: Y.js ↔ React state management
- **Nested Observers**: Multi-level data structure observation

### Advanced Features
- **Real-time Synchronization**: Multi-user editing
- **Persistence**: Local and remote data storage
- **Undo/Redo**: Collaborative operation history
- **Awareness**: User presence and cursors

## Project Structure

```
src/
├── lib/
│   ├── components/        # React components
│   │   ├── AddTodo.tsx
│   │   ├── TodoList.tsx
│   │   ├── Stats.tsx
│   │   └── EditableText.tsx (coming next)
│   ├── hooks/            # Custom React hooks
│   │   └── useYjsTodos.ts
│   └── types/            # TypeScript definitions
│       └── todos.ts
├── App.tsx              # Main application component
├── App.css             # Application styles
└── main.tsx           # Application entry point
```

## Development

### Architecture Decisions
- **Hook-based State Management**: `useYjsTodos` encapsulates all Y.js logic
- **Component Separation**: Clean separation between Y.js and presentation logic
- **Type Safety**: Full TypeScript integration with Y.js types
- **Nested Observers**: Proper cleanup and memory management

### Current Implementation
- ✅ Y.Array for todo list management
- ✅ Y.Map for individual todo objects
- ✅ Property-level conflict resolution
- ✅ Observer pattern with proper cleanup
- 🚧 Y.Text for collaborative text editing

### Next Steps
1. Complete Y.Text integration for inline editing
2. Add local persistence with Y.IndexedDB
3. Implement real-time sync with WebSocket provider
4. Build rich text editing with BlockNote

---

**Learning Resources:**
- [Y.js Documentation](https://docs.yjs.dev/)
- [Learn Y.js Course](https://learn.yjs.dev/)
- [BlockNote Documentation](https://www.blocknotejs.org/)
- [Hocuspocus Documentation](https://tiptap.dev/docs/hocuspocus/introduction)
