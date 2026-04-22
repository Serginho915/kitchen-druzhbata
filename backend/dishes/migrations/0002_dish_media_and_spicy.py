from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("dishes", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="dish",
            name="image",
            field=models.ImageField(blank=True, null=True, upload_to="dishes/"),
        ),
        migrations.AddField(
            model_name="dish",
            name="is_spicy",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="dish",
            name="special_offer_image",
            field=models.ImageField(blank=True, null=True, upload_to="special_offers/"),
        ),
    ]
