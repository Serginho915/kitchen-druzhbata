from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("dishes", "0002_dish_media_and_spicy"),
    ]

    operations = [
        migrations.CreateModel(
            name="TodayMenu",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("date", models.DateField(default=django.utils.timezone.localdate, unique=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "dishes",
                    models.ManyToManyField(blank=True, related_name="today_menus", to="dishes.dish"),
                ),
            ],
            options={
                "ordering": ["-date"],
            },
        ),
    ]
