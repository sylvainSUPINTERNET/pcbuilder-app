create or replace function get_components_by_category(category_arg text)
returns setof components
language sql
as $$
    SELECT * FROM components WHERE category = category_arg ORDER BY constructor_brand ASC;
$$;