# Static Next.js export served by nginx.
# The build stage runs on the CI runner's own platform: the export is plain
# HTML/JS, so the arm64 image (Oracle) only copies files and needs no emulation.
FROM --platform=$BUILDPLATFORM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 80
