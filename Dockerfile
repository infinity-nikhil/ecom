# --- Stage 1: Build the React frontend ---
FROM node:22-bookworm-slim AS frontend-build
WORKDIR /app/frontend
COPY frontend/ ./
RUN npm install --no-audit --no-fund \
  && npm run build

# --- Stage 2: Build the backend ---
FROM node:22-bookworm-slim AS backend-build
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm install --no-audit --no-fund
COPY backend/ ./
RUN npm run build

# --- Stage 3: Final image ---
FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY backend/package.json backend/package-lock.json ./
RUN npm install --omit=dev --no-audit --no-fund && npm cache clean --force
COPY --from=backend-build /app/backend/dist ./dist
COPY --from=frontend-build /app/frontend/dist ./public
EXPOSE 3000
USER node
CMD ["node", "dist/index.js"]