CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS experiment (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  body JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS metrics (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  body JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);
