from django.db import migrations, models
import django.utils.timezone


def add_created_at_column_if_missing(apps, schema_editor):
    table_name = "dishes_specialoffer"
    connection = schema_editor.connection

    with connection.cursor() as cursor:
        columns = {
            column.name for column in connection.introspection.get_table_description(cursor, table_name)
        }

    if "created_at" in columns:
        return

    schema_editor.execute(
        "ALTER TABLE dishes_specialoffer "
        "ADD COLUMN created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP"
    )


class Migration(migrations.Migration):

    dependencies = [
        ("dishes", "0010_remove_dish_special_offer_image"),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            database_operations=[
                migrations.RunPython(add_created_at_column_if_missing, migrations.RunPython.noop),
            ],
            state_operations=[
                migrations.AddField(
                    model_name="specialoffer",
                    name="created_at",
                    field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
                    preserve_default=False,
                ),
            ],
        ),
    ]
