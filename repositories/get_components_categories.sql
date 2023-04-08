create or replace function get_components_categories()
returns setof text
language sql
as $$
  select distinct category from components;
$$;