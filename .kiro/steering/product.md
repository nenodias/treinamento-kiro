# Product Summary

This is a demo backend API for a product listing service, built as a training project for Spec Driven Development with Kiro.

## Purpose

REST API that exposes a product catalog with filtering, sorting, and pagination capabilities. Uses in-memory data (no external database) to simulate a product store.

## Domain

- Product catalog with categories: eletronicos, moveis, acessorios
- Prices in BRL (Brazilian Real)
- Portuguese-language product data and descriptions

## Current Endpoints

| Method | Route     | Description                                      |
|--------|-----------|--------------------------------------------------|
| GET    | /health   | Health check (status + timestamp)                |
| GET    | /products | Product listing with filters, sort, pagination   |

## Product Query Features

- **Filtering**: by category, minPrice, maxPrice (AND logic)
- **Sorting**: by name or price, ascending or descending (id as tiebreaker)
- **Pagination**: offset/limit based, returns metadata (total, page, hasNext)
- **Validation**: all query params validated upfront, errors collected and returned together
