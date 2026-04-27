from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("dishes", "0007_align_dish_fields_and_restore_special_offer"),
    ]

    operations = [
        migrations.CreateModel(
            name="SpecialOffer",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("text", models.TextField(blank=True)),
                ("banner", models.ImageField(blank=True, null=True, upload_to="special_offer_banners/")),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "ordering": ["-updated_at"],
            },
        ),
    ]
