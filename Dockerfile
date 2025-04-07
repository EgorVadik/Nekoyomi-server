FROM oven/bun:1 AS builder
WORKDIR /app
ENV NODE_ENV=production

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . ./

RUN bun build src/index.ts --compile --outfile server

# Final stage
FROM ubuntu
WORKDIR /app

COPY --from=builder /app/server ./server

CMD ["./server"]