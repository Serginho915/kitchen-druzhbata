from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("dishes", "0009_dailyspecialoffers"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="dish",
            name="special_offer_image",
        ),
    ]
