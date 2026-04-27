from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("dishes", "0008_specialoffer"),
    ]

    operations = [
        migrations.CreateModel(
            name="DailySpecialOffers",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("date", models.DateField(default=django.utils.timezone.localdate, unique=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("offers", models.ManyToManyField(blank=True, related_name="daily_selections", to="dishes.specialoffer")),
            ],
            options={
                "ordering": ["-date"],
            },
        ),
    ]
