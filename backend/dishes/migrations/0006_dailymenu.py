from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("dishes", "0005_remove_dish_special_offer_image"),
    ]

    operations = [
        migrations.CreateModel(
            name="DailyMenu",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("date", models.DateField(unique=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("dishes", models.ManyToManyField(blank=True, related_name="daily_menus", to="dishes.dish")),
            ],
            options={
                "ordering": ["-date"],
            },
        ),
    ]
