DROP TYPE IF EXISTS upload_type CASCADE;
DROP TYPE IF EXISTS pin_status_type CASCADE;
DROP TYPE IF EXISTS auth_key_blocked_status_type CASCADE;
DROP TYPE IF EXISTS user_tag_type CASCADE;
DROP TYPE IF EXISTS user_tag_proposal_decision_type CASCADE;
DROP TABLE IF EXISTS upload CASCADE;
DROP TABLE IF EXISTS pin CASCADE;
DROP TABLE IF EXISTS pin_location;
DROP TABLE IF EXISTS pin_sync_request;
DROP TABLE IF EXISTS psa_pin_request;
DROP TABLE IF EXISTS content;
DROP TABLE IF EXISTS backup;
DROP TABLE IF EXISTS auth_key;
DROP TABLE IF EXISTS public.user;
DROP TABLE IF EXISTS user_tag;
DROP TABLE IF EXISTS user_tag_proposal;
DROP TABLE IF EXISTS public.name;

DROP SCHEMA IF EXISTS cargo CASCADE;
DROP SERVER IF EXISTS dag_cargo_server CASCADE;
DROP MATERIALIZED VIEW IF EXISTS public.aggregate_entry CASCADE;
DROP MATERIALIZED VIEW IF EXISTS public.deal CASCADE;
DROP MATERIALIZED VIEW IF EXISTS public.aggregate CASCADE;

-- Reset settings from config.sql
ALTER DATABASE postgres RESET ALL;
