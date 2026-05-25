# Shopping Cart Microservice with CI/CD Pipeline

A production-ready containerized shopping cart API built with Node.js and Express, featuring a complete GitHub Actions CI/CD pipeline for automated Docker image building and deployment to GitHub Container Registry (GHCR).

## Features

✨ **Core Features**
- RESTful API for shopping cart operations
- Product catalog management
- Cart management with real-time calculations
- Input validation and error handling
- Health check endpoint for orchestration systems

🐳 **Docker & Deployment**
- Multi-stage Docker build for optimized image size
- Docker Compose for local development
- GitHub Container Registry (GHCR) integration
- Automated security scanning with Trivy

🔄 **CI/CD Pipeline**
- Automated build on every push to main and feature branches
- Test execution in CI pipeline
- Docker image push to GHCR with semantic versioning
- Security vulnerability scanning
- Pull request support with test validation

## Quick Start

### Prerequisites
- Node.js 20+ (for local development)
- Docker & Docker Compose (for containerized development)
- Git & GitHub CLI (for repository operations)

### Local Development

**Option 1: Node.js (Direct)**
```bash
npm install
npm start
```

**Option 2: Docker Compose**
```bash
docker-compose up
```

### API Endpoints

#### Health Check
```bash
GET /health
```

#### Products
```bash
# List all products
GET /api/products

# Get product by ID
GET /api/products/:id

# Create product
POST /api/products
Content-Type: application/json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "stock": 10
}

# Update product
PUT /api/products/:id
{ "price": 89.99, "stock": 15 }

# Delete product
DELETE /api/products/:id
```

#### Shopping Cart
```bash
# Get cart
GET /api/cart

# Add item to cart
POST /api/cart/items
{
  "productId": "product-uuid",
  "quantity": 2
}

# Update cart item quantity
PUT /api/cart/items/:itemId
{ "quantity": 5 }

# Remove item from cart
DELETE /api/cart/items/:itemId

# Clear entire cart
DELETE /api/cart
```

## Testing

Run the test suite:
```bash
npm test
npm run test:watch  # Watch mode
```

Tests include:
- Cart operations (add, update, remove items)
- Product CRUD operations
- Total price calculations
- Error handling and validation

## Docker

### Build Image Locally
```bash
docker build -t shopping-cart:latest .
```

### Run Container
```bash
docker run -p 3000:3000 shopping-cart:latest
```

### Pull from GHCR
```bash
docker pull ghcr.io/etechwinos2025-pixel/shopping-cart:latest
docker run -p 3000:3000 ghcr.io/etechwinos2025-pixel/shopping-cart:latest
```

## GitHub Actions CI/CD Pipeline

The workflow automatically:

1. **On Push to Main or Feature Branches**
   - Installs dependencies
   - Runs test suite
   - Builds Docker image
   - Pushes to GHCR with tags:
     - `latest` (on main branch)
     - `feature-name-sha` (on feature branches)
     - Git commit SHA

2. **On Pull Requests**
   - Installs dependencies
   - Runs test suite
   - Builds Docker image (without pushing)

3. **Security Scanning**
   - Runs Trivy vulnerability scanner
   - Reports critical and high-severity issues
   - Uploads results to GitHub Security tab

### Image Tags
Images pushed to `ghcr.io/etechwinos2025-pixel/shopping-cart`:
- `latest` - Latest build from main
- `main-{sha}` - Main branch commits
- `feature-name-{sha}` - Feature branch commits

## Project Structure

```
.
├── src/
│   ├── app.js                       # Express app configuration
│   ├── server.js                    # Server entry point
│   ├── routes/
│   │   ├── products.js              # Product API routes
│   │   └── cart.js                  # Cart API routes
│   ├── models/
│   │   ├── product.js               # Product business logic
│   │   └── cart.js                  # Cart business logic
│   └── middleware/
│       └── errorHandler.js          # Error handling middleware
├── tests/
│   ├── cart.test.js                 # Cart tests
│   └── products.test.js             # Product tests
├── .github/workflows/
│   └── build-and-push.yml           # GitHub Actions workflow
├── Dockerfile                       # Multi-stage Docker build
├── docker-compose.yml               # Local development setup
├── package.json                     # Node dependencies
└── README.md                        # This file
```

## Environment Variables

```env
PORT=3000                    # Server port (default: 3000)
NODE_ENV=production          # Environment (default: development)
```

## Performance & Security

- **Multi-stage Docker build**: Optimized image size (~100MB)
- **Non-root user**: Container runs as unprivileged user
- **Health checks**: Built-in endpoint for orchestration
- **CORS enabled**: Cross-origin resource sharing configured
- **Input validation**: Request validation on all endpoints
- **Error handling**: Centralized error middleware

## Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Commit changes: `git commit -m "Add my feature"`
3. Push to GitHub: `git push origin feature/my-feature`
4. The CI/CD pipeline will automatically:
   - Run tests
   - Build Docker image
   - Push to GHCR

## License

MIT

## Support

For issues or questions, open a GitHub issue in the repository.

---

Built with ❤️ using Node.js, Express, and Docker