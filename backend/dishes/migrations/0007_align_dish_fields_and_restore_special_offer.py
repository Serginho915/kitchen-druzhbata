from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("dishes", "0006_dailymenu"),
    ]

    operations = [
        migrations.AlterField(
            model_name="dailymenu",
            name="date",
            field=models.DateField(default=django.utils.timezone.localdate, unique=True),
        ),
        migrations.AlterField(
            model_name="dish",
            name="category",
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name="dish",
            name="description",
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name="dish",
            name="image",
            field=models.ImageField(blank=True, null=True, upload_to="dishes/"),
        ),
        migrations.AlterField(
            model_name="dish",
            name="is_spicy",
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name="dish",
            name="weight",
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name="dish",
            name="special_offer_image",
            field=models.ImageField(blank=True, null=True, upload_to="special_offers/"),
        ),
    ]
