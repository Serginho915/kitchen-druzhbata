from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("dishes", "0002_dish_media_and_spicy"),
    ]

    operations = [
        migrations.AddField(
            model_name="dish",
            name="description",
            field=models.TextField(blank=True),
        ),
    ]
