BEGIN;

    -- How to delete ALL duplicated record berfore adding unique violation while keeping the exactly ONE copy

    DELETE FROM my_table
    WHERE id IN (
        SELECT id FROM (
            SELECT id, ROW_NUMBER() OVER (
                partition BY key_field, another_field, yet_another_field ORDER BY id
            ) AS rnum
            FROM my_table
        ) dups
        WHERE dups.rnum > 1
    );

    -- After removing duplicates we can finally add unique violation without any error

    ALTER TABLE my_table ADD
        CONSTRAINT unique_fields UNIQUE(key_field, another_field, yet_another_field)
    ;

COMMIT;



