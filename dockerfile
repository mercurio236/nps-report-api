# --- deps ---
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# --- build ---
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# gera Prisma Client dentro da imagem
RUN npx prisma generate --schema=prisma/schema.prisma
# build Nest
RUN npm run build

# --- runtime ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/dist ./dist
ENV PORT=3000
EXPOSE 3000
CMD npx prisma migrate deploy --schema=prisma/schema.prisma && node dist/main.js
