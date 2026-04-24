from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("dishes", "0004_require_all_fields_except_special_offer_image"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="dish",
            name="special_offer_image",
        ),
    ]
